<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the notebook's figures (RiseTogether-analysis/explore/s05_plots_for_talk.ipynb), in public/
    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
</script>

<Slide title="Behavioural coupling" prompt="plot input-coupling" class="split result">
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
            sessions
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Each dot is a team in one block, averaged over its trials. Lines join
            the same team across the four levels.
        </p>
        <p>
            Skill-sorted teams: the high team's inputs were more coupled than the
            low team's (Δr = 0.11, sign-flip test over sessions, p = .016).
        </p>
    {/snippet}
</Slide>

<Slide title="Psychological coupling" prompt="plot ratings" class="split result">
    <ul class="compact">
        <li>
            Closer to own team than to the other team (IOS,
            <span class="stat">+2.2</span> on a 1–7 scale).
        </li>
        <li>
            Teammates hidden (<span class="cond blinded">blinded</span>):
            identification before play <span class="stat">−2.0</span> vs
            <span class="cond balanced">balanced</span>; catches up within the
            block.
        </li>
        <li>
            Skill-sorted: rises for <span class="cond hl">HL high</span>, falls
            for <span class="cond hl-low">HL low</span> (confounded with
            winning).
        </li>
        <li>
            Performance ratings, made before the results, track both teams'
            distance (<span class="stat">ρ = .60</span>,
            <span class="stat">.53</span>).
        </li>
    </ul>
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
            top: mean ± SE over sessions · bottom: one dot per rating
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Linear mixed models with random intercepts for session and
            participant. Pre-block identification is rated after the teams are
            announced but before playing: in blinded blocks, that is all the
            information people have.
        </p>
        <p>
            The skill-sorted high team won 95% of trials, so the HL contrast
            cannot separate skill from winning. In mixed-skill blocks, win rate
            predicts closeness and coordination ratings.
        </p>
        <p>
            The performance ratings show that participants follow both teams'
            progress, not only their own.
        </p>
    {/snippet}
</Slide>

<Slide title="Neural coupling (preliminary)" prompt="plot isc" class="split result">
    <div>
        <ul class="compact">
            <li>
                Correlated component analysis <Cite text={refs.parra2019} />,
                fitted leaving one session out; inter-subject correlation (ISC)
                of the first component.
            </li>
            <li>
                Own &gt; other team (<span class="stat">p &lt; .0001</span>);
                other team &gt; other group (<span class="stat">p = .008</span>);
                other group ≈ time-shifted.
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
            dots: team-blocks · black: mean ± SE over 8 sessions · right:
            forward model of C1
        </figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Preprocessing: 1–40 Hz, bad channels interpolated, average reference,
            EOG regressed out. The spatial filters never see team labels, and
            fitting them without the held-out session avoids circular analysis.
        </p>
        <p>
            The same pattern holds for components 2 and 3 and for the raw
            channels (own vs other team). The other team vs other group step is
            only present for C1 and the channels.
        </p>
        <p>
            So for now this is a sanity check of the EEG and the counterpart of
            the behavioural result, not evidence about team identity by itself.
        </p>
    {/snippet}
</Slide>
