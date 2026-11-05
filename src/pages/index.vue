<template>
    <article class="container-md">
        <section class="max-w-2xl pt-42">
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

            <div class="mt-4 flex items-center">
                <ContactList />
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
            </div>
        </section>

        <div class="reveal-highlight my-12 border-t" />

        <section class="mt-12">
            <h3>Conhecimentos</h3>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactList from "../components/ContactList.vue";

export default defineComponent({
    name: "IndexPage",

    components: {
        ContactList
    },

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
