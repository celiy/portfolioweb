<template>
    <a
        :href="profileUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="reveal-highlight reveal-highlight-primary/80 @container flex h-full min-w-0 flex-col gap-3 rounded border p-4 text-foreground! no-underline! hover:bg-accent/50 hover:brightness-100!"
    >
        <div class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-terminal text-primary" />
            Codewars
        </div>

        <span
            v-if="!stats"

            class="text-sm text-muted-foreground"
        >
            Dados do Codewars indisponíveis no momento.
        </span>

        <div
            v-else

            class="flex flex-1 flex-col gap-4 @sm:flex-row"
        >
            <div class="flex flex-col gap-3">
                <span
                    class="text-4xl font-bold"
                    :style="{ color: rankColor }"
                >
                    {{ stats.rank }}
                </span>

                <div class="mt-auto flex flex-col gap-1 text-sm text-muted-foreground">
                    <span>
                        <span class="text-foreground">{{ stats.completed }}</span>
                        desafios resolvidos
                    </span>

                    <span>
                        <span class="text-foreground">{{ stats.honor }}</span>
                        de honra
                    </span>

                    <span v-if="stats.topLanguage">
                        Melhor em
                        <span class="text-primary">{{ languageLabel(stats.topLanguage) }}</span>
                    </span>
                </div>
            </div>

            <div
                class="flex min-w-0 flex-1 flex-col justify-between gap-3 border-t pt-4 @sm:border-t-0 @sm:border-l @sm:pt-0 @sm:pl-4"
            >
                <div
                    v-if="stats.leaderboardPosition"

                    class="flex items-center justify-between gap-2"
                >
                    <span class="text-xs tracking-wide text-muted-foreground uppercase">
                        <i class="fa-solid fa-trophy mr-1.5 text-primary" />
                        Ranking global
                    </span>

                    <span class="font-mono text-sm font-semibold">
                        #{{ formatNumber(stats.leaderboardPosition) }}
                    </span>
                </div>

                <div
                    v-if="stats.honorPercentile != null"

                    class="flex flex-col gap-1.5"
                >
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-xs tracking-wide text-muted-foreground uppercase">
                            <i class="fa-solid fa-medal mr-1.5 text-primary" />
                            Percentil de honra
                        </span>

                        <span class="font-mono text-sm font-semibold">
                            Top {{ formatNumber(stats.honorPercentile, 2) }}%
                        </span>
                    </div>

                    <div class="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                            class="h-full rounded-full bg-primary"
                            :style="{ width: `${100 - stats.honorPercentile}%` }"
                        />
                    </div>
                </div>

                <div
                    v-if="stats.languages?.length"

                    class="flex flex-col gap-1.5"
                >
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-xs tracking-wide text-muted-foreground uppercase">
                            <i class="fa-solid fa-code mr-1.5 text-primary" />
                            Linguagens treinadas
                        </span>

                        <span class="font-mono text-sm font-semibold">
                            {{ stats.languages.length }}
                        </span>
                    </div>

                    <div class="flex gap-1 overflow-x-auto pb-1">
                        <Badge
                            v-for="language in stats.languages"
                            :key="language.name"

                            class="shrink-0 whitespace-nowrap"
                            :color="rankHex(language.color)"
                            variant-style="bordered"
                        >
                            {{ languageLabel(language.name) }} · {{ language.rank }}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CODEWARS_USER, codewarsStats } from "../services/publicProfiles";

/** Codewars rank colors, by the `color` name the API returns */
const RANK_COLORS: Record<string, string> = {
    // Codewars draws white ranks as light gray; pure white would vanish on the light theme
    white: "#a1a1aa",
    yellow: "#ecb613",
    blue: "#3c7ebb",
    purple: "#866cc7",
    black: "#555555",
    red: "#d8433b"
};

/** Display names for API language ids that do not just capitalize */
const LANGUAGE_LABELS: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    csharp: "C#",
    cpp: "C++",
    php: "PHP"
};

export default defineComponent({
    name: "CodewarsCard",

    data() {
        return {
            stats: codewarsStats,
            profileUrl: `https://www.codewars.com/users/${CODEWARS_USER}`
        };
    },

    computed: {
        rankColor(): string {
            return this.rankHex(this.stats?.rankColor ?? "");
        }
    },

    methods: {
        rankHex(color: string): string {
            return RANK_COLORS[color] ?? "var(--color-primary)";
        },

        languageLabel(id: string): string {
            return LANGUAGE_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1);
        },

        formatNumber(value: number, decimals = 0): string {
            return value.toLocaleString("pt-BR", { maximumFractionDigits: decimals });
        }
    }
});
</script>
