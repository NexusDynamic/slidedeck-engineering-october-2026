<script lang="ts">
	/**
	 * What the result plots compare: pairs of people from the same team, from the two teams
	 * playing each other, or from two different sessions (groups of six). `compact` drops the
	 * one-line descriptions.
	 */
	let { compact = false }: { compact?: boolean } = $props();

	const R = 54;
	const seat = (cx: number, i: number) => {
		const a = (i / 6) * 2 * Math.PI - Math.PI / 2;
		return { x: cx + R * Math.cos(a), y: 80 + R * Math.sin(a) };
	};
	// two groups of six; seats 0–2 are one team, 3–5 the other
	const groups = [90, 330].map((cx) => Array.from({ length: 6 }, (_, i) => seat(cx, i)));
	const [g1, g2] = groups;

	const links = [
		{ id: 'own', a: g1[0], b: g1[2] },
		{ id: 'other-team', a: g1[2], b: g1[4] },
		{ id: 'other-group', a: g1[1], b: g2[5] }
	];

	const legend = [
		{ id: 'own', name: 'own team', sub: 'same team, same paddle' },
		{ id: 'other-team', name: 'other team', sub: 'same game, opposing team' },
		{ id: 'other-group', name: 'other group', sub: 'a different session' },
		{ id: 'shifted', name: 'time-shifted', sub: 'own team, shifted ≥ 10 s: chance' }
	];
</script>

<figure class="comparisons" class:compact>
	<svg viewBox="0 0 420 172" role="img" aria-label="Pairs compared: own team, other team, other group">
		{#each links as l (l.id)}
			<line class="link {l.id}" x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} />
		{/each}
		{#each groups as g, gi (gi)}
			{#each g as s, i (i)}
				<circle
					class="seat"
					class:team-A={i < 3}
					class:team-B={i >= 3}
					class:faded={gi === 1}
					cx={s.x}
					cy={s.y}
					r="13"
				/>
			{/each}
			<text class="group-label" x={gi ? 330 : 90} y="168" text-anchor="middle">
				group {gi + 1}
			</text>
		{/each}
	</svg>
	<ul class="key">
		{#each legend as k (k.id)}
			<li>
				<svg viewBox="0 0 40 10" aria-hidden="true"><line class="link {k.id}" x1="2" y1="5" x2="38" y2="5" /></svg>
				<b>{k.name}</b>{#if !compact}<small>{k.sub}</small>{/if}
			</li>
		{/each}
	</ul>
</figure>
