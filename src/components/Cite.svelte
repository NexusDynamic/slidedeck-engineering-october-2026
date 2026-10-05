<script lang="ts">
	import BoringReference, { createFootnote } from '$site/components/BoringReference.svelte';
	import { references, showReferences } from '../lib/references.svelte';

	/**
	 * A numbered citation, using the site's reference component: the same text cited twice gets
	 * the same number. `text` may contain HTML, exactly as in the posts. Clicking the number goes
	 * to the references slide.
	 */
	let { text }: { text: string } = $props();
	let item = $derived(createFootnote(text));
</script>

<BoringReference items={references} {item} onnavigate={showReferences} />
