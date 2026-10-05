<script lang="ts">
	import qrcode from 'qrcode-generator';

	/** A QR code for `value`, drawn as an SVG. Always dark on white, which is what scanners expect. */
	let { value, label }: { value: string; label?: string } = $props();

	const QUIET = 2; // blank modules around the code
	let qr = $derived.by(() => {
		const code = qrcode(0, 'M');
		code.addData(value);
		code.make();
		const n = code.getModuleCount();
		let path = '';
		for (let row = 0; row < n; row++) {
			for (let col = 0; col < n; col++) {
				if (code.isDark(row, col)) path += `M${col + QUIET} ${row + QUIET}h1v1h-1z`;
			}
		}
		return { size: n + QUIET * 2, path };
	});
</script>

<figure class="qr">
	<svg viewBox="0 0 {qr.size} {qr.size}" role="img" aria-label="QR code for {value}">
		<rect width={qr.size} height={qr.size} fill="#fff" />
		<path d={qr.path} fill="#000" />
	</svg>
	{#if label}<span>{label}</span>{/if}
</figure>
