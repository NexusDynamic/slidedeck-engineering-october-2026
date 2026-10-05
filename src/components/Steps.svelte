<script lang="ts">
	import { untrack } from 'svelte';
	import { printing, reveal } from '../lib/deck.svelte';
	import type { StepHandler } from '../lib/steps.svelte';

	/**
	 * Puts `count` invisible reveal.js fragments on the slide it sits in, so "next" steps through
	 * something that isn't a piece of slide content, such as a figure's animation.
	 */
	let {
		count,
		onstep,
		onleave,
		printStep = count
	}: {
		count: number;
		onstep: StepHandler;
		onleave?: () => void;
		/** the step a PDF export shows, as it gets one page per slide: the last one by default */
		printStep?: number;
	} = $props();

	let anchor: HTMLElement | undefined = $state();

	$effect(() => {
		const api = reveal.api;
		const section = anchor?.closest('section');
		if (!api || !section) return;
		if (printing) return untrack(() => onstep(printStep, false));

		// counted from the DOM rather than from events: arriving on a slide backwards shows every
		// fragment at once without announcing them
		const sync = (animate: boolean) => {
			if (api.getCurrentSlide() !== section) return onleave?.();
			onstep(section.querySelectorAll('.step.visible').length, animate);
		};
		const forwards = () => sync(true);
		const jump = () => sync(false);

		api.on('fragmentshown', forwards);
		api.on('fragmenthidden', jump);
		api.on('slidechanged', jump);
		untrack(jump);
		return () => {
			api.off('fragmentshown', forwards);
			api.off('fragmenthidden', jump);
			api.off('slidechanged', jump);
		};
	});
</script>

<span bind:this={anchor} hidden></span>
{#each { length: count }, i (i)}
	<span class="fragment step" data-fragment-index={i}></span>
{/each}
