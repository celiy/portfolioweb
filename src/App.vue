<template>
    <main class="relative">
        <template v-if="$route.path === '/'">
            <div
                class="absolute inset-0 -z-10 h-full w-full bg-background bg-size-[24px_24px] transition-opacity duration-1400 dark:bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-border)_40%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-border)_40%,transparent)_1px,transparent_1px)] light:bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-border)_60%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-border)_60%,transparent)_1px,transparent_1px)]"
                :class="isMounted ? 'opacity-100' : 'opacity-0'"
            />

            <div
                class="absolute inset-0 top-0 -z-10 h-48 translate-y-12 bg-linear-to-b from-background to-transparent"
            />

            <div
                class="absolute inset-0 top-0 -z-10 h-full translate-y-12 bg-linear-to-t from-background from-85% to-transparent md:from-80%"
            />
        </template>

        <div class="fixed inset-x-0 top-0 z-60">
            <NavBar variant="simplified">
                <div class="appear-from-t-to-b w-full p-2 sm:p-3">
                    <div class="flex w-full items-center justify-center gap-0.5 sm:gap-3">
                        <Button
                            v-for="link in [
                                { label: 'Início', href: '/' },
                                { label: 'Projetos', href: '/projects' },
                                { label: 'Sobre', href: '/about' },
                                { label: 'Contato', href: '/contact' }
                            ]"
                            :key="link.label"

                            variant="transparent"
                            class="px-2! text-xs! hover:text-primary sm:px-2.5! sm:text-sm!"
                            :background-style="
                                link.href === $route.path ? 'bg-primary text-contrast' : ''
                            "
                            border-style="border-transparent"

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

        <div class="container-md">
            <Transition
                name="docs-page-slide"
                mode="out-in"
            >
                <RouterView />
            </Transition>

            <footer class="reveal-highlight mt-12 mb-12 rounded border p-4 md:mt-18">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span class="text-sm text-muted-foreground">
                        Este

                        <a
                            href="https://github.com/celiy/portfolioweb"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>portfólio</span>
                        </a>
                        foi feito com o

                        <a
                            href="https://github.com/celiy/cht-main"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CHT Template.
                        </a>
                    </span>

                    <ContactList
                        :show-name-on-hover="false"
                        :show-name="false"
                    />
                </div>
            </footer>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactList from "./components/ContactList.vue";

export default defineComponent({
    name: "PortfoliowebApp",

    components: {
        ContactList
    },

    data() {
        return {
            isMounted: false
        };
    },

    computed: {
        isDarkTheme() {
            return this.$project.style.activeTheme === "dark";
        }
    },

    mounted() {
        setTimeout(() => {
            this.isMounted = true;
        }, 10);
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
