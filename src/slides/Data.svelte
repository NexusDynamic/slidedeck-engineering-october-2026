<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import Comparisons from "../components/Comparisons.svelte";
    import TapSignal from "../components/TapSignal.svelte";
    import InsetPlot from "../components/InsetPlot.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures (RiseTogether-analysis/explore/s05_plots_for_talk.ipynb), in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

    // the by-condition insets (1020 × 900), without their titles and y-axis labels
    const behCrop = { x: 90, y: 140, w: 910, h: 730 };
    const eegCrop = { x: 70, y: 140, w: 930, h: 730 };
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
    </div>

    <!-- step 1: the plot; step 2: own team by condition, called out -->
    <figure class="plot fragment">
        <InsetPlot
            src={img("beh.png")}
            alt="Button-press correlation: around 0.31 for own team, near zero for other team, other group and time-shifted"
            width={1800}
            height={900}
            inset={img("beh_conditions.png")}
            insetAlt="Own team by condition: balanced and blinded about 0.32 (n.s.), HL high 0.37 above HL low 0.28 (p < .05)"
            insetSize={[1020, 900]}
            crop={behCrop}
            from={{ x: 250, y: 245, w: 185, h: 455 }}
            to={{ x: 860, y: 168, w: 580 }}
        />
        <p class="footnote">
            <sup>***</sup> p &lt; .001, <sup>*</sup> p &lt; .05, permutation
            tests; <sup>n.s.</sup> = not significant
        </p>
        <figcaption>
            dots: one team in one condition · black: mean ± SE over 9 groups ·
            inset: own team by condition
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
            [next] Key: own team = two players on the same team, steering the
            same paddle. Other team = the opponents in the same game. Other
            group = someone from a different session. Time-shifted = surrogate
            data: own team, one signal circularly shifted by at least 10 s, so
            any alignment is chance.
        </p>
        <p>
            Teammates' inputs correlate: own − other team Δr = 0.31, permutation
            p &lt; .0001. Other team, other group and time-shifted are all near
            zero. Expected, as teammates steer the same paddle: a check of the
            measure.
        </p>
        <p>
            [next] Zooming in on the own-team column, by condition: main task
            and blinded are the same (n.s.). In the skill/rank condition, the
            high team's inputs were more coupled than the low team's (p &lt;
            .05).
        </p>
    {/snippet}
</Slide>

<Slide title="Psychological coupling" prompt="plot ratings" class="pair">
    <div class="pair-plots">
        <figure class="plot">
            <p class="plot-label">
                team identification <span>(SISI, 1–7)</span> · pre-condition + after
                each trial
            </p>
            <img
                src={img("sisi.png")}
                alt="Team identification ratings across a condition: blinded starts lowest and rises"
            />
            <figcaption>mean ± SE over groups</figcaption>
        </figure>
        <figure class="plot">
            <p class="plot-label">
                change from the <span>pre-condition</span> rating
            </p>
            <img
                src={img("sisi_change.png")}
                alt="Change in team identification from the pre-condition rating: blinded rises about 2 points, HL high about 1, balanced about 0.3, HL low stays near zero"
            />
            <figcaption>mean ± SE over groups</figcaption>
        </figure>
    </div>
    {#snippet notes()}
        <p>
            Single-item social identification (SISI): "I identify with my team",
            1–7, before each condition and after each trial.
        </p>
        <ul>
            <li>
                Blinded (teammates hidden): identification before play is about
                2 points lower than in the main task, and catches up within the
                condition: the biggest change of all.
            </li>
            <li>
                Main task (balanced): already high before play, and stays there.
            </li>
            <li>
                Skill/rank: identification rises for the high team (about +1)
                and stays flat for the low team, but that's confounded with
                winning or losing each trial.
            </li>
        </ul>
        <p>
            Exploratory. In teams of four, self-reported identification has not
            been found to track inter-brain synchrony.
        </p>
        <p>
            [Stats, if asked: linear mixed models with random intercepts for
            group and participant. Rated vs actual performance is on an extra
            slide.]
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
            inter-subject correlation (ISC) of the maximally correlated
            component <Cite text={refs.parra2019} /> · fitted leaving one group out
            · chance: circularly shifted surrogates
        </p>
        <Comparisons compact />
    </div>
    <figure class="plot">
        <InsetPlot
            src={img("eeg.png")}
            alt="Trial-averaged ISC of the first component: highest for own team, lower for other team, near zero for other group and time-shifted; fronto-central topography"
            width={1800}
            height={900}
            inset={img("eeg_conditions.png")}
            insetAlt="Own-team ISC by condition: balanced and blinded about 0.020, HL high 0.024, HL low 0.020; no differences significant"
            insetSize={[1020, 900]}
            crop={eegCrop}
            from={{ x: 255, y: 250, w: 150, h: 490 }}
            to={{ x: 605, y: 168, w: 455 }}
        />
        <p class="footnote">
            <sup>***</sup> p &lt; .001 · <sup>**</sup> p &lt; .01 · <sup>*</sup>
            p &lt; .05 · <sup>n.s.</sup> not significant · permutation tests
        </p>
        <figcaption>
            dots: one team in one condition · black: mean ± SE over 9 groups ·
            inset: own team by condition · right: forward projection of C1
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            The measure is inter-subject correlation, ISC: we find the component
            of the EEG, a weighted sum of the electrodes, that is maximally
            correlated across people (correlated component analysis). It is
            fitted on all the groups but one and applied to the group left out,
            so a group's data never decides its own component. Then the
            correlation of that first component between two people, averaged
            over trials.
        </p>
        <p>
            Chance level: surrogate data, made by circularly shifting one
            person's data in time (by at least 10 s), which keeps the signal but
            breaks any alignment between the two people.
        </p>
        <p>
            Own &gt; other team (p &lt; .0001); other team &gt; other group (p =
            .008); other group slightly above the surrogates. The same ordering
            as for behaviour, and the same holds for components 2 and 3.
        </p>
        <p>
            The topography is the forward projection of the first ISC component:
            what it looks like on the scalp. Fronto-central positive, posterior
            negative.
        </p>
        <p>
            [the inset] Own team by condition: no differences between the
            conditions yet, though high &gt; low trends the same way as
            behaviour.
        </p>
        <p>
            Caveat: teammates also press together and watch the same paddle;
            shared action and gaze could produce this pattern on their own. Team
            membership, joint action, shared gaze and environment are all still
            mixed together here.
        </p>
        <p>
            [Preprocessing and the component, if asked: extra slides. 1–40 Hz,
            bad channels interpolated, average reference, EOG regressed out.]
        </p>
    {/snippet}
</Slide>
