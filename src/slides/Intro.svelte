<script lang="ts">
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    import game from "$siteStatic/_assets/images/_vault/rise-together/rise-together.webp";
    import Slide from "../components/Slide.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import Cite from "../components/Cite.svelte";
    import { talk } from "../meta";
    import { refs } from "../refs";

    const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

    // synchrony: two people's actions (A on time, B a little off) line up in time
    const beats = [52, 128, 196, 262, 318, 386];
    const jitter = [6, -4, 8, 3, -6, 5];

    // hyperscanning: three people's EEG on one time axis, similar but not identical
    const waves = [0, 0.7, 1.4].map((phase) =>
        Array.from({ length: 97 }, (_, i) => {
            const x = 30 + i * 4;
            const y =
                -9 * Math.sin(x / 22) -
                4 * Math.sin(x / 7 + phase) -
                2 * Math.sin(x / 3.1 + 2 * phase);
            return `${i ? "L" : "M"}${x} ${y.toFixed(1)}`;
        }).join(""),
    );

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
    <aside class="notes">
        <p>
            This talk is about my PhD project: a collaboration between cognitive
            science and engineering.
        </p>
        <p>
            The question comes from cognitive science, how people coordinate in
            groups, and answering it meant building things: a game, and the
            timing to line it up with everyone's EEG.
        </p>
    </aside>
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
            Many tasks involve coordination: from intentional, lab-based
            experiments...
        </p>
        <p>
            [next] ...to real life, where we coordinate for our profession and
            for recreation.
        </p>
        <p>[keep this one fast]</p>
    {/snippet}
</Slide>

<Slide
    title="Coordination gives rise to synchrony"
    prompt="grep -r synchrony"
    class="defs"
>
    <div class="def-cards">
        <div class="def-card">
            <p class="term"><strong>synchrony</strong></p>
            <p>
                the alignment of people's actions in time; it arises naturally
                when people coordinate <Cite text={refs.vesper2010} />
            </p>
            <svg viewBox="0 0 420 120" role="img" aria-label="Two people's actions lining up in time">
                {#each [30, 86] as y, k (y)}
                    <text class="who" x="0" y={y + 5}>{k ? "B" : "A"}</text>
                    <line class="track" x1="28" y1={y} x2="420" y2={y} />
                    {#each beats as t, i (i)}
                        <rect class="beat" x={t + (k ? jitter[i] : 0)} y={y - 14} width="18" height="28" rx="4" />
                    {/each}
                {/each}
                {#each beats as t, i (i)}
                    <line class="align" x1={t + 9} y1="8" x2={t + 9} y2="112" />
                {/each}
            </svg>
        </div>
        <div class="def-card">
            <p class="term"><strong>hyperscanning</strong></p>
            <p>
                the simultaneous measurement of brain activity from several
                people: their brains align too <Cite
                    text={[refs.cui2012, refs.czeszumski2022, refs.schilbach2025]}
                />
            </p>
            <svg viewBox="0 0 420 120" role="img" aria-label="Three people's EEG recorded at once on one time axis">
                {#each waves as d, k (k)}
                    <circle class="head" cx="12" cy={20 + k * 40} r="11" />
                    <path class="wave" {d} transform="translate(0 {20 + k * 40})" />
                {/each}
                <line class="now" x1="250" y1="2" x2="250" y2="118" />
            </svg>
        </div>
    </div>
    <p class="defs-foot">
        Nearly all of it is in pairs; groups are rare <Cite
            text={[refs.dikker2017, refs.reinero2021, refs.zamm2026]}
        />.
    </p>
    {#snippet notes()}
        <p>
            That coordination gives rise to synchrony. Synchrony is the
            alignment of people's actions in time, and it arises naturally when
            people coordinate: we fall into step, we time our movements to each
            other. In behaviour it's easy to see and to measure.
        </p>
        <p>
            We also see this in the brain, which we've been able to record due
            to the development of hyperscanning: the simultaneous measurement of
            brain activity from several people at once. When people cooperate,
            their brain activity is more aligned than when they work alone.
        </p>
        <p>
            But nearly all of that work is in pairs. There are only a handful
            of studies of groups, so how groups coordinate, in something that
            looks like the real world, is still open.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Video games for studying social behaviour"
    prompt="cat why-games.md"
    class="games"
>
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
            Why video games? Lab tasks are controlled but artificial, and mostly
            pairs; real life is natural, but hard to control or time-lock.
            Video games sit in between.
        </p>
        <ul>
            <li>
                Players interact in real time with nothing scripted, like in the
                real world.
            </li>
            <li>
                Teams give cooperation within and competition between at the
                same time, as in team sports.
            </li>
            <li>
                Every player sees the same screen, and every input is logged
                with its time.
            </li>
            <li>
                We decide who is on which team, how skilled the teams are, and
                what players know about each other.
            </li>
            <li>They're engaging, and need no training.</li>
        </ul>
        <p>
            And because the game is just an app, the same paradigm can go out of
            the lab with portable EEG.
        </p>
    {/snippet}
</Slide>
