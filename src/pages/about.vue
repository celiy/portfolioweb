<template>
    <article class="pt-32 md:pt-42">
        <div class="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div
                class="h-fit w-fit cursor-pointer overflow-hidden rounded transition-transform duration-200 select-none hover:-translate-y-2 active:translate-y-1"
                role="button"
                tabindex="0"

                @mouseenter="photoHovered = true"
                @mouseleave="photoHovered = false"
                @click="onPhotoClick"
                @keydown.enter.prevent="onPhotoClick"
            >
                <img
                    :src="FotoSobre"
                    alt="Foto de Diogo Carvalho Viegas"
                    draggable="false"
                />
            </div>

            <div class="flex flex-col gap-4">
                <p class="text-xl! leading-snug font-semibold!">
                    Designer, analista, desenvolvedor e programador. Sou o
                    <span
                        class="transition-colors duration-200"
                        :class="{ 'text-primary': photoHovered }"
                        >Diogo</span
                    >, desenvolvedor
                    <span
                        :key="sweepKey"

                        class="text-primary"
                        :class="{ 'primary-sweep': sweeping }"

                        @animationend="sweeping = false"
                        >full-stack</span
                    >.
                </p>

                <p>
                    Na Even7 trabalhei do front-end ao back-end numa plataforma whitelabel de
                    capitalização digital. Fora do trabalho construo os meus próprios sistemas, como
                    o
                    <span class="text-primary">Mecarvit</span>, meu TCC de gestão para oficinas
                    mecânicas, e o <span class="text-primary">CHT Template</span>, a base e o design
                    system que também sustentam este portfólio.
                </p>

                <p>
                    Full-stack é onde tenho mais bagagem, mas não me prendo a uma stack. Se o
                    projeto pede outra linguagem ou framework, eu aprendo e entrego.
                </p>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FotoSobre from "../assets/foto-sobre.jpg";

export default defineComponent({
    name: "AboutPage",

    data() {
        return {
            FotoSobre,
            photoHovered: false,
            sweeping: false,
            sweepKey: 0
        };
    },

    methods: {
        /** Each click runs the sweep over "full-stack" once; the new key restarts it mid-animation. */
        onPhotoClick() {
            this.sweepKey++;
            this.sweeping = true;
        }
    }
});
</script>
