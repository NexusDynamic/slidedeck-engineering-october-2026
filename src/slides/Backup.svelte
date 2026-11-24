<script lang="ts">
    import Slide from "../components/Slide.svelte";

    // the notebook's figures, in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
</script>

<!-- after the references: only shown if someone asks -->

<Slide title="Backup: tap-locked EEG" prompt="plot motor-baseline-erp" class="split result">
    <div>
        <ul class="compact">
            <li>
                Motor baseline: bubbles appear one at a time and are tapped as
                fast as possible. EEG time-locked to left-thumb taps, averaged
                per session.
            </li>
            <li>
                Similar waveform and latency in all 8 sessions: the game's events
                are aligned to the EEG consistently across sessions.
            </li>
            <li>
                Similar activity appears across the scalp, so this is read as a
                general tap-locked response, not a specific motor component.
            </li>
        </ul>
        <p class="aside">
            The pre-tap deflection may include the response to the bubble
            appearing (visual, or an eye movement towards it).
        </p>
    </div>
    <figure class="plot">
        <img
            src={img("ica.png")}
            alt="Tap-locked grand average at FC2, C4 and CP2 for each of 8 sessions: a negative deflection before the tap and a positive peak about 100 ms after, similar in every session"
        />
        <figcaption>
            ROI FC2/C4/CP2 · one line per session · red: tap · grey: baseline
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Session 8 differs most: only four participants with EEG, and the
            noisiest channels of the dataset (CP1/CP2 and P4 in two people).
        </p>
        <p>
            Consistent session averages are what good alignment predicts; they
            are not by themselves a measurement of the timing error. That comes
            from the photodiode and trigger validation.
        </p>
    {/snippet}
</Slide>

<Slide title="Backup: ISC with a shared stimulus" prompt="plot motor-baseline-isc" class="split result">
    <ul class="compact">
        <li>
            In the motor baseline, the same bubble appears at the same place and
            moment on every tablet: a shared stimulus, by design.
        </li>
        <li>
            ISC here is stimulus-driven. The first component's topography
            (frontal pole vs posterior) is consistent with eye movements and
            blinks.
        </li>
        <li>
            The joint-play ISC has to be checked for the same contribution; this
            analysis is in progress.
        </li>
    </ul>
    <figure class="plot">
        <img
            src={img("motorbaseline.png")}
            alt="Forward models of the top three ISC components in the motor baseline: C1 frontal positive and posterior negative, C2 left lateral, C3 right central"
        />
        <figcaption>top 3 correlated components, motor baseline (180 s)</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            ISC values here (C1 0.059) are not comparable with the joint-play
            values: different task, different stimulus, and every person sees
            the identical sequence.
        </p>
        <p>
            Joint-play preprocessing regresses out EOG, but saccades towards the
            ball and paddle are shared by teammates more than by opponents, so
            any residual ocular activity would favour the own-team level.
        </p>
    {/snippet}
</Slide>
