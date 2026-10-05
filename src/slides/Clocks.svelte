<script lang="ts">
    import Slide from "../components/Slide.svelte";

    const clocks = [
        { n: 6, name: "iPads", sub: "one per participant" },
        { n: 1, name: "coordinator", sub: "runs the physics" },
        { n: 6, name: "EEG amplifiers", sub: "one per participant" },
        { n: 1, name: "Bela", sub: "forwards the triggers" },
    ];
</script>

<Slide title="So many clocks" prompt="date --all" class="split">
    <span class="text-sm absolute top-36"
        >for an experiment with 6 participants</span
    >
    <div>
        <ul>
            <li>
                The brain response to an event is often within the first few
                hundred milliseconds
            </li>
            <li>
                To compare six brains, each game event has to be found on each
                EEG recording, to within 1-2 ms (@ 500 Hz).
            </li>
            <li>
                For scale: the iPads draw a new frame every 8.3 ms (@ 120 Hz).
            </li>
            <li>
                Latency also exists in the network, the touchscreen and the
                display.
            </li>
        </ul>
    </div>
    <div class="clocks">
        {#each clocks as c (c.name)}
            <div class="clock">
                <b>{c.n}×</b>
                <span>{c.name}<small>{c.sub}</small></span>
            </div>
        {/each}
        <p class="clocks-total">= 14 clocks, all with their own drift</p>
    </div>
    {#snippet notes()}
        <p>
            Like recording a band with every musician in a different city and no
            click track. The coordinator is the computer that runs the physics
            and tells every iPad what to draw.
        </p>
    {/snippet}
</Slide>
