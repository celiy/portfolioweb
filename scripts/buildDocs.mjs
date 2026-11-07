/**
 * Builds the site into docs/ so GitHub Pages can serve it from "main" + "/docs".
 * Run it from anywhere: node portfolioweb/scripts/buildDocs.mjs
 *
 * It needs the cht-main workspace around this folder, because the build lives in cht-base.
 * docs/ is replaced on every run, so never keep hand-written files in it.
 */
import { copyFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const CLIENT = "portfolioweb";
const clientDir = fileURLToPath(new URL("..", import.meta.url));
const workspace = fileURLToPath(new URL("../..", import.meta.url));
const docs = `${clientDir}docs`;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

const build = spawnSync(npx, ["chtmain", "build", CLIENT, `--out:${docs}`], {
    cwd: workspace,
    stdio: "inherit"
});

if (build.status !== 0) {
    process.exit(build.status ?? 1);
}

// Pages answers unknown paths with 404.html; serving the app there lets the router resolve deep links
copyFileSync(`${docs}/index.html`, `${docs}/404.html`);

// Without this file Pages runs Jekyll over the output, which hides folders that start with "_"
writeFileSync(`${docs}/.nojekyll`, "");

console.log(`Ready: ${docs}`);
