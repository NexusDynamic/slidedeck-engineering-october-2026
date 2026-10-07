<script lang="ts">
    import { onMount } from "svelte";
    import Reveal, { type RevealApi } from "reveal.js";
    import Notes from "reveal.js/plugin/notes";
    import Zoom from "reveal.js/plugin/zoom";
    import { reveal } from "./lib/deck.svelte";
    import { talk } from "./meta";
    import AuLogo from "./components/AuLogo.svelte";
    import Intro from "./slides/Intro.svelte";
    import Cognitive from "./slides/Cognitive.svelte";
    import Design from "./slides/Design.svelte";
    import Clocks from "./slides/Clocks.svelte";
    import Payoff from "./slides/Payoff.svelte";
    import FigureWiring from "./slides/FigureWiring.svelte";
    import FigureTrigger from "./slides/FigureTrigger.svelte";
    import FigureTouch from "./slides/FigureTouch.svelte";
    import Jitter from "./slides/Jitter.svelte";
    import Outro from "./slides/Outro.svelte";
    import References from "./slides/References.svelte";
    import Bonus from "./slides/Bonus.svelte";

    let root: HTMLElement;

    onMount(() => {
        // ?theme=light starts on the light theme; T switches while presenting
        if (new URLSearchParams(location.search).get("theme") === "light") {
            document.documentElement.classList.remove("dark");
        }

        const api: RevealApi = new Reveal(root, {
            width: 1600,
            height: 900,
            margin: 0,
            center: false,
            display: "flex",
            hash: true,
            // a reload comes back to the same slide, but with its figure at the beginning
            fragmentInURL: false,
            // PDF export (?print-pdf): one page per slide, not one per step of a figure
            pdfSeparateFragments: false,
            pdfMaxPagesPerSlide: 1,
            // no automatic switch to reveal's scrolling view in a narrow window: the deck is a fixed frame
            scrollActivationWidth: 0,
            controls: false,
            progress: true,
            transition: "fade",
            transitionSpeed: "fast",
            // numbered like the sections of a post: // 0x03
            slideNumber: (): [string, string, string] => [
                `// 0x${String(api.getIndices().h).padStart(2, "0")}`,
                "",
                "",
            ],
            plugins: [Notes, Zoom],
        });
        api.addKeyBinding(
            { keyCode: 84, key: "T", description: "Light / dark theme" },
            () => document.documentElement.classList.toggle("dark"),
        );
        api.initialize().then(() => (reveal.api = api));

        // a button or slider that keeps focus after the mouse lets go would swallow the clicker's
        // next key press
        const release = (e: Event) => {
            if (e.target instanceof Element)
                e.target.closest<HTMLElement>("button, input")?.blur();
        };
        document.addEventListener("click", release);
        document.addEventListener("change", release);

        return () => {
            document.removeEventListener("click", release);
            document.removeEventListener("change", release);
            reveal.api = undefined;
            api.destroy();
        };
    });
</script>

<div class="frame">
    <div class="reveal" bind:this={root}>
        <div class="slides">
            <Intro />
            <Cognitive />
            <Design />
            <Clocks />
            <FigureWiring />
            <FigureTrigger />
            <FigureTouch />
            <Jitter />
            <Payoff />
            <Bonus />
            <Outro />
            <References />
        </div>
        <footer class="deck-footer">
            <AuLogo />
            <span>{talk.author} · {talk.title}</span>
        </footer>
    </div>
</div>
