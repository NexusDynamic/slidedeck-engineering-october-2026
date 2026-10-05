import { reveal } from './deck.svelte';

/** Every reference cited with <Cite>, in the order the slides cite them. */
export const references: Footnote[] = $state([]);

const slideOf = (el: Element | null) => el?.closest<HTMLElement>('.slides > section');

const goTo = (slide: HTMLElement | null | undefined) => {
	const api = reveal.api;
	if (api && slide) api.slide(api.getIndices(slide).h);
};

/** Jump to the references slide. */
export const showReferences = () => goTo(slideOf(document.getElementById('references')));

/** Jump back to the first slide that cites reference number `n`. */
export const showCitation = (n: number) => goTo(slideOf(document.querySelector(`.footnote-${n}-ref`)));
