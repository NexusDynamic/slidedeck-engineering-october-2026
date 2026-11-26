<script lang="ts">
	/**
	 * A notebook plot with a second, smaller plot called out over it: a box around the part of
	 * the main plot it zooms in on (`from`), a line from there to the inset, and the inset in a
	 * free corner of the plot (`to`). Everything is in the main image's own pixels, so the
	 * callout stays where it belongs at any size. The inset's title is cropped off (`crop`, in
	 * the inset image's pixels).
	 */
	type Box = { x: number; y: number; w: number; h: number };
	let {
		src,
		alt,
		width,
		height,
		inset,
		insetAlt,
		insetSize,
		crop,
		from,
		to,
		step = true
	}: {
		src: string;
		alt: string;
		/** the main image's size in pixels */
		width: number;
		height: number;
		inset: string;
		insetAlt: string;
		/** the inset image's size in pixels */
		insetSize: [number, number];
		/** the part of the inset image shown */
		crop: Box;
		/** what the inset zooms in on, in the main image */
		from: Box;
		/** where the inset goes, in the main image (its height follows from the crop) */
		to: { x: number; y: number; w: number };
		/** whether the callout is its own step (a fragment) */
		step?: boolean;
	} = $props();

	const h = $derived((to.w * crop.h) / crop.w);
	// the line runs from the middle of the box's right edge to the inset's left edge
	const line = $derived({
		x1: from.x + from.w,
		y1: from.y + from.h / 2,
		x2: to.x,
		y2: Math.min(Math.max(from.y + from.h / 2, to.y + 40), to.y + h - 40)
	});
</script>

<div class="inset-plot">
	<img {src} {alt} />
	<svg
		viewBox="0 0 {width} {height}"
		class:fragment={step}
		role="img"
		aria-label={insetAlt}
	>
		<rect class="from" x={from.x} y={from.y} width={from.w} height={from.h} rx="16" />
		<line class="link" {...line} />
		<rect class="frame" x={to.x - 6} y={to.y - 6} width={to.w + 12} height={h + 12} rx="14" />
		<svg x={to.x} y={to.y} width={to.w} height={h} viewBox="{crop.x} {crop.y} {crop.w} {crop.h}">
			<image href={inset} width={insetSize[0]} height={insetSize[1]} />
		</svg>
	</svg>
</div>
