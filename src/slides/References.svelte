<script lang="ts">
	import { references, showCitation } from '../lib/references.svelte';
</script>

<!-- lists whatever the slides cite with <Cite>; a number goes back to the slide that cites it -->
<section class="slide references" id="references">
	<p class="prompt"><span>$</span> cat references.bib</p>
	<h2>References</h2>
	<ol class="body">
		{#each references as reference, i (reference.text)}
			<li>
				<button type="button" onclick={() => showCitation(i + 1)} aria-label="Back to the slide"
					>{i + 1}</button
				>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<span>{@html reference.text}</span>
			</li>
		{/each}
	</ol>
</section>
