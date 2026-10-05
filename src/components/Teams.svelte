<script lang="ts">
	/**
	 * Six people around the table, in two teams. `round` picks one of a few team line-ups (for
	 * illustration, not the real schedule): the people stay put, the teams change.
	 */
	let { round = 0 }: { round?: number } = $props();

	const lineups = ['AAABBB', 'ABABAB', 'AABBAB'];
	const seats = Array.from({ length: 6 }, (_, i) => {
		const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
		return { x: 200 + 140 * Math.cos(angle), y: 190 + 140 * Math.sin(angle) };
	});
	const pairs = seats.flatMap((_, a) => seats.slice(a + 1).map((_, k) => [a, a + 1 + k]));

	let teams = $derived(lineups[round % lineups.length]);
</script>

<figure class="teams">
	<svg viewBox="0 0 400 380" role="img" aria-label="Six people in two teams of three">
		{#each pairs as [a, b] (`${a}-${b}`)}
			<line
				class={teams[a] === teams[b] ? `mate team-${teams[a]}` : 'rival'}
				x1={seats[a].x}
				y1={seats[a].y}
				x2={seats[b].x}
				y2={seats[b].y}
			/>
		{/each}
		{#each seats as seat, i (i)}
			<circle class="seat team-{teams[i]}" cx={seat.x} cy={seat.y} r="24" />
			<text x={seat.x} y={seat.y + 6} text-anchor="middle">P{i + 1}</text>
		{/each}
	</svg>
	<figcaption>round {round + 1} · the same six people{round ? ', new teams' : ''}</figcaption>
</figure>
