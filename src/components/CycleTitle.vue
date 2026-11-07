<template>
    <h3
        class="group inline-flex w-fit cursor-pointer items-center gap-3 select-none"
        role="button"
        tabindex="0"
        :aria-label="`Filtro: ${current.label}. Clique para alternar`"

        @click="next"
        @keydown.enter.prevent="next"
        @keydown.space.prevent="next"
    >
        <span class="transition-colors group-hover:text-primary group-focus-visible:text-primary">
            <slot />
        </span>

        <span
            class="rounded border border-primary/60 px-2 py-0.5 text-xs font-medium text-primary transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            :class="isDefault ? 'opacity-0' : 'opacity-50'"
        >
            {{ current.label }}
        </span>
    </h3>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export type CycleOption = { value: string; label: string };

export default defineComponent({
    name: "CycleTitle",

    props: {
        /** Value of the selected option. The first option is the default one. */
        modelValue: {
            type: String,
            required: true
        },

        options: {
            type: Array as PropType<CycleOption[]>,
            required: true
        }
    },

    emits: ["update:modelValue"],

    computed: {
        current(): CycleOption {
            return (
                this.options.find((option) => option.value === this.modelValue) ??
                this.options[0] ?? { value: "", label: "" }
            );
        },

        /** The label only stays visible, faded, while a filter other than the default is active. */
        isDefault(): boolean {
            return this.current.value === this.options[0]?.value;
        }
    },

    methods: {
        next() {
            const index = this.options.findIndex((option) => option.value === this.current.value);
            const following = this.options[(index + 1) % this.options.length];

            if (following) {
                this.$emit("update:modelValue", following.value);
            }
        }
    }
});
</script>
