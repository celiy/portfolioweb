<template>
    <article class="pt-32 md:pt-42">
        <h3><span class="fa-solid fa-star text-primary" /> Projetos e experiências</h3>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProjectCard
                v-for="entry in entries"
                :key="entry.name"

                :project="entry"
            />
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EXPERIENCES, PROJECTS } from "../constants/projectsAndExperience";
import ProjectCard from "../components/ProjectCard.vue";

export default defineComponent({
    name: "ProjectsPage",

    components: {
        ProjectCard
    },

    computed: {
        entries() {
            return [...EXPERIENCES, ...PROJECTS];
        }
    }
});
</script>
