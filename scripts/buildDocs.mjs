/**
 * Builds the site for GitHub Pages: index.html, 404.html and .nojekyll, with the /portfolioweb/ base path.
 * The deploy workflow runs it with ./site. Locally it is handy to preview the published build.
 *
 *   node portfolioweb/scripts/buildDocs.mjs [outputFolder]
 *
 * Without an argument the result goes to docs/ in this repo, which is git ignored.
 * It needs the cht-main workspace around this folder, because the build lives in cht-base.
 * The output folder is replaced on every run, so never keep hand-written files in it.
 */
import { copyFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLIENT = "portfolioweb";

// Where the site lives. Pages serves a project repo at /<repo>/, so assets and routes need that prefix.
// Use "/" for a user site (<user>.github.io) or a custom domain.
const BASE = "/portfolioweb/";

const clientDir = fileURLToPath(new URL("..", import.meta.url));
const workspace = fileURLToPath(new URL("../..", import.meta.url));
const docs = process.argv[2] ? resolve(process.argv[2]) : `${clientDir}docs`;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

const build = spawnSync(npx, ["chtmain", "build", CLIENT, `--out:${docs}`], {
    cwd: workspace,
    stdio: "inherit",
    env: { ...process.env, CHT_BASE: BASE }
});

if (build.status !== 0) {
    process.exit(build.status ?? 1);
}

// Pages answers unknown paths with 404.html; serving the app there lets the router resolve deep links
copyFileSync(`${docs}/index.html`, `${docs}/404.html`);

// Without this file Pages runs Jekyll over the output, which hides folders that start with "_"
writeFileSync(`${docs}/.nojekyll`, "");

console.log(`Ready: ${docs}`);
