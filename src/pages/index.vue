<template>
    <article>
        <section class="max-w-2xl pt-32 md:pt-42">
            <h5>Olá, me chamo</h5>

            <h1
                class="primary-gradient cursor-pointer py-1 select-none"

                @click="$router.push('/about')"
            >
                Diogo Carvalho Viegas
            </h1>

            <h4>DESENVOLVEDOR FULL-STACK</h4>

            <p class="mt-2">
                Me especializo em desenvolver aplicações escaláveis, tendo experiência de mais de 3
                anos focada em front-end e backend, me envolvendo em cada parte do processo do
                desenvolvimento desde o design, programação, testes e publicação.
            </p>

            <div class="mt-4 flex flex-wrap items-center gap-y-3">
                <Button
                    left-icon="fa-download"
                    label="Baixar CV"
                    variant="outline-primary"
                    class="mr-4"
                />

                <ContactList />

                <template v-if="!$project.device.isPhone">
                    <span class="pl-2.5 text-xl text-primary select-none"> / </span>

                    <RouterLink
                        v-slot="{ navigate }"

                        custom
                        to="/about"
                    >
                        <span
                            class="class cursor-pointer pl-2.5 text-sm transition-all hover:text-primary"

                            @click="navigate"
                        >
                            Saiba mais sobre mim
                        </span>
                    </RouterLink>
                </template>
            </div>
        </section>

        <div class="reveal-highlight reveal-highlight-primary/80 my-12 border-t md:my-18" />

        <section>
            <div class="flex flex-col items-center justify-between sm:flex-row">
                <CycleTitle
                    v-model="knowledgeFilter"
                    :options="knowledgeFilters"
                >
                    <span class="fa-solid fa-book text-primary" /> Conhecimentos
                </CycleTitle>
            </div>

            <div class="mt-6 flex flex-wrap justify-center gap-2">
                <Tooltip
                    v-for="(tech, index) in knowledge"
                    :key="tech.name"

                    :animation="index % 2 ? 'slide-down' : 'slide-up'"
                >
                    <ItemIcon
                        :key="tech.name"

                        class="cursor-pointer"
                        :icon="tech.name"
                        size="sm"
                        variant="default"
                        :style="{ backgroundColor: `${tech.color}26` }"
                        :class="`reveal-highlight border-transparent hover:reveal-highlight-${tech.color} backdrop-blur-[4px]`"

                        @mouseenter="hoveredStack = tech.name"
                        @mouseleave="hoveredStack = ''"
                        @click="focusTech(tech)"
                    >
                        <img
                            class="m-1 h-8 w-8 transition-all"
                            :class="hoveredStack === tech.name ? 'scale-120' : 'scale-100'"
                            :src="tech.image"
                            :alt="tech.name"
                        />
                    </ItemIcon>

                    <template #tooltip>
                        <span class="text-sm">{{ tech.name }}</span>
                    </template>
                </Tooltip>
            </div>
        </section>

        <div class="reveal-highlight reveal-highlight-primary/80 my-12 border-t md:my-18" />

        <section class="mt-12">
            <div class="flex flex-col items-center justify-between sm:flex-row">
                <CycleTitle
                    v-model="entryFilter"
                    :options="entryFilters"
                >
                    <span class="fa-solid fa-star text-primary" /> Projetos e experiências
                </CycleTitle>

                <Button
                    label="Ver todos os projetos"
                    variant="transparent"
                    right-icon="fa-arrow-right"

                    @click="$router.push('/projects')"
                />
            </div>

            <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProjectCard
                    v-for="entry in entries"
                    :key="entry.name"

                    :project="entry"
                />
            </div>
        </section>

        <div class="reveal-highlight reveal-highlight-primary/80 my-12 border-t md:my-18" />

        <section>
            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <GithubCommitsCard />

                    <GithubActivityCard />
                </div>

                <div
                    class="reveal-highlight reveal-highlight-primary/80 card-bg flex min-w-0 flex-col gap-3 rounded border p-4"
                >
                    <div class="flex items-center gap-3 font-semibold">
                        <i class="fa-solid fa-graduation-cap text-primary" />
                        Educação
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="font-semibold">
                            Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
                        </span>

                        <span class="text-sm text-primary">
                            IFSUL Camaquã
                            <span class="pl-0.5 text-sm text-muted-foreground">
                                / Julho de 2021 – Atual (Previsão de conclusão: Dezembro de 2026)
                            </span>
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CodewarsCard />

                    <LocationCard />
                </div>
            </div>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CodewarsCard from "../components/CodewarsCard.vue";
import ContactList from "../components/ContactList.vue";
import CycleTitle from "../components/CycleTitle.vue";
import GithubActivityCard from "../components/GithubActivityCard.vue";
import GithubCommitsCard from "../components/GithubCommitsCard.vue";
import LocationCard from "../components/LocationCard.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { KNOWLEDGE, KNOWLEDGE_FILTERS, type Knowledge } from "../constants/knowledge";
import { ENTRY_FILTERS, entriesFor } from "../constants/projectsAndExperience";
import { hasTag, revealTag, techFocus } from "../services/techFocus";

export default defineComponent({
    name: "IndexPage",

    components: {
        CodewarsCard,
        ContactList,
        CycleTitle,
        GithubActivityCard,
        GithubCommitsCard,
        LocationCard,
        ProjectCard
    },

    data() {
        return {
            hoveredStack: "",
            knowledgeFilter: "all",
            knowledgeFilters: KNOWLEDGE_FILTERS,
            entryFilter: "all",
            entryFilters: ENTRY_FILTERS
        };
    },

    computed: {
        isDarkTheme() {
            return this.$project.style.activeTheme === "dark";
        },

        knowledge() {
            return KNOWLEDGE.filter(
                (tech) => this.knowledgeFilter === "all" || tech.category === this.knowledgeFilter
            );
        },

        entries() {
            return entriesFor(this.entryFilter, true);
        }
    },

    methods: {
        toggleTheme() {
            this.$project.style.theme(this.isDarkTheme ? "light" : "dark");
        },

        /**
         * Shows where a technology is used: scrolls to a card of this page, or opens the projects page
         * @param {Knowledge} tech The clicked knowledge item
         */
        async focusTech(tech: Knowledge) {
            const tag = tech.tag ?? tech.name;

            if (entriesFor("all", true).some((entry) => hasTag(entry, tag))) {
                this.entryFilter = "all";
                await revealTag(this.$el, tag, entriesFor("all", true));

                return;
            }

            if (entriesFor("all", false).some((entry) => hasTag(entry, tag))) {
                techFocus.pending = tag;
                void this.$router.push("/projects");
            }
        }
    }
});
</script>
