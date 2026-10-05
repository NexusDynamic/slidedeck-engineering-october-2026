<script lang="ts">
	/** `stacked` is the two-line logo for title slides, `wide` the one-line one for the footer. */
	let { variant = 'wide' }: { variant?: 'wide' | 'stacked' } = $props();
	let n = $derived(variant === 'stacked' ? 1 : 2);
</script>

<!-- white on the dark theme, blue on the light one (see .only-dark / .only-light in deck.css) -->
<img class="au-logo only-dark" src="/brand/aulogo_uk_var{n}_white.png" alt="Aarhus University" />
<img class="au-logo only-light" src="/brand/aulogo_uk_var{n}_blue.png" alt="" />
