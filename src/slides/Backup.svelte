<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures, in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

    // what each comparison level shares, from most to least
    const shared = ["task", "trial onset", "room", "screen", "paddle & goal"];
    const levels = [
        { name: "own team", has: 5, sub: "pairs within a team", half: null },
        {
            name: "other team",
            has: 4,
            sub: "same trial, opposing team",
            half: 4,
        },
        {
            name: "other group",
            has: 3,
            sub: "same trial, another group of participants",
            half: 3,
        },
        {
            name: "time-shifted/surrogate",
            has: 0,
            sub: "own team, shifted ≥ 10 s",
            half: null,
        },
    ];
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
            before each condition and after each trial; closeness to own / other
            team (IOS) <Cite text={refs.aron1992} />, after each condition;
            performance and coordination, after each trial
        </dd>
    </dl>
    <Callout label="TIMING">
        <p>
            Events from every device are timestamped with Lab Streaming Layer
            <Cite text={refs.kothe2025} /> via liblsl.dart <Cite text={refs.ring2026} /> and aligned to each EEG
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

<Slide title="[extra] Comparisons" prompt="cat analysis.md">
    <table class="levels">
        <caption>common features across comparisons</caption>
        <thead>
            <tr>
                <th></th>
                {#each shared as s (s)}<th>{s}</th>{/each}
            </tr>
        </thead>
        <tbody>
            {#each levels as l (l.name)}
                <tr>
                    <th>{l.name}<small>{l.sub}</small></th>
                    {#each shared as s, i (s)}
                        {#if l.half && l.half == i + 1}
                            <td class="on half">◐</td>
                        {:else}
                            <td class:on={i < l.has}>
                                {i < l.has ? "●" : "○"}
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <ul class="compact">
        <li>The same comparison levels can be used for behaviour and EEG.</li>
        <li>
            <strong>vs other team</strong>: same task, room and screen<sup>
                *
            </sup>. differs in team membership <em>and</em> in shared control of the
            paddle.
        </li>
        <li>
            <strong>vs other group</strong>: same task and room<sup>^</sup>.
        </li>
    </ul>
    <p>
        <small>
            <sup>*</sup> While they see the play of their own team and the opponent,
            it diverges once there is a distance between the teams
        </small>
    </p>
    <p>
        <small>
            <sup>^</sup> Of course, the weather can mean slightly different lighting
            conditions. Time of day might affect participant alertness.
        </small>
    </p>
    {#snippet notes()}
        <p>
            We can compare correlation of behaviour and neural data within a
            team, across teams that play together, across groups of participants
            and against circular-shifted surrogate data (to get a chance level
            estimate).
        </p>
        <p>Groups of participants stay independent.</p>
    {/snippet}
</Slide>

<Slide
    title="[extra] Bubble-locked EEG"
    prompt="plot motor-baseline-erp"
    class="split result"
>
    <div>
        <ul class="compact">
            <li>
                Motor baseline: a bubble appears every <span class="stat">
                    ~1.7 s
                </span>, at the same moment on all six tablets, and each person
                taps it.
            </li>
            <li>
                Overlapping responses to bubbles and taps separated by
                regression
                <Cite text={refs.ehinger2019} />.
            </li>
            <li>
                Visual response over the back of the head from <span
                    class="stat"
                >
                    ~170 ms
                </span>, strongest on the side opposite the bubble.
            </li>
        </ul>
        <p class="aside">
            Saccades occur <span class="stat">~145 ms</span> after the bubble
            appears; eye and muscle artefacts removed with ICA <Cite
                text={refs.dimigen2020}
            />
            <Cite text={refs.piontonachini2019} />.
        </p>
    </div>
    <figure class="plot">
        <img
            src={img("erp_bubble.png")}
            alt="Grand-average response to a bubble appearing: butterfly plot of all electrodes with global field power, and scalp maps at the three largest peaks, 184, 248 and 424 ms: posterior negative, then posterior positive, then frontal negative with bilateral posterior positive"
        />
        <figcaption>
            grey: each electrode · black: global field power · maps at the GFP
            peaks · 45 participants, 8 groups
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Data: motor baseline/localizer task, 3 mins per person, where
            bubbles appear simultaneously on all participant's iPads.
        </p>
        <p>
            This just gives as another nice plot to show, but more importantly
            an extra confirmation that we're managing to collect good data. And
            somewhere around the 300 ms mark is where we'd expect the
            participants to actually tap the bubble.
        </p>
        <p>
            We can see what's very likely a P200 visual response from the
            participants.
        </p>
        <p>---------------------quick ref----------------</p>
        <p>
            (photodiode; 3 people without a photodiode onset: estimated from the
            tablet log; where both exist, the estimate is off by SD 3.7 ms, at
            most 14 ms). 45 participants in 8 groups.
        </p>
        <p>
            Preprocessing: known bad channels marked (lab notes and a
            neighbour-prediction check), notch 50 Hz and harmonics, band-pass
            1–40 Hz (FIR), mastoids dropped, average reference of the good
            channels, EOG regression (least squares on the 3 EOG channels).
        </p>
        <p>
            ICA, per person: fitted on a 2–100 Hz copy of the same data,
            extended Infomax (Picard), as many components as the data's rank
            (median 26), 1 s stretches over 400 µV skipped. OPTICAT: short
            stretches around every saccade onset (−30 to +20 ms) are added to
            the training data in copies, as long as the recording itself, so the
            saccadic spike potential gets its own component. Saccades from the
            EOG (horizontal EOG4 − EOG3, vertical EOG2 − mean of EOG3/EOG4;
            velocity over 6 median-based SDs, Engbert & Kliegl 2003).
        </p>
        <p>
            Components removed: ICLabel eye, heart, line or channel noise at p ≥
            0.7, muscle at p ≥ 0.8; or saccade/fixation variance ratio over 2.0
            (Plöchl et al. 2012; Dimigen uses 1.1, but here the saccade follows
            the bubble closely, so the window also holds the visual response and
            brain components reach ~1.3). Median 5 of 26 removed. The ICA is
            applied to the 1–40 Hz data, then bad channels interpolated
            (spherical spline), average reference, resampled to 125 Hz.
        </p>
        <p>
            Deconvolution (rERP / unfold-style): one least-squares FIR model per
            person, all channels, with separate kernels for bubbles on the left
            and right half of the screen (−300 to 1200 ms) and for taps on the
            left and right (−500 to 800 ms); light ridge (10⁻³). Each event's
            response is corrected for the overlapping others. "Either side" =
            mean of the left and right kernels; then the grand average over
            participants. No baseline correction (the model has none to need).
            GFP = standard deviation over electrodes at each moment.
        </p>
    {/snippet}
</Slide>
