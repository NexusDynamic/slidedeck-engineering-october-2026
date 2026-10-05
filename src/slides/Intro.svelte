<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    import Slide from "../components/Slide.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import { talk } from "../meta";
</script>

<section class="slide title-slide" data-state="bare">
    <!-- for a projector that washes out the dark theme; T does the same on any slide -->
    <button
        type="button"
        class="theme-toggle"
        onclick={() => document.documentElement.classList.toggle("dark")}
        aria-label="Switch between the dark and light theme"
    >
        <span class="only-dark">☀ light</span><span class="only-light"
            >☾ dark</span
        >
    </button>
    <div class="title-text">
        <p class="prompt">
            <span>$</span> stat rise-together → {talk.occasion}, {talk.date}
        </p>
        <h1>{talk.title}</h1>
        <p class="subtitle">{talk.subtitle}</p>
        <p class="byline">{talk.author} · {talk.affiliation}</p>
        <div class="title-logo"><AuLogo variant="stacked" /></div>
    </div>
    <figure class="title-photo">
        <img
            src={lab}
            alt="Six seats in a circle, each with an iPad on a stand and a mannequin head wearing an EEG cap"
        />
        <figcaption>the lab, sans humans</figcaption>
    </figure>
</section>

<Slide title="Is a group more than its members?" prompt="cat question">
    <ul>
        <li>We distinguish groups without effort: "us" and "them".</li>
        <li>
            Two different groups of people walking to the same destination: we
            can tell them apart
        </li>
        <li>
            What is shared internally between the individuals within a group?
        </li>
    </ul>
    <Callout label="QUESTION">
        <p>Is there a marker of group identity in the brain?</p>
    </Callout>
    {#snippet notes()}
        <p>
            Why it matters to me: what draws people into groups, how groups
            influence us, and how minds change. This experiment is a small first
            step: how is group identity reflected in the brain?
        </p>
    {/snippet}
</Slide>
