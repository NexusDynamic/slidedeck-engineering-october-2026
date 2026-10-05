<script lang="ts">
	import Slide from '../components/Slide.svelte';
	import Acknowledgements from './Acknowledgements.svelte';
	import AuLogo from '../components/AuLogo.svelte';
	import Qr from '../components/Qr.svelte';
	import { talk } from '../meta';
</script>

<Slide title="Built with" prompt="ls tools/">
	<dl class="streams wide">
		<dt>Flutter + Flame</dt>
		<dd>one codebase for the lab iPads and the web version of the game</dd>
		<dt>Lab Streaming Layer</dt>
		<dd>every sample from every device timestamped on a shared clock</dd>
		<dt>Bela</dt>
		<dd>forwards triggers, makes its own, and reads the photodiodes</dd>
		<dt>Hyperscanner</dt>
		<dd>custom amplifiers from the Center for Ear-EEG, up to ten people at once</dd>
		<dt>Open source</dt>
		<dd>the experiment code and the data will be published</dd>
	</dl>
</Slide>

<Acknowledgements />

<section class="slide closing" data-state="bare">
	<p class="prompt"><span>$</span> tail rise-together</p>
	<h2>In summary</h2>
	<ul>
		<li>The question is cognitive: is there a marker of group identity in the brain?</li>
		<li>The design holds everything constant except who is on your team.</li>
		<li>
			The engineering lets a free-flowing game be timed like a lab task: events on six EEG
			recordings to about half a millisecond, touch to light in a known 58 ms.
		</li>
		<li><strong>Neither half works without the other.</strong></li>
	</ul>
	<p class="try">
		Try the game: <a href={talk.gameUrl}>{talk.gameUrl.replace(/^https:\/\/|\/$/g, '')}</a>
	</p>
	<Qr value={talk.gameUrl} label="scan to play" />
	<div class="closing-foot">
		<AuLogo variant="stacked" />
		<span>{talk.author} · {talk.affiliation}</span>
	</div>
</section>
