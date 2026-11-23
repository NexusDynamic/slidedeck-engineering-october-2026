<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    import synchrony from "$siteStatic/_assets/images/_vault/rise-together/ps760883.f1.webp";
    import Slide from "../components/Slide.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import Cite from "../components/Cite.svelte";
    import { talk } from "../meta";
    import { refs } from "../refs";

    const levels = [
        {
            name: "Behavioural",
            q: "Do teammates act together?",
            m: "button-press time series",
        },
        {
            name: "Psychological",
            q: "Do people feel closer to their team?",
            m: "identification & closeness ratings",
        },
        {
            name: "Neural",
            q: "Is teammates' EEG more alike?",
            m: "inter-subject correlation",
        },
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
            Cooperation and competition have been contrasted in fNIRS <Cite
                text={refs.czeszumski2022}
            /> and EEG <Cite text={refs.susnoschi2021} /> hyperscanning, mostly in
            pairs.
        </li>
        <li>
            A shared stimulus or a shared action also produces synchrony,
            without any interaction.
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
            Coupling can be measured at several levels: what people do, what
            they report, and their brain activity.
        </p>
        <p>
            Left of the figure: no interaction, only the same input, and still
            similar brain responses. So any group measure has to be compared
            against people who share the same input but do not interact.
        </p>
    {/snippet}
</Slide>

<Slide title="Teams: cooperation and competition" prompt="cat question.md">
    <ul class="compact">
        <li>
            Teams as in sport and video games: cooperate within the team,
            compete with the other team.
        </li>
        <li>
            Assigning people to arbitrary groups is enough to produce in-group
            preference <Cite text={refs.tajfel1971} />. So teams can be
            reassigned within a session, and the same people compared as
            teammates and as opponents.
        </li>
    </ul>
    <Callout label="RESEARCH QUESTION">
        <p>
            Is coupling between people higher within a team than between teams,
            once what everyone in the room shares is accounted for?
        </p>
    </Callout>
    <div class="three">
        {#each levels as l (l.name)}
            <div class="box build">
                <b>{l.name}</b>
                <span>{l.q}</span>
                <small>{l.m}</small>
            </div>
        {/each}
    </div>
    {#snippet notes()}
        <p>
            The longer-term question that motivates this: is a group more than
            its members? Is there something shared between the people in a group
            that is not explained by what they each see and do? This study does
            not answer that yet; it builds the paradigm and checks the measures
            needed to ask it.
        </p>
        <p>The three levels are the structure for the results section.</p>
    {/snippet}
</Slide>
