<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import synchrony from "$siteStatic/_assets/images/_vault/rise-together/ps760883.f1.webp";
    import Slide from "../components/Slide.svelte";
    import Cite from "../components/Cite.svelte";
    import Chain from "../components/Chain.svelte";
    import { refs } from "../refs";

    // what makes brains line up, from the least to the most interesting
    const layers = [
        { name: "shared stimulus", sub: "the same room, the same screen" },
        { name: "shared action", sub: "doing the same thing at the same time" },
        { name: "shared attention", sub: "attending to the same thing" },
        {
            name: "group identity?",
            sub: 'being on the same side: "us"',
        },
    ];
</script>

<Slide
    title="It takes almost nothing to make a group"
    prompt="cat minimal-group"
>
    <ul>
        <li>
            Assign people to groups at random, and tell them which group they
            are in.<Cite text={refs.tajfel1971} />
        </li>
        <li>
            They start to favour their own group, and to be biased against the
            other one.
        </li>
        <li>
            Groups and group identity seem like a core part of humans as social
            beings.
        </li>
    </ul>
    <Chain id="group" />
    {#snippet notes()}
        <p>The "minimal group paradigm", Tajfel and colleagues, 1971.</p>
        <p>
            For this experiment it means I don't have to recruit existing
            groups, or build team spirit first. Assigning people to a team, and
            making sure they know who their teammates are, is enough to start
            seeing differences between the teams.
        </p>
    {/snippet}
</Slide>

<Slide
    title="What could we measure? Neural synchrony"
    prompt="man synchrony"
    class="wide-figure"
>
    <figure class="paper">
        <img
            src={synchrony}
            alt="Left: three people behind dividers watching the same screen show similar brain responses. Right: two people interacting face to face show real-time neural alignment."
        />
        <figcaption>Schilbach &amp; Redcay, 2025</figcaption>
    </figure>
    <ul class="compact">
        <li>
            Two or more people showing similar brain activity at the same time.<Cite
                text={refs.schilbach2025}
            />
        </li>
        <li>
            Measured with hyperscanning: recording several brains at once,
            mostly in pairs so far.<Cite text={refs.wheatley2024} />
        </li>
        <li>
            People cooperating show more of it than people competing, or doing
            different things.<Cite text={refs.czeszumski2022} /><Cite
                text={refs.susnoschi2021}
            />
        </li>
    </ul>
    {#snippet notes()}
        <p>
            The level of synchrony can also depend on the relationship between
            the people.
        </p>
        <p>
            Left of the figure: no interaction, just the same input. Right: real
            interaction. This experiment sits on the right, but has to rule out
            the left.
        </p>
    {/snippet}
</Slide>

<Slide
    title="But synchrony is easy to get"
    prompt="grep -c confound"
    class="split"
>
    <div>
        <ul>
            <li>
                Ask people to do the same (or similar) thing, at the same time,
                in the same place, and their brains line up.<Cite
                    text={refs.zamm2026}
                />
            </li>
            <li>
                Behavioural synchrony all the time: falling into step, mirroring
                gestures.
            </li>
            <li>So finding synchrony in a group says very little by itself.</li>
        </ul>
        <Callout label="THE QUESTION, SHARPENED">
            <p>
                If we can account for the shared environment and stimulus, is
                there something left for a "group identity"?
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
            Record everyone in a train carriage on their commute. If they all
            show the same synchrony, there are so many possible explanations
            that it tells you nothing.
        </p>
        <p>
            The bottom three layers have to be the same for everyone before the
            top one means anything.
        </p>
    {/snippet}
</Slide>

<Slide title="Control vs authenticity" prompt="diff lab world">
    <div class="versus">
        <div class="card">
            <h3>Classic lab task</h3>
            <p>The experiment decides when/what happens</p>
            <ul>
                <li>simple stimuli, one person or a pair</li>
                <li>every event is known in advance</li>
                <li>clean to analyse, abnormal interactions</li>
            </ul>
        </div>
        <div class="card">
            <h3>Naturalistic observation</h3>
            <p>The participants decide when/what happens</p>
            <ul>
                <li>real-time interaction, in a group</li>
                <li>little is known in advance</li>
                <li>rich data, harder to analyse, easy to cherry-pick</li>
            </ul>
        </div>
    </div>
    <Callout label="A COMPROMISE">
        <p>
            Relax control over <em>what</em> happens, and ensure precise
            measurement of
            <em>when</em> something happens. The measurement and timing of the data
            is an engineering problem :)
        </p>
    </Callout>
    {#snippet notes()}
        <p>
            Each design choice starts from what the question needs, and ends in
            something that has to be built.
        </p>
    {/snippet}
</Slide>
