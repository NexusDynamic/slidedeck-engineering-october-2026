<script lang="ts">
	import Callout from '$site/components/Callout.svelte';
	import game from '$siteStatic/_assets/images/_vault/rise-together/rise-together.webp';
	import eeg from '$siteStatic/_assets/images/_vault/rise-together/hyprview.webp';
	import Slide from '../components/Slide.svelte';
	import Cite from '../components/Cite.svelte';
	import Chain from '../components/Chain.svelte';
	import Steps from '../components/Steps.svelte';
	import Teams from '../components/Teams.svelte';
	import { chains, type ChainId } from '../chains';
	import { refs } from '../refs';

	let round = $state(0);
	const ids = Object.keys(chains) as ChainId[];
</script>

<Slide title="Which signal?" prompt="ls methods/">
	<dl class="streams">
		<dt>EEG</dt>
		<dd>direct measure of activity at the surface of the brain, 500 samples a second or more</dd>
		<dt>fNIRS</dt>
		<dd>
			indirect: follows blood oxygen, which peaks about 5 seconds after the activity<Cite
				text={refs.glover1999}
			/>
		</dd>
		<dt>OPM-MEG</dt>
		<dd>direct, and reaches deeper, but needs a shielded room and is expensive</dd>
	</dl>
	<Chain id="signal" />
	{#snippet notes()}
		<p>
			All three are at least somewhat portable, which is what makes group recordings possible at
			all. For interaction that plays out in real time, EEG was the clear choice.
		</p>
		<p>And there is a group EEG lab here that records up to ten people at once.</p>
	{/snippet}
</Slide>

<Slide title="Why a videogame?" prompt="cat why-a-game">
	<ul>
		<li>Closer to what people do in everyday life than a traditional lab task.</li>
		<li>Fun, so people stay engaged for a whole session.</li>
		<li>The interaction is in real time.</li>
		<li>It can still be controlled, and repeated exactly.</li>
		<li>The cost: much more is going on, and the analysis is harder.</li>
	</ul>
	<Chain id="task" />
	{#snippet notes()}
		<p>
			Tools like PsychoPy are not made for real-time interaction between many people, do not run
			a game engine, and do not collect several kinds of data from a whole group.
		</p>
	{/snippet}
</Slide>

<Slide title="Designing around the electrodes" prompt="cat constraints">
	<ul>
		<li>EEG picks up muscles as well as brains, especially the muscles of the face.</li>
		<li>A conversation, or a ball game, would be possible in theory and a mess in practice.</li>
		<li>So the game asks for almost no movement: two buttons, one under each thumb.</li>
	</ul>
	<Chain id="clean" />
	<Callout label="IT GOES BOTH WAYS">
		<p>Here the recording method shapes the experiment, not the other way round.</p>
	</Callout>
</Slide>

<Slide title="The experiment: two teams, one game" prompt="cat experiment" class="split">
	<div>
		<ul>
			<li>Six participants in one room, each with an EEG cap and an iPad.</li>
			<li>
				Each team lifts a ball on a shared paddle. Two buttons, real physics.<Cite
					text={refs.vesper2010}
				/>
			</li>
			<li>Everyone does the same thing and sees almost the same screen.</li>
			<li>Whichever team gets furthest, wins.</li>
		</ul>
		<Callout label="DECEPTIVELY DIFFICULT">
			<p>One button lifts the left end of the paddle, the other the right. The ball does the rest.</p>
		</Callout>
	</div>
	<figure>
		<img src={game} alt="The Rise Together game: a ball balanced on a paddle" />
		<figcaption>Rise Together, built with Flutter and Flame</figcaption>
	</figure>
	{#snippet notes()}
		<p>
			Inspired by joint action research: how people coordinate what they do with each other.
			Cooperation inside the team, competition between teams, as in sport.
		</p>
	{/snippet}
</Slide>

<Slide title="One world, shared by six" prompt="cat shared-world">
	<ul>
		<li>A single computer, the coordinator, runs the physics for everyone.</li>
		<li>The physics runs at 120 steps a second, and every iPad is sent the same state.</li>
		<li>A teammate's press moves the paddle on your screen too.</li>
	</ul>
	<Chain id="constant" />
	<Chain id="together" />
</Slide>

<Slide title="Same people, different teams" prompt="shuf teams" class="split">
	<div>
		<ul>
			<li>Teams are reshuffled during the session.</li>
			<li>The same two people can be teammates in one round and opponents in the next.</li>
			<li>Other tasks, where everyone does and sees the same thing, give a baseline.</li>
		</ul>
		<Callout label="THE PREDICTION">
			<p>
				If group identity leaves a mark, teammates synchronise more than opponents do, and more
				than the baseline.
			</p>
		</Callout>
	</div>
	<Teams {round} />
	<Steps count={2} onstep={(n) => (round = n)} />
	{#snippet notes()}
		<p>The team line-ups in the diagram are for illustration.</p>
		<p>
			This is what the minimal group effect buys: the comparison is within the same people, so
			whatever differs between pairs cannot be who they are.
		</p>
	{/snippet}
</Slide>

<Slide title="What gets recorded" prompt="ls data/" class="split">
	<div>
		<dl class="streams">
			<dt>EEG</dt>
			<dd>32 channels per person, 500 Hz</dd>
			<dt>EMG</dt>
			<dd>both thumbs: the press before the press</dd>
			<dt>IMU</dt>
			<dd>on the chair: movement</dd>
			<dt>Game</dt>
			<dd>button presses and the state of the game</dd>
			<dt>Surveys</dt>
			<dd>questionnaire responses</dd>
		</dl>
		<Callout label="THE CATCH">
			<p>None of it is useful unless it all lands on one timeline.</p>
		</Callout>
	</div>
	<figure>
		<img src={eeg} alt="EEG traces from one participant in a pilot session" />
		<figcaption>EEG from one participant in a pilot session</figcaption>
	</figure>
</Slide>

<Slide title="Every requirement has a reason" prompt="cat design.tsv">
	<table class="chains">
		<thead>
			<tr><th>what is needed</th><th>so the design is</th><th>which takes</th></tr>
		</thead>
		<tbody>
			{#each ids as id (id)}
				<tr class:recording={chains[id].from === 'recording'}>
					<td>{chains[id].need}</td>
					<td>{chains[id].choice}</td>
					<td>{chains[id].build}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#snippet notes()}
		<p>
			Left column is cognitive science, right column is engineering. One row runs the other way:
			the EEG decides what the game can ask of people.
		</p>
		<p>The last row is the rest of the talk.</p>
	{/snippet}
</Slide>

<Slide prompt="cat the-hard-part" class="statement">
	<p class="big">
		In a classic experiment, the computer decides when things happen.<br />
		<strong>Here, six people do.</strong>
	</p>
	<p>So nothing can be scheduled. Everything has to be measured.</p>
	<Chain id="events" />
</Slide>
