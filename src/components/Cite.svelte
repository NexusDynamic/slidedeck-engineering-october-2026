<script lang="ts">
	import { untrack } from 'svelte';
	import { citeLabel, register, showReferences } from '../lib/references.svelte';

	/**
	 * An author–year citation, "(Tajfel et al., 1971; Vesper et al., 2010)". `text` is one
	 * reference from refs.ts, or several. Each name goes to the references slide; the label is
	 * read from the reference text (see citeLabel).
	 */
	let { text }: { text: string | string[] } = $props();

	// registered once, when the slide is built, in the order the slides cite them
	const cited = untrack(() => text);
	const items = (Array.isArray(cited) ? cited : [cited]).map((t) => ({
		index: register(t),
		label: citeLabel(t)
	}));

	const go = (e: Event, index: number) => {
		e.preventDefault();
		showReferences(index);
	};
</script>

<span class="cite"
	>({#each items as c, i (c.index)}{#if i > 0}{'; '}{/if}<a
			href="#ref-{c.index}"
			class="cite-{c.index}"
			onclick={(e) => go(e, c.index)}>{c.label}</a
		>{/each})</span
>
