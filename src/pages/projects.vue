<template>
    <article class="pt-32 md:pt-42">
        <CycleTitle
            v-model="entryFilter"
            :options="entryFilters"
        >
            <span class="fa-solid fa-star text-primary" /> Projetos e experiências
        </CycleTitle>

        <Transition
            name="filter-swap"
            mode="out-in"
        >
            <div
                :key="entryFilter"

                class="stagger-in mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
            >
                <ProjectCard
                    v-for="(entry, index) in entries"
                    :key="entry.name"

                    :style="{ '--i': index }"
                    :project="entry"
                />
            </div>
        </Transition>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CycleTitle from "../components/CycleTitle.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { ENTRY_FILTERS, entriesFor } from "../constants/projectsAndExperience";
import { revealTag, techFocus } from "../services/techFocus";

export default defineComponent({
    name: "ProjectsPage",

    components: {
        CycleTitle,
        ProjectCard
    },

    data() {
        return {
            entryFilter: "all",
            entryFilters: ENTRY_FILTERS
        };
    },

    computed: {
        entries() {
            return entriesFor(this.entryFilter, false);
        }
    },

    mounted() {
        // A knowledge item clicked on the home page asks this page to show a project that uses it
        const tag = techFocus.pending;

        if (tag) {
            techFocus.pending = "";
            void revealTag(this.$el, tag, entriesFor("all", false));
        }
    }
});
</script>
