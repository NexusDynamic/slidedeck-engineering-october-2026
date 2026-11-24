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
            The longer-term question stays open: whether there is something
            shared within a group beyond what its members see and do. The
            balanced vs blinded contrast is the most direct test available in
            this design, because the teams are built the same way and only the
            knowledge differs.
        </p>
    {/snippet}
</Slide>
