<template>
    <article>
        <section class="max-w-2xl pt-32 md:pt-42">
            <h5>Olá, me chamo</h5>

            <h1
                class="primary-gradient cursor-pointer py-1 select-none"

                @click="$router.push('/sobre')"
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
                        to="/sobre"
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
                <h3><span class="fa-solid fa-book text-primary" /> Conhecimentos</h3>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
                <Tooltip
                    v-for="(tech, index) in techStack"
                    :key="tech.tooltip"

                    :animation="index % 2 ? 'slide-down' : 'slide-up'"
                >
                    <ItemIcon
                        :key="tech.tooltip"

                        :icon="tech.tooltip"
                        size="sm"
                        variant="default"
                        :style="{ backgroundColor: `${tech.color}26` }"
                        :class="`reveal-highlight border-transparent hover:reveal-highlight-${tech.color}`"

                        @mouseenter="hoveredStack = tech.tooltip"
                        @mouseleave="hoveredStack = ''"
                    >
                        <img
                            class="m-1 h-8 w-8 transition-all"
                            :class="hoveredStack === tech.tooltip ? 'scale-120' : 'scale-100'"
                            :src="tech.image"
                            :alt="tech.tooltip"
                        />
                    </ItemIcon>

                    <template #tooltip>
                        <span class="text-sm">{{ tech.tooltip }}</span>
                    </template>
                </Tooltip>
            </div>
        </section>

        <div class="reveal-highlight reveal-highlight-primary/80 my-12 border-t md:my-18" />

        <section class="mt-12">
            <div class="flex flex-col items-center justify-between sm:flex-row">
                <h3><span class="fa-solid fa-star text-primary" /> Projetos e experiências</h3>

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
                    class="reveal-highlight reveal-highlight-primary/80 flex min-w-0 flex-col gap-3 rounded border p-4"
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
import GithubActivityCard from "../components/GithubActivityCard.vue";
import GithubCommitsCard from "../components/GithubCommitsCard.vue";
import LocationCard from "../components/LocationCard.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { EXPERIENCES, PROJECTS } from "../constants/projectsAndExperience";

export default defineComponent({
    name: "IndexPage",

    components: {
        CodewarsCard,
        ContactList,
        GithubActivityCard,
        GithubCommitsCard,
        LocationCard,
        ProjectCard
    },

    data() {
        return {
            hoveredStack: ""
        };
    },

    computed: {
        isDarkTheme() {
            return this.$project.style.activeTheme === "dark";
        },

        entries() {
            return [...EXPERIENCES, ...PROJECTS.filter((project) => project.featured)];
        },

        techStack() {
            return [
                {
                    tooltip: "HTML5",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                    color: "#E34F26"
                },
                {
                    tooltip: "CSS3",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                    color: "#1572B6"
                },
                {
                    tooltip: "Sass",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
                    color: "#CC6699"
                },
                {
                    tooltip: "JavaScript",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                    color: "#F7DF1E"
                },
                {
                    tooltip: "TypeScript",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                    color: "#3178C6"
                },
                {
                    tooltip: "Dart",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
                    color: "#0175C2"
                },
                {
                    tooltip: "PHP",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                    color: "#777BB4"
                },
                {
                    tooltip: "Flutter",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                    color: "#02569B"
                },
                {
                    tooltip: "C",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
                    color: "#00599C"
                },
                {
                    tooltip: "Python",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    color: "#3776AB"
                },
                {
                    tooltip: "Java",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                    color: "#ED8B00"
                },
                {
                    tooltip: "Tailwind CSS",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
                    color: "#06B6D4"
                },
                {
                    tooltip: "Node.js",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                    color: "#339933"
                },
                {
                    tooltip: "Express",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                    color: "#888888"
                },
                {
                    tooltip: "Fastify",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg",
                    color: "#888888"
                },
                {
                    tooltip: "Vue.js",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
                    color: "#4FC08D"
                },
                {
                    tooltip: "React",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    color: "#61DAFB"
                },
                {
                    tooltip: "Material UI",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
                    color: "#007FFF"
                },
                {
                    tooltip: "Laravel",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
                    color: "#FF2D20"
                },
                {
                    tooltip: "Electron",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
                    color: "#47848F"
                },
                {
                    tooltip: "Docker",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                    color: "#2496ED"
                },
                {
                    tooltip: "Nginx",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
                    color: "#009639"
                },
                {
                    tooltip: "Git",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                    color: "#F05032"
                },
                {
                    tooltip: "PostgreSQL",
                    image: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png",
                    color: "#336791"
                },
                {
                    tooltip: "MongoDB",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                    color: "#47A248"
                },
                {
                    tooltip: "MySQL",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                    color: "#4479A1"
                },
                {
                    tooltip: "SQLite",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
                    color: "#0F80CC"
                }
            ];
        }
    },

    methods: {
        toggleTheme() {
            this.$project.style.theme(this.isDarkTheme ? "light" : "dark");
        }
    }
});
</script>
