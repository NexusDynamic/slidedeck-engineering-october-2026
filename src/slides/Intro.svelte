<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    import synchrony from "$siteStatic/_assets/images/_vault/rise-together/ps760883.f1.webp";
    import Slide from "../components/Slide.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import Cite from "../components/Cite.svelte";
    import { talk } from "../meta";
    import { refs } from "../refs";

    // what makes brains line up, from the least to the most interesting
    const layers = [
        {
            name: "shared stimulus",
            sub: "same room, same screen, same trial timing",
        },
        {
            name: "shared action",
            sub: "pressing together, steering the same paddle",
        },
        { name: "shared attention", sub: "watching the same ball" },
        { name: "team membership?", sub: 'being on the same side: "us"' },
    ];
</script>

<section class="slide title-slide" data-state="bare">
    <!-- for a projector that washes out the dark theme; T does the same on any slide -->
    <button
        type="button"
        class="theme-toggle"
        onclick={() => document.documentElement.classList.toggle("dark")}
        aria-label="Switch between the dark and light theme"
    >
        <span class="only-dark">☀ light</span><span class="only-light">
            ☾ dark
        </span>
    </button>
    <div class="title-text">
        <p class="prompt">
            <span>$</span> stat rise-together → {talk.occasion}, {talk.date}
        </p>
        <h1>{talk.title}</h1>
        <p class="subtitle">{talk.subtitle}</p>
        <p class="byline">{talk.author} | {talk.affiliation}</p>
        <div class="title-logo"><AuLogo variant="stacked" /></div>
    </div>
    <figure class="title-photo">
        <img
            src={lab}
            alt="Six seats in a circle, each with an iPad on a stand and a mannequin head wearing an EEG cap"
        />
        <figcaption>the group EEG hyperscanning lab</figcaption>
    </figure>
</section>

<Slide
    title="Coordination between people"
    prompt="cat background.md"
    class="split paper-right"
>
    <ul class="compact">
        <li>
            In joint action, people coordinate their actions in time to reach a
            shared goal <Cite text={refs.vesper2010} />.
        </li>
        <li>
            Hyperscanning records several people at once; inter-brain synchrony
            is studied as a neural correlate of interaction
            <Cite text={[refs.wheatley2024, refs.schilbach2025]} />.
        </li>
        <li>
            Cooperation goes with higher inter-brain synchrony than working
            alone or resting, mostly in fNIRS
            <Cite text={[refs.cui2012, refs.czeszumski2022]} />. Direct
            cooperation vs competition contrasts are fewer, and mixed.
        </li>
        <li>
            Most of this is in dyads. Groups of three or more are rare
            <Cite text={[refs.dikker2017, refs.reinero2021, refs.zamm2026]} />.
        </li>
    </ul>
    <figure class="paper">
        <img
            src={synchrony}
            alt="Left: three people behind dividers watching the same screen show similar brain responses. Right: two people interacting face to face show real-time neural alignment."
        />
        <figcaption>Schilbach &amp; Redcay, 2025</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Cui et al. 2012 ~ along the same lines: two people pressing buttons
            side by side, trying to press together or faster than the other.
            (fNIRS, wavelet) Coherence rose in cooperation, not competition.
            There's an fNIRS meta-analysis (13 studies) that mostly compares
            cooperation with individual or rest conditions, not with
            competition.
        </p>
        <p>
            There are some studies with groups: classroom, portable EEG (Dikker
            2017) Teams of four; synchrony predicted performance, self-reported
            identification did not (Reinero 2021), and the Tapping Orchestra
            study with up to ten people (Anna and Simon preprint).
        </p>
        <p>
            We can use recorded brain data to analyse neural synchrony, figure
            shows interactive synchrony and similarity as two distinct things.
            Left side of, figure: no interaction, only the same input, and still
            similar brain responses. Holroyd's (critical) example: two people
            listening to the same radio station in different rooms.
        </p>
    {/snippet}
</Slide>

<Slide
    title="But synchrony is easy to get"
    prompt="grep -c confound"
    class="split"
>
    <div>
        <ul class="compact">
            <li>
                Shared stimuli and shared actions produce synchrony without any
                interaction <Cite
                    text={[refs.hamilton2021, refs.holroyd2022]}
                />.
            </li>
            <li>
                Teams, as in sport: cooperate within, compete between, at the
                same time.
            </li>
            <li>
                Arbitrary groups are enough for in-group preference
                <Cite text={refs.tajfel1971} />, so teams can be reassigned.
            </li>
        </ul>
        <Callout label="RESEARCH QUESTION">
            <p>
                Does team membership modulate coupling between people, beyond
                what they share in stimulus, environment and action?
            </p>
        </Callout>
    </div>
    <ol class="layers">
        {#each layers.toReversed() as layer (layer.name)}
            <li>{layer.name}<small>{layer.sub}</small></li>
        {/each}
    </ol>
    {#snippet notes()}
        <p>
            Intuitively, there is something that feels different about two
            people doing the same thing separately, or jointly, but it's hard to
            get at with the tools we currently have.
        </p>
        <p>
            My expectation is that most of the coupling is explained by the
            shared aspects of what a participant is doing. My experiment is
            designed to try and account for and be able to measure the lower
            layers, and investigate what's remaining.
        </p>
        <p>
            Coupling is looked at on three levels: behaviour (button presses),
            ratings (identification, closeness) and EEG (inter-subject
            correlation).
        </p>
    {/snippet}
</Slide>
