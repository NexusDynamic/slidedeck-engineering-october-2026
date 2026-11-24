import { reveal } from './deck.svelte';

/** Every reference cited with <Cite>, in the order the slides cite them. */
export const references: Footnote[] = $state([]);

/** Adds a reference the first time it is cited; returns its index in `references`. */
export const register = (text: string): number => {
	let i = references.findIndex((r) => r.text === text);
	if (i === -1) i = references.push({ text, url: '', occurrences: 1 }) - 1;
	return i;
};

// "H.", "M. G.", "S. H.-Y.", "Ch."; a lone capital without its full stop ("L. D") counts too,
// and so does a particle between initials ("A. F. de C.")
const INITIALS = /^([A-Z][a-z]?\.[\s-]*|[A-Z](?=[\s-]|$)[\s-]*|(?:de|van|von|der)\s+)+$/;

/**
 * The in-text form of an APA reference, read from its text: "Tajfel et al., 1971",
 * "Schilbach & Redcay, 2025", "Vesper, 2010". Falls back to the first words of the text.
 */
export const citeLabel = (text: string): string => {
	const m = text.match(/\((\d{4}[a-z]?)\)/);
	if (!m || m.index === undefined) return text.replace(/<[^>]+>/g, '').slice(0, 30) + '…';
	const surnames = text
		.slice(0, m.index)
		.split(/,\s+(?:&\s+)?|\s+&\s+/)
		.map((t) => t.trim())
		.filter((t) => t && !INITIALS.test(t));
	const who =
		surnames.length === 1
			? surnames[0]
			: surnames.length === 2
				? `${surnames[0]} & ${surnames[1]}`
				: `${surnames[0]} et al.`;
	return `${who}, ${m[1]}`;
};

/** The sort key for the bibliography: first author's surname, then year. */
export const sortKey = (text: string) => text.replace(/<[^>]+>/g, '').toLowerCase();

const slideOf = (el: Element | null) => el?.closest<HTMLElement>('.slides > section');

const goTo = (slide: HTMLElement | null | undefined) => {
	const api = reveal.api;
	if (api && slide) api.slide(api.getIndices(slide).h);
};

/** Jump to the references slide, with reference `index` highlighted. */
export const showReferences = (index?: number) => {
	goTo(slideOf(document.getElementById('references')));
	if (index === undefined) return;
	const el = document.getElementById(`ref-${index}`);
	el?.classList.add('flash');
	setTimeout(() => el?.classList.remove('flash'), 1200);
};

/** Jump back to the first slide that cites reference `index`. */
export const showCitation = (index: number) =>
	goTo(slideOf(document.querySelector(`.cite-${index}`)));
