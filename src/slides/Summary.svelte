<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import Links from "../components/Links.svelte";
    import Cite from "../components/Cite.svelte";
    import { refs } from "../refs";
</script>

<Slide
    title="Summary and next steps"
    prompt="tail rise-together"
    class="summary"
>
    <div class="versus">
        <div class="card">
            <h3>So far</h3>
            <p>
                A naturalistic video-game task for measuring EEG in groups of
                six.
            </p>
            <dl class="levels-summary">
                <dt>behavioural</dt>
                <dd>more coordinated with own team</dd>
                <dt>psychological</dt>
                <dd>shaped by performance and by knowing your team</dd>
                <dt>neural</dt>
                <dd>highest within teams</dd>
            </dl>
        </div>
        <div class="card">
            <h3>Next</h3>
            <ul>
                <li>
                    How do the three kinds of coupling relate?
                    <small>analysis just started · still collecting</small>
                </li>
                <li>
                    Is ISC driven by shared action and gaze? <Cite
                        text={[refs.hamilton2021, refs.holroyd2022]}
                    />
                </li>
                <li>What are the oscillatory dynamics?</li>
                <li>What does the component reflect?</li>
            </ul>
        </div>
    </div>
    <Links />
    {#snippet notes()}
        <p>
            So: a naturalistic video-game task in which we can measure EEG from
            groups. Coupling, on all three levels, is modulated by team: players
            are more coordinated with their own team; identification is shaped
            by performance and by knowing who is on your team; and neural
            coupling is highest within teams.
        </p>
        <p>Next:</p>
        <ul>
            <li>
                How the three kinds of coupling relate to each other: I've just
                started that analysis, and we're still collecting data.
            </li>
            <li>
                Whether ISC is entirely driven by what teammates share: pressing
                together, watching the same paddle. Partialling out input
                coupling, EMG/IMU and gaze; social control vs matched is the
                closest contrast we have (same action, the difference is knowing
                your team).
            </li>
            <li>
                The oscillatory dynamics: rhythms are likely to show up in a
                task like this.
            </li>
            <li>
                What the component reflects (backup: EEG, saccades, ICA
                components).
            </li>
        </ul>
        <p>
            I'd be very happy for ideas; the data and code will be open. And
            now: the lab.
        </p>
    {/snippet}
</Slide>
