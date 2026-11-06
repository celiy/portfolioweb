/**
 * Writes src/data/publicProfiles.json with the GitHub and Codewars data shown in the home cards.
 * Run it at deploy time or on a schedule (see .github/workflows/update-public-profiles.yml), so the
 * site reads a file and never hits the GitHub API rate limit.
 *
 * Set GITHUB_TOKEN to raise the API limit from 60 to 1000+ requests per hour.
 * A section that fails keeps its previous value, so a bad run never empties a card.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const GITHUB_USER = "celiy";
const CODEWARS_USER = "celiy";
const RECENT_COMMITS = 4;
const RECENT_REPOS = 4;
const OUTPUT = fileURLToPath(new URL("../src/data/publicProfiles.json", import.meta.url));

const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolioweb-update-public-profiles"
};

if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

/**
 * Fetches JSON and fails on non-2xx responses
 * @param {string} url The URL
 * @returns {Promise<any>} The parsed body
 */
async function getJson(url) {
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`${response.status} ${url}`);
    }

    return response.json();
}

/**
 * Loads the latest pushed commits with their line stats
 * @returns {Promise<object[]>} The recent commits
 */
async function loadCommits() {
    const events = await getJson(
        `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`
    );

    const pushes = events
        .filter((event) => event.type === "PushEvent" && event.payload.head)
        .slice(0, RECENT_COMMITS);

    const commits = await Promise.all(
        pushes.map(async (push) => {
            try {
                const commit = await getJson(
                    `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`
                );

                return {
                    repo: push.repo.name.split("/")[1] ?? push.repo.name,
                    message: commit.commit.message.split("\n")[0] ?? "",
                    url: commit.html_url,
                    additions: commit.stats?.additions ?? 0,
                    deletions: commit.stats?.deletions ?? 0
                };
            } catch {
                // A force-pushed head no longer exists; skip it
                return null;
            }
        })
    );

    return commits.filter(Boolean);
}

/**
 * Loads the public repo count, the latest repos and the language share in bytes across the non-fork ones
 * @returns {Promise<object>} The GitHub activity
 */
async function loadActivity() {
    const repos = await getJson(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`
    );

    const owned = repos.filter((repo) => !repo.fork);
    const perRepo = await Promise.all(owned.map((repo) => getJson(repo.languages_url)));
    const bytes = new Map();

    for (const languages of perRepo) {
        for (const [name, size] of Object.entries(languages)) {
            bytes.set(name, (bytes.get(name) ?? 0) + size);
        }
    }

    const total = [...bytes.values()].reduce((sum, size) => sum + size, 0) || 1;

    return {
        repoCount: repos.length,
        recentRepos: owned
            .slice(0, RECENT_REPOS)
            .map((repo) => ({ name: repo.name, url: repo.html_url })),
        languages: [...bytes.entries()]
            .map(([name, size]) => ({ name, percent: Math.round((size / total) * 1000) / 10 }))
            .sort((left, right) => right.percent - left.percent)
    };
}

/**
 * Loads the Codewars profile stats
 * @returns {Promise<object>} The stats
 */
async function loadCodewars() {
    const user = await getJson(`https://www.codewars.com/api/v1/users/${CODEWARS_USER}`);

    const languages = Object.entries(user.ranks.languages)
        .sort(([, left], [, right]) => right.score - left.score)
        .map(([name, rank]) => ({ name, rank: rank.name, color: rank.color }));

    return {
        rank: user.ranks.overall.name,
        rankColor: user.ranks.overall.color,
        honor: user.honor,
        completed: user.codeChallenges.totalCompleted,
        topLanguage: languages[0]?.name ?? "",
        leaderboardPosition: user.leaderboardPosition,
        honorPercentile: await loadHonorPercentile(),
        languages
    };
}

/**
 * Reads the honor percentile from the public profile page, since the API does not return it
 * @returns {Promise<number | null>} The "top N%" value, or null when the page changed
 */
async function loadHonorPercentile() {
    try {
        const response = await fetch(`https://www.codewars.com/users/${CODEWARS_USER}`, {
            headers: { "User-Agent": headers["User-Agent"] }
        });
        const match = (await response.text()).match(/Honor Percentile:<\/b>\s*Top ([\d.]+)%/);

        return match ? Number(match[1]) : null;
    } catch {
        return null;
    }
}

const EMPTY_SNAPSHOT = { commits: [], activity: null, codewars: null };

/**
 * Reads the previous snapshot, or an empty one
 * @returns {typeof EMPTY_SNAPSHOT} The snapshot sections
 */
function readPrevious() {
    try {
        const { generatedAt, ...sections } = JSON.parse(readFileSync(OUTPUT, "utf8"));

        void generatedAt;

        return { ...EMPTY_SNAPSHOT, ...sections };
    } catch {
        return EMPTY_SNAPSHOT;
    }
}

const SECTIONS = [
    ["commits", loadCommits],
    ["activity", loadActivity],
    ["codewars", loadCodewars]
];

const previous = readPrevious();
const next = { ...previous };
let failures = 0;

for (const [section, load] of SECTIONS) {
    try {
        next[section] = await load();
    } catch (error) {
        failures++;
        console.warn(`[${section}] kept the previous value: ${error.message}`);
    }
}

if (JSON.stringify(next) === JSON.stringify(previous)) {
    console.log("Nothing changed.");
} else {
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(
        OUTPUT,
        `${JSON.stringify({ generatedAt: new Date().toISOString(), ...next }, null, 4)}\n`
    );
    console.log(`Wrote ${OUTPUT}`);
}

// Fail the run only when nothing could be loaded at all
process.exitCode = failures === SECTIONS.length ? 1 : 0;
