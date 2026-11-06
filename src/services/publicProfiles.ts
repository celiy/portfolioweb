/**
 * The public profiles module
 * This module is responsible for the GitHub and Codewars data shown in the home cards of the project.
 * The data comes from `data/publicProfiles.json`, written by `scripts/updatePublicProfiles.mjs`.
 */

import snapshot from "../data/publicProfiles.json";

export const GITHUB_USER = "celiy";
export const CODEWARS_USER = "celiy";

export type RecentCommit = {
    repo: string;
    message: string;
    url: string;
    additions: number;
    deletions: number;
};

export type PublicRepo = {
    name: string;
    url: string;
};

export type LanguageShare = {
    name: string;
    percent: number;
};

export type GithubActivity = {
    repoCount: number;
    recentRepos: PublicRepo[];
    languages: LanguageShare[];
};

export type CodewarsStats = {
    rank: string;
    rankColor: string;
    honor: number;
    completed: number;
    topLanguage: string;
    leaderboardPosition: number | null;
    /** Share of users with more honor, e.g. 9.03 for "top 9.03%" */
    honorPercentile: number | null;
    /** Languages trained, best first */
    languages: { name: string; rank: string; color: string }[];
};

export const recentCommits: RecentCommit[] = snapshot.commits;
export const githubActivity = snapshot.activity as GithubActivity | null;
export const codewarsStats = snapshot.codewars as CodewarsStats | null;
