<template>
    <main class="relative h-dvh">
        <NavBar variant="simplified absolute inset-x-0 top-0">
            <div class="w-full p-3">
                <div class="flex w-full items-center justify-center gap-3">
                    <Button variant="transparent">Início</Button>

                    <Button variant="transparent">Projetos</Button>

                    <Button variant="transparent">Sobre</Button>

                    <Button variant="transparent">Contato</Button>

                    <Button
                        variant="transparent"
                        :left-icon="isDarkTheme ? 'fa-sun' : 'fa-moon'"

                        @click="toggleTheme"
                    />
                </div>
            </div>
        </NavBar>

        <article></article>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "IndexPage",

    computed: {
        isDarkTheme() {
            return this.$project.style.activeTheme === "dark";
        }
    },

    methods: {
        toggleTheme() {
            this.$project.style.theme(this.isDarkTheme ? "light" : "dark");
        }
    }
});
</script>
