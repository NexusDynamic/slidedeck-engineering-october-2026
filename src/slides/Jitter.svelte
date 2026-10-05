<script lang="ts">
	import Callout from '$site/components/Callout.svelte';
	import Slide from '../components/Slide.svelte';
</script>

<Slide title="A constant delay is fine. Jitter is not." prompt="diff constant jitter">
	<div class="versus">
		<div class="card">
			<h3>Constant</h3>
			<p>The same every time: measure it once, subtract it afterwards.</p>
			<ul>
				<li>0.33 ms inside the Bela</li>
				<li>trigger box, splitter and cable</li>
				<li>about 22 ms from touch to game code</li>
			</ul>
		</div>
		<div class="card">
			<h3>Jitter</h3>
			<p>Different every time: it blurs the very thing being measured.</p>
			<ul>
				<li>0 to 0.5 ms waiting for the amplifier's next tick</li>
				<li>0 to 8.3 ms waiting for the next display frame</li>
				<li>the picture sometimes lands a whole frame late</li>
			</ul>
		</div>
	</div>
	<Callout label="SO">
		<p>
			Make the delays as constant as possible, then measure them for real: a photodiode on the
			screen, a force sensor under the finger.
		</p>
	</Callout>
</Slide>
