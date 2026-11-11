/**
 * The tech focus module
 * This module is responsible for highlighting a technology badge on the project cards after a knowledge item is clicked.
 */

import { nextTick, reactive } from "vue";
import type { PortfolioEntry } from "../constants/projectsAndExperience";

/** How long a badge stays solid. */
export const HIGHLIGHT_MS = 5000;

export const techFocus = reactive({
    /** Tag whose badges are solid right now. */
    tag: "",
    /** Tag waiting for the projects page to open. */
    pending: ""
});

let timer: number | null = null;

/**
 * Makes the badges of a tag solid for a few seconds
 * @param {string} tag The project tag name
 */
export function highlightTag(tag: string) {
    if (timer != null) {
        window.clearTimeout(timer);
    }

    techFocus.tag = tag;
    timer = window.setTimeout(() => {
        techFocus.tag = "";
        timer = null;
    }, HIGHLIGHT_MS);
}

/**
 * Whether an entry uses the tag
 * @param {PortfolioEntry} entry The project or experience
 * @param {string} tag The project tag name
 * @returns {boolean} True when one of its badges has the tag
 */
export function hasTag(entry: PortfolioEntry, tag: string): boolean {
    return entry.tags.some((item) => item.name === tag);
}

/**
 * Scrolls to the first card that uses the tag and highlights its badges
 * @param {ParentNode} root The element that holds the cards
 * @param {string} tag The project tag name
 * @param {PortfolioEntry[]} entries The entries shown, in order
 * @returns {Promise<boolean>} False when no shown entry uses the tag
 */
export async function revealTag(
    root: ParentNode,
    tag: string,
    entries: PortfolioEntry[]
): Promise<boolean> {
    const first = entries.find((entry) => hasTag(entry, tag));

    if (!first) {
        return false;
    }

    highlightTag(tag);
    await nextTick();

    // After a page change the router jumps to the top once the page is in; waiting a frame keeps
    // that jump from cancelling the smooth scroll below.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    // After a filter change the new list only mounts once the old one has faded out
    const selector = `[data-project="${CSS.escape(first.name)}"]`;
    let card = root.querySelector(selector);

    for (let frame = 0; !card && frame < 40; frame++) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        card = root.querySelector(selector);
    }

    card?.scrollIntoView({ behavior: "smooth", block: "center" });

    return true;
}
