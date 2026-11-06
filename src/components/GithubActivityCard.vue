<template>
    <div class="reveal-highlight reveal-highlight-primary/80 flex h-full min-w-0 flex-col gap-3 rounded border p-4">
        <div class="flex items-center gap-2 font-semibold">
            <i class="fa-brands fa-github text-primary" />
            Atividade no GitHub
        </div>

        <span
            v-if="!activity"

            class="text-sm text-muted-foreground"
        >
            Dados do GitHub indisponíveis no momento.
        </span>

        <template v-else>
            <div class="flex items-baseline gap-2">
                <span class="text-3xl font-bold text-primary">{{ activity.repoCount }}</span>
                <span class="text-sm text-muted-foreground">Repositórios publicados</span>
            </div>

            <ul class="flex flex-col gap-1.5">
                <li
                    v-for="repo in activity.recentRepos"
                    :key="repo.url"

                    class="mb-0! ml-0!"
                >
                    <a
                        :href="repo.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 text-sm text-foreground/90! no-underline! hover:text-primary! hover:brightness-100!"
                    >
                        <i class="fa-solid fa-book-bookmark text-xs text-muted-foreground" />
                        <span class="truncate">{{ repo.name }}</span>
                    </a>
                </li>
            </ul>

            <div class="mt-auto flex flex-col gap-2">
                <div class="flex h-2 w-full gap-0.5 overflow-hidden rounded-full">
                    <div
                        v-for="language in languages"
                        :key="language.name"

                        v-tooltip="`${language.name} ${language.percent.toFixed(1)}%`"
                        class="h-full"
                        :style="{ width: `${language.percent}%`, backgroundColor: language.color }"
                    />
                </div>

                <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span
                        v-for="language in languages.slice(0, 4)"
                        :key="language.name"

                        class="flex items-center gap-1"
                    >
                        <span
                            class="inline-block h-2 w-2 rounded-full"
                            :style="{ backgroundColor: language.color }"
                        />
                        {{ language.name }} {{ Math.round(language.percent) }}%
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { githubActivity } from "../services/publicProfiles";

/** GitHub linguist colors of the languages likely to show up */
const LANGUAGE_COLORS: Record<string, string> = {
    Blade: "#f7523f",
    C: "#555555",
    "C++": "#f34b7d",
    CSS: "#663399",
    Dart: "#00b4ab",
    HTML: "#e34c26",
    Java: "#b07219",
    JavaScript: "#f1e05a",
    PHP: "#4f5d95",
    Python: "#3572a5",
    SCSS: "#c6538c",
    Shell: "#89e051",
    TypeScript: "#3178c6",
    Vue: "#41b883"
};

const OTHER_COLOR = "#8b8b8b";

/** Languages under this share are grouped as "Outros" */
const MIN_PERCENT = 1;

export default defineComponent({
    name: "GithubActivityCard",

    data() {
        return {
            activity: githubActivity
        };
    },

    computed: {
        languages(): { name: string; percent: number; color: string }[] {
            const all = this.activity?.languages ?? [];
            const main = all.filter((language) => language.percent >= MIN_PERCENT);
            const rest = all
                .filter((language) => language.percent < MIN_PERCENT)
                .reduce((sum, language) => sum + language.percent, 0);

            const shares = main.map((language) => ({
                ...language,
                color: LANGUAGE_COLORS[language.name] ?? OTHER_COLOR
            }));

            if (rest > 0) {
                shares.push({ name: "Outros", percent: rest, color: OTHER_COLOR });
            }

            return shares;
        }
    }
});
</script>
