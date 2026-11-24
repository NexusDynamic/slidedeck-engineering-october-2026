<script lang="ts">
    import { onMount } from "svelte";
    import Reveal, { type RevealApi } from "reveal.js";
    import Notes from "reveal.js/plugin/notes";
    import Zoom from "reveal.js/plugin/zoom";
    import { printing, reveal } from "./lib/deck.svelte";
    import { talk } from "./meta";
    import AuLogo from "./components/AuLogo.svelte";
    import Intro from "./slides/Intro.svelte";
    import References from "./slides/References.svelte";
    import Paradigm from "./slides/Paradigm.svelte";
    import Data from "./slides/Data.svelte";
    import Summary from "./slides/Summary.svelte";
    import Backup from "./slides/Backup.svelte";
    import Acknowledgements from "./slides/Acknowledgements.svelte";

    let root: HTMLElement;
    let footer: HTMLElement;

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
        // the live deck has one footer over all the slides; a PDF gets a copy on each page
        // (except the bare slides, which carry their own logo)
        if (printing) {
            api.on("pdf-ready", () => {
                for (const page of root.querySelectorAll(".pdf-page")) {
                    if (page.querySelector(':scope > section[data-state~="bare"]')) continue;
                    page.appendChild(footer.cloneNode(true));
                }
            });
        }
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
            <Paradigm />
            <Data />
            <Summary />
            <Acknowledgements />
            <References />
            <Backup />
        </div>
        <footer class="deck-footer" bind:this={footer}>
            <AuLogo />
            <span>{talk.author} · {talk.institution}</span>
            <span class="sep" aria-hidden="true">//</span>
            <span>{talk.occasion} · {talk.date}</span>
        </footer>
    </div>
</div>
