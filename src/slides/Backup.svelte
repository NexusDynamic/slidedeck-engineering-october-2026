<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures, in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
</script>

<!-- after the references: only shown if someone asks -->

<Slide title="[extra] Measures and timing" prompt="ls data/">
    <dl class="streams wide">
        <dt>EEG, EMG, IMU</dt>
        <dd>all participants recorded simultaneously</dd>
        <dt>Behaviour</dt>
        <dd>
            Each button press and release, game state, aligned to the reference
            clock
        </dd>
        <dt>Ratings</dt>
        <dd>
            "I identify with my team" (1–7) <Cite text={refs.postmes2013} />,
            before each block and after each trial; closeness to own / other
            team (IOS) <Cite text={refs.aron1992} />, after each block;
            performance and coordination, after each trial
        </dd>
    </dl>
    <Callout label="TIMING">
        <p>
            Events from every device are timestamped with Lab Streaming Layer
            via liblsl.dart <Cite text={refs.ring2026} /> and aligned to each EEG
            recording; screen updates are measured with a photodiode.
        </p>
    </Callout>
    {#snippet notes()}
        <p>
            To compare several brains, the same game event has to be located in
            every EEG recording. Six tablets, a coordinator and six amplifiers
            each run their own clock. liblsl.dart brings Lab Streaming Layer to
            Flutter apps, which is what the game is built with; the timing was
            validated with a photodiode and EMG. The JOSS paper has the details.
        </p>
    {/snippet}
</Slide>

<Slide
    title="[extra] ISC with shared stimuli"
    prompt="plot motor-baseline-isc"
    class="split result"
>
    <ul class="compact">
        <li>
            In the motor baseline, the same bubble appears at the same place and
            moment on every tablet.
        </li>
        <li>
            ISC here is stimulus-driven. The first component's topography
            (frontal pole vs posterior) is consistent with eye movements and
            blinks (despite EOG regression).
        </li>
        <li>Joint-play ISC analysis still needs to be completed.</li>
    </ul>
    <figure class="plot">
        <img
            src={img("motorbaseline.png")}
            alt="Forward models of the top three ISC components in the motor baseline: C1 frontal positive and posterior negative, C2 left lateral, C3 right central"
        />
        <figcaption>
            top 3 correlated components, motor baseline (180 s)
        </figcaption>
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

<Slide
    title="[extra] Tap-locked EEG"
    prompt="plot motor-baseline-erp"
    class="split result"
>
    <div>
        <ul class="compact">
            <li>
                Motor baseline: bubbles appear one at a time and are tapped as
                fast as possible. EEG time-locked to left-thumb taps, averaged
                per session.
            </li>
            <li>
                Similar waveform and latency in all 8 groups: the game's events
                are aligned to the EEG consistently across sessions.
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
            alt="Tap-locked grand average at FC2, C4 and CP2 for each of 8 sessions: a negative deflection before the tap and a positive peak about 100 ms after, similar in every group"
        />
        <figcaption>
            ROI FC2/C4/CP2 · one line per group · red: tap · grey: baseline
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            group 8 differs most: only four participants with EEG, and the
            noisiest channels of the dataset (CP1/CP2 and P4 in two people).
        </p>
        <p>
            Consistent session averages are what good alignment predicts; they
            are not by themselves a measurement of the timing error. That comes
            from the photodiode and trigger validation.
        </p>
    {/snippet}
</Slide>
