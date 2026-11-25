<script lang="ts">
    import game from "$siteStatic/_assets/images/_vault/rise-together/rise-together.webp";
    import Slide from "../components/Slide.svelte";

    // the three conditions of the joint task, left to right as on the slide
    const conditions = [
        {
            id: "control",
            name: "Social control",
            sub: "rank-balanced for skill, <b>blinded</b> to team composition",
        },
        {
            id: "matched",
            name: "Matched",
            sub: "rank-balanced for skill",
        },
        {
            id: "mismatched",
            name: "Mismatched",
            sub: "rank-sorted: one high team, one low team",
        },
    ];
</script>

<Slide
    title="Rise Together: a game for teams"
    prompt="cat paradigm.md"
    class="split game"
>
    <ul class="lead">
        <li>
            Each team of three lifts <strong>one</strong> paddle; full speed needs
            every player.
        </li>
        <li>Both teams play at once. The team that gets further wins.</li>
    </ul>
    <figure>
        <img
            src={game}
            alt="The Rise Together game: a ball balanced on a paddle, with lift-left and lift-right buttons"
        />
        <figcaption>one team's view</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Each player has two buttons, lift left and lift right, and supplies
            a third of the paddle's maximum lift. Two thumb buttons keep
            movement and muscle artefacts to a minimum.
        </p>
        <p>
            Both teams see each other's progress. No game experience needed and
            no prescribed strategy: how a team coordinates is up to the team.
            Interaction is real time and unscripted.
        </p>
        <p>
            One Flutter codebase for tablets, phones, desktop and browser; game
            events are timed with Lab Streaming Layer (Kothe 2025; my
            liblsl.dart, Ring 2026), so the same game can be used in and out of
            the lab.
        </p>
    {/snippet}
</Slide>

<Slide title="Experiment design" prompt="cat design.md" class="design">
    <p class="design-n">
        <span class="stat">N = 45</span> · 8 groups of 6 (3 excluded) · EEG · EMG
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
            <b>Joint task</b><small>
                3 conditions × 5 trials · teams of 3 vs 3, new teams each
                condition
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
        <p class="counterbalance">
            condition order counterbalanced across groups
        </p>
        {#each conditions as c (c.id)}
            <div class="cond-card {c.id}">
                <b>{c.name}</b>
                <small>{@html c.sub}</small>
            </div>
        {/each}
        <p class="skill-match"><span>between-team skill match</span></p>
    </div>
    {#snippet notes()}
        <p>
            Each person first plays alone; those trials give a skill rank, which
            we use to build the teams. Then three conditions, each with new
            teams of three:
        </p>
        <ul>
            <li>
                Social control: rank-balanced teams, but players don't know who
                is on their team.
            </li>
            <li>Matched: rank-balanced teams, and players know their team.</li>
            <li>
                Mismatched: top 3 vs bottom 3; the high team won nearly every
                trial (~95%).
            </li>
        </ul>
        <p>
            Arbitrary groups are enough for in-group preference (Tajfel 1971),
            so teams can be reassigned between conditions.
        </p>
        <p>
            Recorded from everyone: EEG, EMG and IMU; every button press and the
            game state. Team identification (SISI) before each condition and
            after each trial. Every device is timestamped with LSL and aligned
            to each EEG recording; screen latencies checked with a photodiode.
        </p>
    {/snippet}
</Slide>
