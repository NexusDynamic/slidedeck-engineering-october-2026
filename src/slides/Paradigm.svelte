<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import game from "$siteStatic/_assets/images/_vault/rise-together/rise-together.webp";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    // the group stage: the main task in the middle, a control on each side (the ids are the
    // colours of the plots' conditions)
    const conditions = [
        {
            id: "control",
            name: "Blinded",
            role: "control",
            sub: "rank-balanced, but teammates <b>hidden</b>",
            tests: "knowing your team",
        },
        {
            id: "matched",
            name: "Main task",
            role: "",
            sub: "rank-balanced teams, teammates known",
            tests: "",
        },
        {
            id: "mismatched",
            name: "Skill / rank",
            role: "control",
            sub: "rank-sorted: one high team, one low team",
            tests: "skill difference",
        },
    ];
</script>

<Slide
    title="Rise Together: a game for social research"
    prompt="cat paradigm.md"
    class="split game"
>
    <div>
        <ul class="lead">
            <li>
                Each team of three lifts <strong>one</strong> paddle; full speed needs
                every player.
            </li>
            <li>Both teams play at once. The team that gets further wins.</li>
            <li class="built">
                Tablets, phones and browsers; every event timed with Lab
                Streaming Layer via liblsl.dart <Cite text={refs.ring2026} />.
            </li>
        </ul>
        <Callout label="RESEARCH QUESTION">
            <p>
                Do people on the same team show enhanced <em>neural</em> and
                <em>behavioural</em> coordination?
            </p>
        </Callout>
    </div>
    <figure>
        <img
            src={game}
            alt="The Rise Together game: a ball balanced on a paddle, with lift-left and lift-right buttons"
        />
        <figcaption>one team's view</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            I've designed a video game intended to be used for social research:
            Rise Together.
        </p>
        <p>
            Each player has two buttons, lift left and lift right, and supplies
            a third of the paddle's maximum lift, so the team only does well if
            everyone contributes and they find a way to coordinate. Two thumb
            buttons keep movement and muscle artefacts to a minimum.
        </p>
        <p>
            Both teams see each other's progress, so there's cooperation within
            a team and competition between teams at the same time. No game
            experience needed, no training, and no prescribed strategy: how a
            team coordinates is up to the team. Interaction is real time and
            unscripted, but every press and every game state is logged.
        </p>
        <p>
            We control who is on which team, how skilled the teams are, and what
            players know about their teammates: the experimental conditions are
            just settings in the game.
        </p>
        <p>
            It's one Flutter codebase for tablets, phones, desktop and browser.
            To line game events up with the EEG I wrote liblsl.dart, which
            brings Lab Streaming Layer to Dart and Flutter; it's published in
            the Journal of Open Source Software. So the same game can be used in
            the lab, and out of it with portable EEG.
        </p>
        <p>
            The question: do people on the same team show enhanced neural and
            behavioural coordination?
        </p>
    {/snippet}
</Slide>

<Slide title="Experiment design" prompt="cat design.md" class="design">
    <p class="design-n">
        <span class="stat">N = 51</span> · 9 groups of 6 (3 excluded) · EEG · EMG
        · IMU
    </p>
    <div class="design-tree">
        <div class="phase" style:grid-column="1">
            <b>Motor baseline</b><small>3 min</small>
        </div>
        <div class="phase" style:grid-column="2">
            <b>Individual</b><small>3 × 5 min → skill rank</small>
        </div>
        <div class="phase joint" style:grid-column="3 / 5">
            <b>Group</b><small>
                3 tasks × 5 trials · teams of 3 vs 3, new teams each task
            </small>
        </div>
        <svg
            class="branches"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M671 0 V30 M157 60 V30 H843 V60 M500 30 V60"
                vector-effect="non-scaling-stroke"
            />
        </svg>
        <p class="counterbalance">task order counterbalanced across groups</p>
        {#each conditions as c (c.id)}
            <div class="cond-card {c.id}" class:main={!c.role}>
                {#if c.role}<span class="role">{c.role}</span>{/if}
                <b>{c.name}</b>
                <small>{@html c.sub}</small>
                {#if c.tests}<small class="tests">
                        controls for: {c.tests}
                    </small>{/if}
            </div>
        {/each}
        <p class="skill-match"><span>between-team skill match</span></p>
    </div>
    {#snippet notes()}
        <p>
            Each person first plays alone; those trials give a skill rank, which
            we use to build the teams. Then the group stage: three tasks, each
            with new teams of three.
        </p>
        <ul>
            <li>
                Main task: rank-balanced teams, and players know who is on their
                team. This is the one the question is about.
            </li>
            <li>
                Blinded (control): also rank-balanced teams, but players don't
                know who their teammates are. Controls for knowing your team.
            </li>
            <li>
                Skill / rank (control): top 3 vs bottom 3; the high team won
                nearly every trial (~95%). Controls for a skill difference
                between the teams.
            </li>
        </ul>
        <p>
            Arbitrary groups are enough for in-group preference (the minimal
            group paradigm), so teams can be reassigned between tasks.
        </p>
        <p>
            Recorded from everyone: EEG, EMG and IMU; every button press and the
            game state. Team identification (SISI) before each task and after
            each trial. Every device is timestamped with LSL and aligned to each
            EEG recording; screen latencies checked with a photodiode.
        </p>
    {/snippet}
</Slide>
