<script lang="ts">
	import { references, showCitation, sortKey } from '../lib/references.svelte';

	// alphabetical, as an author–year bibliography is; each keeps its index for the way back
	let sorted = $derived(
		references
			.map((r, index) => ({ text: r.text, index }))
			.sort((a, b) => sortKey(a.text).localeCompare(sortKey(b.text)))
	);
</script>

<!-- lists whatever the slides cite with <Cite>; ↩ goes back to the slide that cites it -->
<section class="slide references" id="references">
	<p class="prompt"><span>$</span> cat references.bib</p>
	<h2>References</h2>
	<ol class="body">
		{#each sorted as reference (reference.index)}
			<li id="ref-{reference.index}">
				<button
					type="button"
					onclick={() => showCitation(reference.index)}
					aria-label="Back to the slide that cites this">↩</button
				>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<span>{@html reference.text}</span>
			</li>
		{/each}
	</ol>
</section>
