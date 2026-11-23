<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
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
    const shared = ["task", "trial onset", "room & screen", "paddle & goal"];
    const levels = [
        { name: "own team", has: 4, sub: "pairs within a team" },
        { name: "other team", has: 3, sub: "same trial, opposing team" },
        { name: "other group", has: 2, sub: "same trial, another session" },
        { name: "time-shifted", has: 0, sub: "own team, shifted ≥ 10 s" },
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
        <li>Runs on tablets and phones, browser. Potential to run anywhere.</li>
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
    {/snippet}
</Slide>

<Slide title="Session design" prompt="cat design.md">
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
            <li>Six participants, two teams of three, reassigned each block</li>
            <li>Block order counterbalanced over sessions</li>
            <li>
                So far: <span class="stat">8 sessions, n = 48</span> (EEG from 45)
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
    {/snippet}
</Slide>

<Slide title="Measures" prompt="ls data/">
    <dl class="streams wide">
        <dt>EEG, EMG, IMU</dt>
        <dd>all participants recorded simultaneously</dd>
        <dt>Behaviour</dt>
        <dd>
            Each button press and release, game state, aligned to the reference
            clock
        </dd>
        <dt>Ratings</dt>
        <dd>
            "I identify with my team" (1–7) <Cite text={refs.postmes2013} />,
            before each block and after each trial; closeness to own / other
            team (IOS) <Cite text={refs.aron1992} />, after each block;
            performance and coordination, after each trial
        </dd>
    </dl>
    <Callout label="TIMING">
        <p>
            Events from every device are timestamped with Lab Streaming Layer
            via liblsl.dart <Cite text={refs.ring2026} /> and aligned to each EEG
            recording; screen updates are measured with a photodiode.
        </p>
    </Callout>
    {#snippet notes()}
        <p>
            To compare several brains, the same game event has to be located in
            every EEG recording. Six tablets, a coordinator and six amplifiers
            each run their own clock. liblsl.dart brings Lab Streaming Layer to
            Flutter apps, which is what the game is built with; the timing was
            validated with a photodiode and EMG. The JOSS paper has the details.
        </p>
    {/snippet}
</Slide>

<Slide title="What is compared" prompt="cat analysis.md">
    <table class="levels">
        <caption>what each pair has in common, aligned in time</caption>
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
                        <td class:on={i < l.has}>{i < l.has ? "●" : "○"}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <ul class="compact">
        <li>
            The same four levels, computed the same way, for behaviour and EEG.
        </li>
        <li>
            <strong>own vs other team</strong>: same room and screen; differs in
            team membership <em>and</em> in shared control of the paddle.
        </li>
        <li>
            <strong>other team vs other group</strong>: the effect of being in
            the same room and seeing the same screen.
        </li>
    </ul>
    {#snippet notes()}
        <p>
            Time-shifted is the chance level: each person's series is shifted by
            at least ten seconds, which keeps its own structure but breaks the
            alignment in time.
        </p>
        <p>
            Statistics: own vs other team by permuting team labels within a
            block; other team vs other group by sign flips over sessions.
            Sessions are the independent unit.
        </p>
    {/snippet}
</Slide>
