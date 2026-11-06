<template>
    <div class="reveal-highlight reveal-highlight-primary/80 flex h-full min-w-0 flex-col gap-3 rounded border p-4">
        <div class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-code-branch text-primary" />
            Commits recentes
        </div>

        <span
            v-if="commits.length === 0"

            class="text-sm text-muted-foreground"
        >
            Nenhum commit recente para mostrar.
        </span>

        <ul
            v-else

            class="flex flex-col gap-2"
        >
            <li
                v-for="commit in commits"
                :key="commit.url"

                class="mb-0! ml-0!"
            >
                <a
                    v-tooltip="commit.message"

                    :href="commit.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 text-sm text-foreground/90! no-underline! hover:text-primary! hover:brightness-100!"
                >
                    <span class="min-w-0 flex-1 truncate">
                        <span class="font-semibold">{{ commit.repo }}:</span>
                        {{ commit.message }}
                    </span>

                    <span class="shrink-0 font-mono text-xs">
                        <span class="text-success">+{{ commit.additions }}</span>
                        <span class="text-muted-foreground"> / </span>
                        <span class="text-destructive">-{{ commit.deletions }}</span>
                    </span>
                </a>
            </li>
        </ul>

        <a
            :href="profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto w-fit text-sm no-underline!"
        >
            Ver no GitHub
            <i class="fa-solid fa-arrow-up-right-from-square text-xs" />
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GITHUB_USER, recentCommits } from "../services/publicProfiles";

export default defineComponent({
    name: "GithubCommitsCard",

    data() {
        return {
            commits: recentCommits,
            profileUrl: `https://github.com/${GITHUB_USER}`
        };
    }
});
</script>
