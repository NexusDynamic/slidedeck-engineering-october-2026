<script lang="ts">
    import TriggerPulseTimeline, {
        createPlayback,
        stops,
    } from "$site/components/rise-together/TriggerPulseTimeline.svelte";
    import Slide from "../components/Slide.svelte";
    import Steps from "../components/Steps.svelte";
    import { stepPlayback } from "../lib/steps.svelte";

    // the scene slide's clock: "next" plays it to the next stage and pauses there
    const playback = createPlayback();
    const onstep = stepPlayback(playback, stops);
</script>

<Slide title="One pulse, from the game to the EEG" class="figure scene-only">
    <TriggerPulseTimeline {playback} />
    <Steps count={stops.length} {onstep} onleave={playback.pause} />
    {#snippet notes()}
        <p>
            One electrical pulse from the coordinator to the amplifiers, slowed
            down about 6000 times.
        </p>
        <p>
            The edge crosses each cable in an instant; the time goes in the
            boxes.
        </p>
    {/snippet}
</Slide>

<Slide title="On the EEG within half a millisecond" class="figure lanes-only">
    <!-- plays and loops while the slide is on show -->
    {#snippet children(active)}
        <TriggerPulseTimeline autoplay={active} />
    {/snippet}
    {#snippet notes()}
        <p>
            The fixed delays (0.33 ms inside the Bela, plus the trigger box and
            cable) are the same for every pulse, so a line fitted through
            thousands of pulses absorbs them.
        </p>
        <p>
            What varies is sampling: up to 0.02 ms at the Bela, and up to 0.5 ms
            at the amplifier, or 2 ms when all of its boards run at 500 Hz.
        </p>
    {/snippet}
</Slide>
