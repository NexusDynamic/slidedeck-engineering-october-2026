<script lang="ts">
	/**
	 * How behavioural coupling is measured, as an illustration (made-up presses, real method):
	 * each player's presses become a signal, right +1, left −1, none 0; the signal is smoothed
	 * with a Gaussian (σ = 150 ms), and two players' smoothed signals are correlated. Presses vary
	 * in length and rate, as they do in play: quick taps, long holds.
	 */
	const T = 6; // seconds shown
	const dt = 0.01;
	const sigma = 0.15;

	type Press = [at: number, dir: 1 | -1, held: number];
	const R = 1;
	const L = -1;
	const players: { name: string; presses: Press[] }[] = [
		{
			name: 'P1',
			presses: [
				[0.3, R, 0.15], [0.58, R, 0.15], [0.86, R, 0.15],
				[1.5, L, 0.5], [2.3, L, 0.15],
				[3.0, R, 0.35], [3.5, R, 0.2],
				[4.2, L, 0.25], [4.55, L, 0.2],
				[5.1, R, 0.45]
			]
		},
		{
			name: 'P2',
			// coupled with P1, but not in lockstep: r ≈ .45, within the range of real teams
			presses: [
				[0.5, R, 0.25], [1.0, R, 0.2],
				[1.75, L, 0.3],
				[2.5, R, 0.2],
				[3.2, R, 0.15], [3.48, R, 0.15], [4.0, R, 0.15],
				[4.45, L, 0.35],
				[5.3, L, 0.25]
			]
		}
	];

	const n = Math.round(T / dt);
	const raw = (presses: Press[]) =>
		Array.from({ length: n }, (_, i) => {
			const t = i * dt;
			return presses.find(([at, , held]) => t >= at && t < at + held)?.[1] ?? 0;
		});

	const half = Math.round((3 * sigma) / dt);
	const kernel = Array.from({ length: 2 * half + 1 }, (_, k) =>
		Math.exp(-0.5 * (((k - half) * dt) / sigma) ** 2)
	);
	const ksum = kernel.reduce((a, b) => a + b, 0);
	const smooth = (x: number[]) =>
		x.map((_, i) =>
			kernel.reduce((acc, w, k) => {
				const j = i + k - half;
				return j < 0 || j >= n ? acc : acc + (w * x[j]) / ksum;
			}, 0)
		);

	const pearson = (a: number[], b: number[]) => {
		const mean = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
		const ma = mean(a);
		const mb = mean(b);
		let num = 0;
		let da = 0;
		let db = 0;
		for (let i = 0; i < a.length; i++) {
			num += (a[i] - ma) * (b[i] - mb);
			da += (a[i] - ma) ** 2;
			db += (b[i] - mb) ** 2;
		}
		return num / Math.sqrt(da * db);
	};

	// layout, in viewBox units
	const x0 = 48;
	const x1 = 470;
	const amp = 34;
	const rowY = [104, 244];
	const xs = (t: number) => x0 + ((x1 - x0) * t) / T;
	const x = (i: number) => x0 + ((x1 - x0) * i) / (n - 1);
	const path = (v: number[], y: number, a = amp) =>
		v.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${(y - a * s).toFixed(1)}`).join('');

	const rows = players.map((p, k) => {
		const y = rowY[k];
		const r = raw(p.presses);
		const s = smooth(r);
		// a button over each press: R above the line, L below it
		const buttons = p.presses.map(([at, dir, held]) => ({
			x: xs(at + held / 2),
			y: y - dir * (amp + 20),
			label: dir === R ? 'R' : 'L'
		}));
		return { ...p, y, raw: path(r, y), smooth: path(s, y, amp * 1.15), s, buttons };
	});
	const r = pearson(rows[0].s, rows[1].s);

	// the smoothing kernel, drawn small in the key
	const glyph = kernel
		.map((w, k) => `${k ? 'L' : 'M'}${(k / (kernel.length - 1)) * 40} ${12 - 11 * w}`)
		.join('');
	const axisY = rowY[1] + amp + 40;
</script>

<figure class="tap-signal">
	<svg
		viewBox="0 0 590 {axisY + 22}"
		role="img"
		aria-label="Two players' button presses, smoothed and correlated"
	>
		<g class="key" transform="translate({x0} 8)">
			<line class="raw" x1="0" y1="8" x2="26" y2="8" />
			<text x="32" y="12">press: R +1 · L −1</text>
			<g transform="translate(200 -2)">
				<path class="smooth" d={glyph} />
				<text x="48" y="14">smoothed, σ = 150 ms</text>
			</g>
		</g>
		{#each rows as row (row.name)}
			<line class="zero" x1={x0} y1={row.y} x2={x1} y2={row.y} />
			<path class="raw" d={row.raw} />
			<path class="smooth" d={row.smooth} />
			{#each row.buttons as b, i (i)}
				<g class="button">
					<circle cx={b.x} cy={b.y} r="8" />
					<text x={b.x} y={b.y + 3.5} text-anchor="middle">{b.label}</text>
				</g>
			{/each}
			<text class="who" x="0" y={row.y + 5}>{row.name}</text>
		{/each}
		<path class="bracket" d="M{x1 + 14} {rowY[0]} h10 V{rowY[1]} h-10" />
		<text class="r" x={x1 + 32} y={(rowY[0] + rowY[1]) / 2 + 7}>
			r = {r.toFixed(2).replace(/^0/, '')}
		</text>
		<line class="axis" x1={x0} y1={axisY} x2={x1} y2={axisY} />
		{#each Array.from({ length: T + 1 }, (_, s) => s) as s (s)}
			<line class="axis" x1={xs(s)} y1={axisY} x2={xs(s)} y2={axisY + 5} />
		{/each}
		<text class="axis-label" x={x1} y={axisY + 20} text-anchor="end">
			time · {T} s of one trial
		</text>
	</svg>
</figure>
