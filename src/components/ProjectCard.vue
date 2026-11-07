<template>
    <div
        class="reveal-highlight reveal-highlight-primary/80 flex min-w-0 flex-col rounded border"

        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <div
            v-if="project.cover"

            class="relative cursor-pointer"

            @click="navigate"
        >
            <Tooltip animation="fade">
                <template
                    v-if="project.siteUrl || project.githubUrl"
                    #tooltip
                >
                    <span class="text-sm">{{ siteLabel || "GitHub" }}</span>
                </template>

                <img
                    class="rounded-t"
                    :src="project.cover"
                    :alt="project.name"
                />

                <img
                    v-if="project.coverHover"

                    class="absolute inset-0 h-full w-full rounded-t object-cover transition-opacity duration-500 ease-out"
                    :class="hovered ? 'opacity-100' : 'opacity-0'"
                    :src="project.coverHover"
                    alt=""
                />
            </Tooltip>
        </div>

        <div class="flex flex-1 flex-col p-4">
            <div class="item flex flex-wrap items-center justify-between gap-x-2">
                <h4 class="mb-1">{{ project.name }}</h4>

                <div class="flex gap-1">
                    <Button
                        v-if="letterUrl"

                        v-tooltip="'Baixar carta de recomendação'"
                        :href="letterUrl"
                        v-bind="letterDownloadAttrs"
                        class="py-1.5!"
                        left-icon="fa-file-arrow-down"
                        label="Carta de recomendação"
                        variant="transparent-primary"
                        aria-label="Baixar carta de recomendação"
                    />

                    <Button
                        v-if="siteLabel"

                        v-tooltip="siteLabel"
                        :href="project.siteUrl"
                        target="_blank"
                        class="p-2!"
                        left-icon="fa-globe"
                        variant="transparent-primary"
                    />

                    <Button
                        v-if="project.githubUrl"

                        v-tooltip="'GitHub'"
                        :href="project.githubUrl"
                        target="_blank"
                        class="p-2"
                        left-icon="fa-brands fa-github"
                        variant="transparent-primary"
                    />
                </div>
            </div>

            <span
                class="text-sm leading-5 text-muted-foreground"
                v-html="project.description"
            ></span>

            <div class="mt-auto flex flex-wrap gap-1 gap-y-1.5 pt-3">
                <Badge
                    v-for="tag in project.tags"
                    :key="tag.name"

                    :color="tag.color"
                    variant-style="bordered"
                >
                    {{ tag.name }}
                </Badge>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Experience, Project } from "../constants/projectsAndExperience";

export default defineComponent({
    name: "ProjectCard",

    props: {
        project: {
            type: Object as PropType<Experience | Project>,
            required: true
        }
    },

    data() {
        return {
            hovered: false,
            // Button has no `download` prop, so the attribute goes through v-bind to reach the <a>
            letterDownloadAttrs: { download: "Carta de recomendação.pdf" }
        };
    },

    computed: {
        role(): string {
            return "role" in this.project ? this.project.role : "";
        },

        letterUrl(): string {
            return "recommendationLetterUrl" in this.project
                ? this.project.recommendationLetterUrl
                : "";
        },

        /** Site host without protocol, used as the tooltip text. */
        siteLabel(): string {
            return this.project.siteUrl?.replace(/^https?:\/\//, "") ?? "";
        }
    },

    methods: {
        navigate() {
            const url = this.project.siteUrl || this.project.githubUrl;

            if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
            }
        }
    }
});
</script>
