<script lang="ts">
    import WiringDiagram, {
        filters,
        notes as signalNotes,
        type Signal,
    } from "$site/components/rise-together/WiringDiagram.svelte";
    import Slide from "../components/Slide.svelte";
    import Steps from "../components/Steps.svelte";

    // "next" walks the filter buttons from left to right; they still work with the mouse.
    // Set to false to leave the diagram to the mouse and have "next" go straight to the next slide.
    const stepThrough = true;
    const order: Signal[] = stepThrough ? filters.map((f) => f.id) : ["all"];
    let show: Signal = $state("all");
</script>

<Slide title="Everything's connected" class="figure wiring">
    <WiringDiagram bind:show />
    <Steps count={order.length - 1} onstep={(n) => (show = order[n])} printStep={0} />
    {#snippet notes()}
        {#each filters.slice(1) as { id } (id)}
            <p><b>{id}</b>: {signalNotes[id]}</p>
        {/each}
    {/snippet}
</Slide>
