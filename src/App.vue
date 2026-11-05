<template>
    <main class="relative h-dvh">
        <div class="absolute inset-x-0 top-0 z-60">
            <NavBar variant="simplified">
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
                            :background-style="
                                link.href === $route.path ? 'bg-primary text-contrast' : ''
                            "
                            border-style="border-transparent"
                            :href="link.href"

                            @click="$router.push(link.href)"
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
        </div>

        <Transition
            name="docs-page-slide"
            mode="out-in"
        >
            <RouterView />
        </Transition>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PortfoliowebApp",

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

<style>
.docs-page-slide-enter-active {
    transition:
        opacity 0.15s ease-out,
        transform 0.15s ease-out;
}

.docs-page-slide-leave-active {
    transition:
        opacity 0.15s ease-in,
        transform 0.15s ease-in;
}

.docs-page-slide-enter-from {
    opacity: 0.6;
    transform: translateX(-1rem);
}

.docs-page-slide-leave-to {
    opacity: 0.6;
    transform: translateX(1rem);
}
</style>
