<script lang="ts">
    import game from "$siteStatic/_assets/images/_vault/rise-together/rise-together.webp";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";

    const phases = [
        { name: "Motor baseline", sub: "3 min" },
        { name: "Individual", sub: "3 × 5 min → skill rank" },
        { name: "Block 1", sub: "5 trials × 5 min", joint: true },
        { name: "Block 2", sub: "new teams", joint: true },
        { name: "Block 3", sub: "new teams", joint: true },
    ];

    const conditions = [
        {
            id: "balanced",
            name: "Balanced",
            teams: "mixed skill",
            known: "shown",
        },
        {
            id: "blinded",
            name: "Blinded",
            teams: "mixed skill",
            known: "hidden",
        },
        {
            id: "hl",
            name: "Skill-sorted",
            teams: "top 3 vs bottom 3",
            known: "shown",
        },
    ];

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

<Slide title="A game for teams" prompt="cat paradigm.md" class="split game">
    <ul class="compact">
        <li>
            Each team of three moves one paddle; each player has two buttons
            (lift left, lift right).
        </li>
        <li>
            Each player supplies a 1/3 of the paddle's maximum lift, so full
            speed needs all players.
        </li>
        <li>
            Both teams play at the same time and see each other's progress. The
            team that gets further wins.
        </li>
        <li>
            No game experience required and no prescribed strategy: how a team
            coordinates is left to the team.
        </li>
        <li>
            One Flutter codebase for tablets, phones, desktop and browser; game
            events are timed with Lab Streaming Layer
            <Cite text={[refs.kothe2025, refs.ring2026]} />, so the same game
            can be used in and out of the lab.
        </li>
    </ul>
    <figure>
        <img
            src={game}
            alt="The Rise Together game: a ball balanced on a paddle, with lift-left and lift-right buttons"
        />
        <figcaption>one team's view (individual round)</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Two buttons keep movement, and with it muscle artefact, to a
            minimum. The interaction is real time and unscripted: what happens
            in a trial depends on the players, not on the experimenter.
        </p>
        <p>
            Cooperation inside the team and competition between teams are built
            in the way they are in team sports.
        </p>
        <p>
            So far it has only been run in the lab, with the six-person EEG
            setup. The out-of-lab use is what the implementation allows, not
            something tested yet; running it with mobile EEG is a next step.
        </p>
    {/snippet}
</Slide>

<Slide title="Experiment design" prompt="cat design.md">
    <ol class="timeline">
        {#each phases as p (p.name)}
            <li class:joint={p.joint}>
                <b>{p.name}</b><small>{p.sub}</small>
            </li>
        {/each}
    </ol>
    <div class="design-grid">
        <table class="conditions">
            <thead>
                <tr><th>block type</th><th>teams</th><th>teammates</th></tr>
            </thead>
            <tbody>
                {#each conditions as c (c.id)}
                    <tr>
                        <td><span class="cond {c.id}">{c.name}</span></td>
                        <td>{c.teams}</td>
                        <td>{c.known}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <ul class="compact">
            <li>Groups of six. Two teams of three, reassigned per block</li>
            <li>Block order counterbalanced over groups of participants</li>
            <li>
                Recorded: EEG, EMG and IMU from everyone; every button press and
                the game state; team identification <Cite
                    text={refs.postmes2013}
                /> and closeness (IOS) <Cite text={refs.aron1992} />
            </li>
            <li>
                So far: <span class="stat">8 groups, n = 48</span> (EEG from 45)
            </li>
        </ul>
    </div>
    {#snippet notes()}
        <p>
            Individual rounds give each person a skill rank, which is used to
            build the teams. Balanced vs blinded: the teams are built the same
            way, only whether people know who their teammates are differs. That
            is the top-down manipulation.
        </p>
        <p>
            In the skill-sorted blocks the high team won nearly every trial
            (95%), so that contrast is also winners vs losers.
        </p>
        <p>
            Identification is rated before each block and after each trial,
            closeness to own and other team after each block. Timing: every
            device is timestamped with LSL and aligned to each EEG recording;
            screen updates were checked with a photodiode (backup slide).
        </p>
    {/snippet}
</Slide>

<Slide title="Comparisons" prompt="cat analysis.md">
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
            Time-shifted is the chance level: each person's series is shifted by
            at least ten seconds, which keeps its own structure but breaks the
            alignment in time.
        </p>
        <p>
            Statistics: own vs other team by permuting team labels within a
            block; other team vs other group by sign flips over groups. Groups
            are the independent unit.
        </p>
    {/snippet}
</Slide>
