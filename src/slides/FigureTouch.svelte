<script lang="ts">
    import TouchToPhoton, {
        createPlayback,
        stops,
    } from "$site/components/rise-together/TouchToPhoton.svelte";
    import Slide from "../components/Slide.svelte";
    import Steps from "../components/Steps.svelte";
    import { stepPlayback } from "../lib/steps.svelte";

    // the scene slide's clock: "next" plays it to the next stage and pauses there
    const playback = createPlayback();
    const onstep = stepPlayback(playback, stops);
</script>

<Slide title="Touch <-> Response ~ about 58 ms" class="figure scene-only">
    <TouchToPhoton {playback} />
    <Steps count={stops.length} {onstep} onleave={playback.pause} />
    {#snippet notes()}
        <p>One button press, slowed down about 170 times.</p>
        <p>
            Each leg is a median measured on its own, so the total is their sum.
            Touch and handler times come from the bench rig (force sensor under
            the finger, photodiode on the screen, both read by a Bela); network,
            physics and display from a lab session with six iPads.
        </p>
        <p>Only the wait for the next display frame is estimated.</p>
    {/snippet}
</Slide>

<Slide title="Where the 58 ms goes" class="figure lanes-only">
    <!-- plays and loops while the slide is on show -->
    {#snippet children(active)}
        <TouchToPhoton autoplay={active} />
    {/snippet}
    {#snippet notes()}
        <p>About 22 ms passes before the game's code hears about the touch.</p>
        <p>About 18 ms goes on getting the finished picture onto the screen.</p>
        <p>
            The force sensor needs some pressure before it trips, so the real
            delay from first contact is, if anything, a little longer.
        </p>
    {/snippet}
</Slide>
