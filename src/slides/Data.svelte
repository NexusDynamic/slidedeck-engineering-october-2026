<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import Comparisons from "../components/Comparisons.svelte";
    import TapSignal from "../components/TapSignal.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures (RiseTogether-analysis/explore/s05_plots_for_talk.ipynb), in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
</script>

<Slide
    title="Behavioural coupling"
    prompt="plot input-coupling"
    class="split result beh"
>
    <div class="explain">
        <p class="definition">
            <strong>coupling</strong>: how closely one player's actions follow
            another's
        </p>
        <TapSignal />
        <Comparisons />
    </div>
    <figure class="plot">
        <img
            src={img("beh.png")}
            alt="Button-press correlation: around 0.31 for own team, near zero for other team, other group and time-shifted"
        />
        <p class="footnote">
            <sup>***</sup> p &lt; .001, permutation test (own vs other team)
        </p>
        <figcaption>
            dots: one team in one condition · black: mean ± SE over 8 groups
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            By coupling I mean: responses or actions that are aligned with, or
            similar to, those of the people on your team. (Not coupling in the
            oscillator sense; that's a later analysis.)
        </p>
        <p>
            Left: each player's button presses as a signal, right +1, left −1,
            nothing 0, smoothed with a Gaussian (σ = 150 ms), and correlated
            between two players over each trial.
        </p>
        <p>
            Key: own team = two players on the same team, steering the same
            paddle. Other team = the opponents in the same game. Other group =
            someone from a different session. Time-shifted = own team, one
            signal shifted by at least 10 s: chance.
        </p>
        <p>
            Teammates' inputs correlate: own − other team Δr = 0.31, permutation
            p &lt; .0001. Other team, other group and time-shifted are all near
            zero. Expected, as teammates steer the same paddle: a check of the
            measure.
        </p>
        <p>
            Mismatched: the high team's inputs were more coupled than the low
            team's.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Psychological coupling"
    prompt="plot ratings"
    class="pair"
>
    <div class="pair-plots">
        <figure class="plot">
            <p class="plot-label">
                team identification <span>(SISI, 1–7)</span> · pre-condition +
                after each trial
            </p>
            <img
                src={img("sisi.png")}
                alt="Team identification ratings across a condition: social control starts lowest and rises"
            />
            <figcaption>mean ± SE over groups</figcaption>
        </figure>
        <figure class="plot">
            <p class="plot-label">rated vs actual team performance</p>
            <img
                src={img("perf.png")}
                alt="Rated team and opponent performance against actual distance, both increasing"
            />
            <figcaption>one dot per rating</figcaption>
        </figure>
    </div>
    {#snippet notes()}
        <p>
            Single-item social identification (SISI): "I identify with my team",
            1–7, before each condition and after each trial.
        </p>
        <ul>
            <li>
                Social control (teammates hidden): identification before play is
                about 2 points lower than matched, and catches up within the
                condition.
            </li>
            <li>
                Mismatched: identification rises for the high team and falls for
                the low team, but that's confounded with winning or losing each
                trial.
            </li>
            <li>
                Performance ratings, made before the results are shown, track
                both teams' distance (ρ = .60 and .53): players follow the other
                team too.
            </li>
        </ul>
        <p>
            Exploratory. In teams of four, self-reported identification did not
            track inter-brain synchrony (Reinero 2021).
        </p>
        <p>
            [Stats, if asked: linear mixed models with random intercepts for
            group and participant]
        </p>
    {/snippet}
</Slide>

<Slide
    title="Neural coupling (preliminary)"
    prompt="plot isc"
    class="split result neural"
>
    <div class="explain">
        <p class="method">
            inter-subject correlation (ISC) · correlated components
            <Cite text={refs.parra2019} /> · fitted leaving one group out
        </p>
        <Comparisons compact />
    </div>
    <figure class="plot">
        <img
            src={img("eeg.png")}
            alt="Trial-averaged ISC of the first component: highest for own team, lower for other team, near zero for other group and time-shifted; fronto-central topography"
        />
        <p class="footnote">
            <sup>***</sup> p &lt; .001 (own vs other team) · <sup>**</sup> p &lt;
            .01 (other team vs other group) · permutation tests
        </p>
        <figcaption>
            dots: one team in one condition · black: mean ± SE over 8 groups ·
            right: forward model of C1
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Validated pipeline: correlated component analysis (Parra 2019),
            fitted leaving one group out, and the inter-subject correlation of
            the first component, averaged over trials.
        </p>
        <p>
            Own &gt; other team (p &lt; .0001); other team &gt; other group (p =
            .008); other group ≈ time-shifted. The same ordering as for
            behaviour, and the same holds for components 2 and 3.
        </p>
        <p>
            Caveat: teammates also press together and watch the same paddle;
            shared action and gaze could produce this pattern on their own.
            Team membership, joint action, shared gaze and environment are all
            still mixed together here.
        </p>
        <p>
            [Preprocessing, if asked: 1–40 Hz, bad channels interpolated,
            average reference, EOG regressed out.]
        </p>
    {/snippet}
</Slide>
