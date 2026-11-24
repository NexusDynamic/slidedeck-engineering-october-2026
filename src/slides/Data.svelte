<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures (RiseTogether-analysis/explore/s05_plots_for_talk.ipynb), in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
</script>

<Slide
    title="Behavioural coupling"
    prompt="plot input-coupling"
    class="split result"
>
    <div>
        <ul class="compact">
            <li>
                Button presses as a time series (left −1, none 0, right +1,
                smoothed σ = 150 ms), correlated per trial.
            </li>
            <li>
                Teammates' inputs correlate: own − other team
                <span class="stat">Δr = 0.31</span>, permutation
                <span class="stat">p &lt; .0001</span>.
            </li>
            <li>
                Other team, other group and time-shifted pairs are all near
                zero.
            </li>
        </ul>
        <p class="aside">
            Expected, as teammates steer the same paddle: a check of the
            measure.
        </p>
    </div>
    <figure class="plot">
        <img
            src={img("beh.png")}
            alt="Button-press correlation: around 0.31 for own team, near zero for other team, other group and time-shifted"
        />
        <figcaption>
            dots: team-blocks, coloured by block type · black: mean ± SE over 8
            groups
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Each dot is a team in one block, averaged over the block's trials.
            Lines join the same team across the four levels.
        </p>
        <p>
            Skill-sorted teams: perhaps unsurprisingly, the high team's inputs
            were more coupled than the low team's
        </p>
        <p>
            This is a nice validation of the behavioural data - if people are
            trying to work together, then there should be more correlation of
            actions within that team.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Psychological coupling"
    prompt="plot ratings"
    class="split result"
>
    <div>
        <ul class="compact">
            <li>
                Closer to own team than to the other team (IOS,
                <span class="stat">+2.2</span> on a 1–7 scale).
            </li>
            <li>
                Teammates hidden (<span class="cond blinded">blinded</span>):
                identification before play <span class="stat">−2.0</span> vs
                <span class="cond balanced">balanced</span>; catches up within
                the block.
            </li>
            <li>
                Performance ratings, made before the results, track both teams'
                distance (<span class="stat">ρ = .60</span>,
                <span class="stat">.53</span>): players follow the other team
                too.
            </li>
        </ul>
        <p class="aside">
            Exploratory. In teams of four, self-reported identification did not
            track inter-brain synchrony <Cite text={refs.reinero2021} />.
        </p>
    </div>
    <figure class="plot stack">
        <img
            src={img("sisi.png")}
            alt="Team identification ratings across a block, by block type: blinded starts lowest and rises"
        />
        <img
            src={img("perf.png")}
            alt="Rated team and opponent performance against actual distance, both increasing"
        />
        <figcaption>
            top: mean ± SE over groups · bottom: one dot per rating
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>Preliminary analysis of some of the survey results show:</p>
        <ul>
            <li>
                A lower rating of identification when the teammates are unknown
            </li>
            <li>
                In mixed-skill blocks, win rate predicts closeness and
                coordination ratings (again perhaps unsurprisingly, people might
                feel good about being on the winning team)
            </li>
        </ul>

        <p>
            The performance ratings show that participants are generally pretty
            good at judging both their own team, and the opponent team's
            performance
        </p>
        <p>
            Skill-sorted: Identification rises for the high team and falls for
            the low team, but that is confounded with winning / losing each
            trial
        </p>
        <p>
            [Stats, if asked: Linear mixed models with random intercepts for
            groups and participant]
        </p>
    {/snippet}
</Slide>

<Slide
    title="Neural coupling (preliminary)"
    prompt="plot isc"
    class="split result"
>
    <div>
        <ul class="compact">
            <li>
                Correlated component analysis <Cite text={refs.parra2019} />,
                fitted leaving one group out; inter-subject correlation (ISC) of
                the first component.
            </li>
            <li>
                Own &gt; other team (<span class="stat">p &lt; .0001</span>);
                other team &gt; other group (<span class="stat">
                    p = .008
                </span>); other group ≈ time-shifted.
            </li>
            <li>The same ordering as for behaviour.</li>
        </ul>
        <Callout label="CAVEAT">
            <p>
                Teammates also press together and watch the same paddle; shared
                action and gaze could produce this pattern on their own.
            </p>
        </Callout>
    </div>
    <figure class="plot">
        <img
            src={img("eeg.png")}
            alt="Group ISC of the first component: highest for own team, lower for other team, near zero for other group and time-shifted; fronto-central topography"
        />
        <figcaption>
            dots: team-blocks · black: mean ± SE over 8 groups · right: forward
            model of C1
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Here we see a similar trend to the behavioural data, and the same
            pattern holds for components 2 and 3 of ISC
        </p>
        <p>
            For now this is a sanity check of the EEG and a counterpart to
            behavioural data.
        </p>
        <p>
            Own > other team: team membership, joint action, shared gaze and
            environment are all still mixed together.
        </p>
        <p>
            [Preprocessing, if asked: 1–40 Hz, bad channels interpolated,
            average reference, EOG regressed out.]
        </p>
    {/snippet}
</Slide>

<Slide
    title="Bubble-locked EEG"
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
