<template>
    <main class="relative h-dvh">
        <NavBar variant="simplified absolute inset-x-0 top-0">
            <div class="w-full p-3">
                <div class="flex w-full items-center justify-center gap-3">
                    <Button
                        v-for="link in [
                            { label: 'Início', href: '/' },
                            { label: 'Projetos', href: '/projects' },
                            { label: 'Sobre', href: '/about' },
                            { label: 'Contato', href: '/contact' }
                        ]"
                        :key="link.label"

                        variant="transparent"
                        class="hover:text-primary"
                        :href="link.href"
                    >
                        {{ link.label }}
                    </Button>

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
