<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import Qr from "../components/Qr.svelte";
    import { talk } from "../meta";
</script>

<Slide
    title="Summary and next steps"
    prompt="tail rise-together"
    class="summary"
>
    <div class="versus">
        <div class="card">
            <h3>So far</h3>
            <ul>
                <li>
                    A team game with unscripted, real-time interaction, and
                    event timing that allows EEG + behavioural comparison across
                    groups of six people.
                </li>
                <li>
                    Behavioural, rated and neural coupling are all higher within
                    teams than between teams (8 sessions, preliminary). For
                    behaviour and EEG, shared action alone would predict this.
                </li>
                <li>
                    Knowing who is on your team changes identification before
                    play starts (ratings, exploratory).
                </li>
            </ul>
        </div>
        <div class="card">
            <h3>Next: does team membership add anything?</h3>
            <ul>
                <li>
                    Balanced vs blinded: same teams, same action, the
                    differeince is knowing who is on your team.
                </li>
                <li>
                    Partial out shared action (input coupling, EMG/IMU) and gaze
                    from the neural coupling (ideas?).
                </li>
                <li>
                    A null is informative too, we need to look elsewhere for a
                    marker of group identity in the brain.
                </li>
                <li>Different group sizes? Outside the lab?</li>
            </ul>
        </div>
    </div>
    <div class="play">
        <Qr value={talk.gameUrl} />
        <p class="try">
            Try the game:<br /><a href={talk.gameUrl}>
                {talk.gameUrl.replace(/^https:\/\/|\/$/g, "")}
            </a>
        </p>
    </div>
    {#snippet notes()}
        <p>
            The longer-term question is still open: whether there is something
            shared within a group beyond what its members see and do. For this
            experiment, the balanced vs blinded comparison within a group is
            probably the closest thing we get to being able to differentiate it,
            and if we base anything on the participants own ratings of
            identification, then it seems that even in a game where they don't
            know who they are playing with, they still build up an identity of
            their own team. (That said, it's quite likely by the end of the
            block, they figure out who their team-mates are via non-verbal
            cues).
        </p>
        <p>
            And that's where we are at so far, I would be very happy for any
            ideas or suggestions for how to probe further into this question,
            and I'm planning on making the data and source code open and
            available to anyone, because I think we have a really nice dataset
            here and much more can be done with it besides the kind of analyses
            I want to do.
        </p>
    {/snippet}
</Slide>
