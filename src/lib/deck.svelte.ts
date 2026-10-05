import type { RevealApi } from 'reveal.js';

/** The running reveal.js instance; undefined until Deck.svelte has initialised it. */
export const reveal: { api: RevealApi | undefined } = $state({ api: undefined });
