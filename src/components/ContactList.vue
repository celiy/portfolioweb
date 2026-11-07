<template>
    <div class="flex gap-2">
        <div
            v-for="(contact, index) in contacts"
            :key="contact.name"

            class="flex"
        >
            <a
                :key="contact.name"

                :href="contact.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-center text-foreground/90! no-underline! hover:text-primary! hover:brightness-100!"
            >
                <i :class="contact.class" />

                <div
                    v-if="showName"

                    class="grid transition-[grid-template-columns,opacity] duration-500 ease-out"
                    :class="
                        showNameOnHover
                            ? 'grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100 group-focus-visible:grid-cols-[1fr] group-focus-visible:opacity-100'
                            : 'grid-cols-[1fr]'
                    "
                >
                    <div class="overflow-hidden">
                        <span class="block pl-1 text-sm whitespace-nowrap">{{ contact.name }}</span>
                    </div>
                </div>
            </a>

            <span
                v-if="index < contacts.length - 1"

                class="pl-2.5 text-xl text-primary select-none"
            >
                /
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactList",

    props: {
        showNameOnHover: {
            type: Boolean,
            default: true
        },

        showName: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            contacts: [
                {
                    name: "GitHub",
                    class: "fa-brands fa-github text-xl",
                    url: "https://github.com/celiy"
                },
                {
                    name: "LinkedIn",
                    class: "fa-brands fa-linkedin text-xl",
                    url: "https://www.linkedin.com/in/diogo-carvallho-viegas-a527a5259/"
                },
                {
                    name: "Email",
                    class: "fa-solid fa-envelope text-xl",
                    url: "mailto:sasbrazilian@gmail.com"
                },
                {
                    name: "WhatsApp",
                    class: "fa-brands fa-whatsapp text-xl",
                    url: "https://wa.me/5551999329196"
                }
            ]
        };
    }
});
</script>
