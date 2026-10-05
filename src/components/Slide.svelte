<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '../lib/deck.svelte';

	let {
		title,
		prompt,
		class: className = '',
		children,
		notes
	}: {
		title?: string;
		/** a shell-prompt line above the title, e.g. "cat experiment" */
		prompt?: string;
		class?: string;
		/** gets `active`: whether this is the slide on show, e.g. to autoplay a figure */
		children: Snippet<[boolean]>;
		/** speaker notes: press S */
		notes?: Snippet;
	} = $props();

	let section: HTMLElement | undefined = $state();
	let active = $state(false);

	$effect(() => {
		const api = reveal.api;
		if (!api || !section) return;
		const sync = () => (active = api.getCurrentSlide() === section);
		api.on('slidechanged', sync);
		sync();
		return () => api.off('slidechanged', sync);
	});
</script>

<section class="slide {className}" bind:this={section}>
	{#if prompt}<p class="prompt"><span>$</span> {prompt}</p>{/if}
	{#if title}<h2>{title}</h2>{/if}
	<div class="body">{@render children(active)}</div>
	{#if notes}<aside class="notes">{@render notes()}</aside>{/if}
</section>
