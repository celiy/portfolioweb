<template>
    <article class="flex w-full flex-col items-center justify-center pt-32 md:pt-42">
        <h3 class="pb-8">Entre em contato</h3>

        <form
            :key="formKey"

            class="flex max-w-2xl flex-col gap-4"
            novalidate

            @submit.prevent="send"
        >
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    v-model="name"
                    type="text"
                    label="Nome"
                    placeholder="Seu nome"
                    autocomplete="name"
                    required
                />

                <Input
                    v-model="email"
                    type="email"
                    label="Email"
                    placeholder="seu@email.com"
                    autocomplete="email"
                    required
                />
            </div>

            <Input
                v-model="message"
                type="textarea"
                label="Mensagem"
                placeholder="Escreva sua mensagem"
                :min-height-px="160"
                required
            />

            <div class="flex flex-wrap items-center gap-3">
                <Button
                    label="Enviar email"
                    left-icon="fa-paper-plane"
                    variant="primary"
                    type="submit"
                    :loading="status === 'sending'"
                    :disabled="!canSend || status === 'sending'"
                />

                <span
                    class="text-sm"
                    :class="statusClass"
                    role="status"
                >
                    {{ statusText }}
                </span>
            </div>
        </form>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** Web3Forms keys are public by design: they only let a page send mail to the address they were made for. */
const ACCESS_KEY = "c4ee34b6-3670-4032-8bd7-5c527f16a3e3";
const ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "sent" | "error";

export default defineComponent({
    name: "ContactPage",

    data() {
        return {
            name: "",
            email: "",
            message: "",
            status: "idle" as Status,
            errorMessage: "",
            formKey: 0
        };
    },

    computed: {
        canSend(): boolean {
            return (
                this.name.trim() !== "" &&
                EMAIL_PATTERN.test(this.email.trim()) &&
                this.message.trim() !== ""
            );
        },

        statusText(): string {
            switch (this.status) {
                case "sending":
                    return "Enviando...";
                case "sent":
                    return "Mensagem enviada! Obrigado pelo contato.";
                case "error":
                    return this.errorMessage;
                default:
                    return this.canSend ? "" : "Preencha nome, email e mensagem para enviar.";
            }
        },

        statusClass(): string {
            if (this.status === "sent") {
                return "text-success";
            }

            return this.status === "error" ? "text-destructive" : "text-muted-foreground";
        }
    },

    methods: {
        async send() {
            if (!this.canSend || this.status === "sending") {
                return;
            }

            this.status = "sending";

            try {
                const response = await fetch(ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                        access_key: ACCESS_KEY,
                        subject: `Contato pelo portfólio: ${this.name.trim()}`,
                        from_name: "Portfólio",
                        name: this.name.trim(),
                        email: this.email.trim(),
                        message: this.message.trim()
                    })
                });

                const data = (await response.json()) as { success?: boolean; message?: string };

                if (!response.ok || !data.success) {
                    throw new Error(data.message);
                }

                this.status = "sent";
                this.name = "";
                this.email = "";
                this.message = "";
                // Emptying the values alone makes every field report "required"; new fields start clean
                this.formKey++;
            } catch (error) {
                this.errorMessage =
                    error instanceof Error && error.message
                        ? `Não foi possível enviar: ${error.message}`
                        : "Não foi possível enviar agora. Tente de novo em instantes.";
                this.status = "error";
            }
        }
    }
});
</script>
