import type { RevealApi } from 'reveal.js';

/** The running reveal.js instance; undefined until Deck.svelte has initialised it. */
export const reveal: { api: RevealApi | undefined } = $state({ api: undefined });

/** True in reveal.js's PDF export view (?print-pdf), where nothing is stepped or animated. */
export const printing = /print-pdf/i.test(location.search);
