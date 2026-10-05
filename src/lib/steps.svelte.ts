import type { Playback } from '$site/components/rise-together/playback.svelte';

/** Called by <Steps>: `n` steps are showing; `animate` is true only when stepping forwards. */
export type StepHandler = (n: number, animate: boolean) => void;

/**
 * Walks a figure's clock from stop to stop: each step forwards plays to the next stop and pauses
 * there, stepping backwards (or arriving on the slide) jumps. Call it while a component is being
 * set up. The figure's own play button and scrubber keep working in between.
 */
export function stepPlayback(playback: Playback, stops: number[]): StepHandler {
	let target = playback.start;
	// only a stop we are playing towards pauses the clock, so pressing play by hand runs on
	let armed = $state(false);

	$effect(() => {
		if (armed && playback.t >= target) {
			armed = false;
			playback.seek(target);
		}
	});

	return (n, animate) => {
		target = n === 0 ? playback.start : stops[n - 1];
		if (animate && playback.t < target) {
			armed = true;
			playback.play();
		} else {
			armed = false;
			playback.seek(target);
		}
	};
}
