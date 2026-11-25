<script lang="ts">
    import Callout from "$site/components/Callout.svelte";
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    import synchrony from "$siteStatic/_assets/images/_vault/rise-together/ps760883.f1.webp";
    import game from "$siteStatic/_assets/images/_vault/rise-together/rise-together.webp";
    import Slide from "../components/Slide.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import Cite from "../components/Cite.svelte";
    import { talk } from "../meta";
    import { refs } from "../refs";

    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

    // coordination out in the world (Unsplash; credit in the caption)
    const photos = [
        {
            src: "photos/formation.jpg",
            alt: "Eleven jets flying in tight formation, trailing white smoke",
            credit: "C. Holmes",
        },
        {
            src: "photos/rowing.jpg",
            alt: "A rowing four from above, the oars moving in unison",
            credit: "P. Mahmoudi",
        },
        {
            src: "photos/footvolley.jpg",
            alt: "A footvolley player flipping upside down to kick the ball over the net",
            credit: "C. Weingarten",
        },
    ];

    // and brought into the lab; `ar` is the image's aspect ratio, so the row lines up
    const setups = [
        {
            src: "setups/liepelt2013.png",
            ar: 308 / 438,
            ref: refs.liepelt2013,
            alt: "Two people side by side, arms crossed, each pressing a button for a shape on a shared screen",
        },
        {
            src: "setups/liepelt2014.jpg",
            ar: 850 / 701,
            ref: refs.liepelt2014,
            alt: "Two people at one monitor, each with a hand on the screen or on the knee",
        },
        {
            src: "setups/egetemeir2011.png",
            ar: 636 / 401,
            ref: refs.egetemeir2011,
            alt: "Top view of a participant and an experimenter setting a table together, with fNIRS",
        },
        {
            src: "setups/balconi2023.png",
            ar: 500 / 310,
            ref: refs.balconi2023,
            alt: "Two people in EEG caps from above, hands on a table next to each other",
        },
        {
            src: "setups/dikker2017.jpg",
            ar: 1200 / 567,
            ref: refs.dikker2017,
            alt: "Drawing of a classroom: a teacher and students wearing portable EEG headsets",
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
    title="We coordinate with others all the time"
    prompt="ls coordination/"
    class="collage"
>
    <div class="band">
        <p class="band-label">// in the lab</p>
        <div class="row setups">
            {#each setups as s (s.src)}
                <figure style:--ar={s.ar}>
                    <img src={img(s.src)} alt={s.alt} />
                    <figcaption><Cite text={s.ref} /></figcaption>
                </figure>
            {/each}
        </div>
    </div>
    <div class="band fragment">
        <p class="band-label">// in real life</p>
        <div class="row photos">
            {#each photos as p (p.src)}
                <figure>
                    <img src={img(p.src)} alt={p.alt} />
                    <figcaption>{p.credit} / Unsplash</figcaption>
                </figure>
            {/each}
        </div>
    </div>
    {#snippet notes()}
        <p>
            In the lab, coordination has been studied in tasks we can control
            and measure: two people sharing a Simon task, setting a table
            together, sitting side by side in EEG caps; and, less often, whole
            groups, like Dikker's classroom.
        </p>
        <p>
            [next] But out there, coordination is a natural part of our lives:
            flying in formation, rowing, passing a ball. People time their
            actions to each other to reach a shared goal.
        </p>
        <p>
            The further a task is from real life, the easier it is to measure,
            and the less it looks like the coordination we want to understand.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Coordination gives rise to synchrony"
    prompt="grep -r synchrony"
    class="split paper-right"
>
    <div>
        <ul class="compact">
            <li>
                When people coordinate, their actions fall into step, and
                behaviour shows it readily <Cite text={refs.vesper2010} />.
            </li>
            <li>
                Their brains do too: inter-brain synchrony, higher in
                cooperation <Cite
                    text={[
                        refs.cui2012,
                        refs.czeszumski2022,
                        refs.schilbach2025,
                    ]}
                />.
            </li>
            <li>
                Hyperscanning records several brains at once, but nearly all of
                it is in pairs; groups are rare <Cite
                    text={[refs.dikker2017, refs.reinero2021, refs.zamm2026]}
                />.
            </li>
        </ul>
        <Callout label="QUESTION">
            <p>
                How can we measure inter-brain synchrony in <em>groups</em>
                coordinating in <em>real-world</em> tasks?
            </p>
        </Callout>
    </div>
    <figure class="paper">
        <img
            src={synchrony}
            alt="Left: three people behind dividers watching the same screen show similar brain responses. Right: two people interacting face to face show real-time neural alignment."
        />
        <figcaption>Schilbach &amp; Redcay, 2025</figcaption>
    </figure>
    {#snippet notes()}
        <p>
            Synchrony arises naturally when people coordinate: we see it in
            movement and timing, and it is easy to measure in behaviour.
        </p>
        <p>
            Hyperscanning, recording several people at once, shows it in the
            brain too (Wheatley 2024 and Schilbach &amp; Redcay 2025 for
            reviews). Cooperation goes with higher synchrony than working alone,
            mostly in fNIRS (Cui 2012; meta-analysis Czeszumski 2022).
        </p>
        <p>
            The figure: similarity (left, same input, no interaction) is not the
            same as interactive synchrony (right). Shared stimuli and shared
            actions produce synchrony on their own (Hamilton 2021, Holroyd
            2022): something we come back to at the end.
        </p>
        <p>
            Most of this is in dyads. Groups: Dikker's classroom (portable EEG),
            Reinero's teams of four, and Anna and Simon's Tapping Orchestra with
            up to ten people. So: how do we measure groups, coordinating in
            something that looks like the real world?
        </p>
    {/snippet}
</Slide>

<Slide title="Why video games?" prompt="cat why-games.md" class="games">
    <div class="spectrum">
        <div class="pole">
            <img
                src={img("setups/liepelt2013.png")}
                alt=""
                class="thumb drawing"
            />
            <b>lab tasks</b>
            <ul class="pm">
                <li class="plus">controlled, time-locked</li>
                <li class="minus">artificial, scripted</li>
                <li class="minus">mostly pairs</li>
            </ul>
        </div>
        <div class="pole middle">
            <img src={game} alt="" class="thumb" />
            <b>video games</b>
            <ul class="chips">
                <li>real-time, unscripted</li>
                <li>cooperate &amp; compete at once</li>
                <li>same screen for everyone</li>
                <li>every action logged &amp; time-stamped</li>
                <li>teams &amp; skill can be set</li>
                <li>engaging, no training</li>
            </ul>
        </div>
        <div class="pole">
            <img src={img("photos/rowing.jpg")} alt="" class="thumb" />
            <b>real life</b>
            <ul class="pm">
                <li class="plus">natural, unscripted</li>
                <li class="plus">groups</li>
                <li class="minus">hard to control or time-lock</li>
            </ul>
        </div>
    </div>
    <p class="axis"><span>controlled</span><span>natural</span></p>
    <p class="takeaway">
        The same game runs on tablets, phones and in a browser: in the lab, and
        out of it.
    </p>
    {#snippet notes()}
        <p>
            Video games are a natural paradigm for coordination and competition
            between groups, and they can still be controlled.
        </p>
        <p>
            Players interact in real time with nothing scripted, like in the
            real world. But every player sees the same screen, every input is
            logged with its time, and we decide who is on which team, how
            skilled the teams are, and what players know about each other.
        </p>
        <p>
            Teams give cooperation within and competition between at the same
            time, as in team sports. Multi-brain gaming has been done with
            neurofeedback (Susnoschi Luca 2021).
        </p>
        <p>
            And because the game is just an app, the same paradigm can go out of
            the lab with portable EEG.
        </p>
        <p>[TODO: a reference for games as a naturalistic paradigm?]</p>
    {/snippet}
</Slide>
