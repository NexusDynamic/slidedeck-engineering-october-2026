<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import Acknowledgements from "./Acknowledgements.svelte";
    import AuLogo from "../components/AuLogo.svelte";
    import Qr from "../components/Qr.svelte";
    import { talk } from "../meta";
</script>

<Slide title="Tools" prompt="ls tools/">
    <dl class="streams wide">
        <dt>Flutter + Flame</dt>
        <dd>
            one codebase for the lab iPads, coordinator, or any other device
        </dd>
        <dt>Lab Streaming Layer</dt>
        <dd>every network sample timestamped on a shared (local) clock</dd>
        <dt>Bela</dt>
        <dd>high-frequency and precision, recording and forwarding triggers</dd>
        <dt>Hyperscanner</dt>
        <dd>
            Awesome setup for recording participants' EEG, EMG, and IMU data
        </dd>
        <dt>Open source</dt>
        <dd>the experiment code and the data will be published</dd>
    </dl>
</Slide>

<Acknowledgements />

<section class="slide closing" data-state="bare">
    <p class="prompt"><span>$</span> tail rise-together</p>
    <h2>In summary</h2>
    <ul>
        <li>
            The question is cognitive: is there a marker of group identity in
            the brain?
        </li>
        <li>
            The design tries to keep as much constant as possible, and vary
            team/group membership.
        </li>
        <li>
            The setup gives us real, multimodal, participant interactions with
            precision on the level of classic lab experiments.
        </li>
        <li><strong>Interdisciplinary research is so valuable</strong></li>
    </ul>
    <p class="try">
        Try the "game" version of the paradigm: <a href={talk.gameUrl}
            >{talk.gameUrl.replace(/^https:\/\/|\/$/g, "")}</a
        >
    </p>
    <Qr value={talk.gameUrl} label="scan to play" />
    <div class="closing-foot">
        <AuLogo variant="stacked" />
        <span>{talk.author} · {talk.affiliation}</span>
    </div>
</section>
