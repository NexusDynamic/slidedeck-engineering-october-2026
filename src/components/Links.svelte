<script lang="ts">
	/** The game, the liblsl.dart paper and these slides: each a QR code with its link beside it. */
	import Qr from './Qr.svelte';
	import { talk } from '../meta';

	// a link as it's printed: no scheme, no trailing slash
	const short = (url: string) => url.replace(/^https:\/\/|\/$/g, '');

	const links = [
		{ label: 'Try the game:', qr: talk.gameUrl, href: talk.gameUrl },
		{ label: 'liblsl.dart (JOSS):', qr: talk.paperUrl, href: talk.paperDoi },
		{ label: 'These slides:', qr: talk.slidesUrl, href: talk.slidesUrl }
	];
</script>

<div class="play">
	{#each links as l (l.href)}
		<div class="link-block">
			<Qr value={l.qr} />
			<p class="try">{l.label}<br /><a href={l.href}>{short(l.href)}</a></p>
		</div>
	{/each}
</div>
