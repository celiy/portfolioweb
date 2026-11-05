/**
 * The client bootstrap module
 * This module is responsible for the client hooks that run at startup of the project.
 */
import { watch, type App } from "vue";
import type { Router } from "vue-router";

export function setupAuthGuard(_router: Router): void {
    void _router;
}

export async function installClientPlugins(app: App, _router: Router): Promise<void> {
    void _router;

    const style = app.config.globalProperties.$project.style;

    // Keeps the reveal highlight on when the base turns it off (performance gate) or the theme changes.
    watch(
        () => [style.revealHighlight, style.customTheme] as const,
        () => {
            style.revealHighlight = true;
            style.setCustomTheme("hodiernus");
        },
        { flush: "sync", immediate: true }
    );
}
