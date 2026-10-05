<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import Slide from "../components/Slide.svelte";
</script>

<Slide title="What the timeline tells us" prompt="cat payoff">
    <dl class="streams wide">
        <dt>0.5 ms</dt>
        <dd>
            the same moment in the game can be found on all six EEG recordings
        </dd>
        <dt>58 ms</dt>
        <dd>
            when a player saw the result of a press, not only when they pressed
        </dd>
        <dt>EMG</dt>
        <dd>when the thumb started to move, before the screen was touched</dd>
        <dt>Photodiode</dt>
        <dd>when the screen actually updated</dd>
    </dl>
    <Callout label="WHY IT MATTERS">
        <p>
            We get a real-time, interactive group game with timing precise
            enough to compare the brain responses from all participants.
        </p>
    </Callout>
</Slide>
