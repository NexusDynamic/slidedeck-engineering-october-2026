<script lang="ts">
    import Slide from "../components/Slide.svelte";
</script>

<Slide
    title="Bonus: Coordinating the lab with liblsl"
    prompt="tree liblsl.dart/packages"
    class="bonus"
>
    <div class="arch">
        <div class="layer">
            <span class="tier">apps</span>
            <div class="cells" style:--cols={2}>
                <div class="box">
                    <b>Rise Together</b>
                    <small>the experiment: iPads and the coordinator</small>
                </div>
                <div class="box">
                    <b>transport_timing</b>
                    <small
                        >latency, jitter, loss and clock drift across devices</small
                    >
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">coordination</span>
            <div class="cells" style:--cols={1}>
                <div class="box core">
                    <b>peer_coordinator</b>
                    <small
                        >pure Dart, no backend named: the same session code runs
                        on every transport, and on the web</small
                    >
                    <ul class="chips">
                        <li>session config</li>
                        <li>coordinator election</li>
                        <li>membership + heartbeat</li>
                        <li>topology</li>
                        <li>multi-device streams</li>
                        <li>clock sync</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">transport</span>
            <div class="cells">
                <div class="box">
                    <b>in-memory</b>
                    <small>N nodes in one process, for tests</small>
                </div>
                <div class="box build">
                    <b>liblsl_coordinator</b>
                    <small>LSL: peer-to-peer on the lab network</small>
                </div>
                <div class="box build">
                    <b>WebSocket hub</b>
                    <small>across networks and browsers, relayed: 2 hops</small>
                </div>
                <div class="box build">
                    <b>webrtc_coordinator</b>
                    <small
                        >peer-to-peer data channels: 1 hop, hub only for setup</small
                    >
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">native</span>
            <div class="cells">
                <div class="box none"></div>
                <div class="box ext">
                    <b>liblsl</b>
                    <small>Dart bindings (FFI) to the C library</small>
                </div>
                <div class="box ext">
                    <b>peer_coordinator:hub</b>
                    <small>a small server, built in</small>
                </div>
                <div class="box ext">
                    <b>flutter_webrtc</b>
                    <small>through webrtc_coordinator_flutter</small>
                </div>
            </div>
        </div>
    </div>
    {#snippet notes()}
        <p>
            One node becomes the coordinator, the rest are participants. The
            coordinator admits nodes, tracks them by heartbeat and drives the
            shared data streams: create, start, pause, resume, stop.
        </p>
        <p>
            The backend is picked with one config object. The experiment runs on
            LSL; WebSocket and WebRTC are what make the browser version of the
            game possible. WebRTC needed no change to the core.
        </p>
    {/snippet}
</Slide>

<Slide title="Bonus: hyprview" class="figure bonus">
    <!-- reveal.js plays it on arriving at the slide and pauses it on leaving -->
    <video
        class="demo"
        src="videos/hyprview_screenshot.webm"
        data-autoplay
        loop
        muted
        playsinline
    ></video>
    {#snippet notes()}
        <p>
            hyprview on a recorded EEG session: a Hyperscanner recording opened
            from an HSD file. About 50 seconds, looping.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Hyprview and LSL Viewer"
    prompt="diff lsl_viewer hyprview"
    class="bonus"
>
    <div class="arch">
        <div class="layer">
            <span class="tier">apps</span>
            <div class="cells" style:--cols={2}>
                <div class="box">
                    <b>lsl_viewer</b>
                    <small
                        >generic: LSL streams, XDF files, serial devices</small
                    >
                    <ul class="chips">
                        <li>LSL</li>
                        <li>XDF</li>
                        <li>serial</li>
                    </ul>
                </div>
                <div class="box need">
                    <b>hyprview</b>
                    <small>the Hyperscanner: live device and HSD files</small>
                    <ul class="chips">
                        <li class="own">Hyperscanner</li>
                        <li>LSL</li>
                        <li>XDF</li>
                        <li>serial</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">shared UI</span>
            <div class="cells" style:--cols={1}>
                <div class="box core">
                    <b>signal_viewer</b>
                    <small
                        >tabs, plots, panels, preferences. An app is a title and
                        a list of source providers</small
                    >
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">providers</span>
            <div class="cells">
                <div class="box build">
                    <b>signal_viewer_lsl</b>
                    <small>live streams, record, replay, share</small>
                </div>
                <div class="box build">
                    <b>signal_viewer_xdf</b>
                    <small>XDF recordings</small>
                </div>
                <div class="box build">
                    <b>signal_viewer_serial</b>
                    <small>Cyton, or anything printing numbers</small>
                </div>
                <div class="box need">
                    <b>HyperscannerProvider</b>
                    <small>in hyprview only</small>
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">formats, I/O</span>
            <div class="cells">
                <div class="box ext">
                    <b>lsl_tools → liblsl</b>
                    <small>LSL, and the bridge for browsers</small>
                </div>
                <div class="box ext">
                    <b>xdf</b>
                    <small>pure Dart reader and writer</small>
                </div>
                <div class="box ext">
                    <b>serial_transport</b>
                    <small>native, WebSerial, USB on Android</small>
                </div>
                <div class="box ext need">
                    <b>libhyperscanner</b>
                    <small
                        >Dart port of hyperscanner_lib: device protocol, HSD</small
                    >
                </div>
            </div>
        </div>
        <div class="layer">
            <span class="tier">shared engine</span>
            <div class="cells" style:--cols={1}>
                <div class="box core">
                    <b>signal_core</b>
                    <small
                        >summary pyramids, filters, re-referencing, a chunked
                        engine for files of any size</small
                    >
                </div>
            </div>
        </div>
    </div>
    {#snippet notes()}
        <p>
            Both apps are about thirty lines: a config and a list of providers
            handed to the same viewer. hyprview adds one provider, built on the
            Dart port of hyperscanner_lib, for the device over serial and its
            HSD recordings.
        </p>
        <p>
            Desktop, Android and the web from one codebase. Whatever is fixed or
            added in the shared packages lands in both apps.
        </p>
    {/snippet}
</Slide>

<Slide
    title="Bonus: PoC - LSL Anywhere?"
    prompt="lsl relay --token s3cret"
    class="bonus"
>
    <div class="relay">
        <div class="side">
            <span class="tier">publish</span>
            <div class="box">
                <b>lab LSL network</b>
                <small><code>lsl share</code> · <code>lsl publish</code></small>
            </div>
            <div class="box">
                <b>browser</b>
                <small>a WebSerial device or XDF replay</small>
            </div>
        </div>
        <div class="wire">ws →</div>
        <div class="box core hub">
            <b>lsl relay</b>
            <small>passes streams between its clients over a WebSocket</small>
        </div>
        <div class="wire">ws →</div>
        <div class="side">
            <span class="tier">receive</span>
            <div class="box">
                <b>browser</b>
                <small>LSL Viewer on the web</small>
            </div>
            <div class="box">
                <b>another LSL network</b>
                <small
                    ><code>lsl bridge</code>: ordinary LSL streams again</small
                >
            </div>
        </div>
    </div>
    <ul class="compact">
        <li>LSL relies on local network, a VPN or unsafe public access.</li>
        <li>
            A <strong>clock chain</strong> is embedded alongside the samples with
            offset, drift, uncertainty and latency for each hop.
        </li>
        <li>
            Part of <code>lsl_tools</code> the <code>lsl</code> command line tool,
            and a menu in LSL Viewer.
        </li>
    </ul>
    {#snippet notes()}
        <p>
            share: LSL streams from here over a WebSocket. relay: between
            WebSocket clients only. bridge: a relay's streams as LSL streams
            here. publish: connect out from a lab that accepts no incoming
            connections.
        </p>
        <p>
            The receiving end adds the hops up, so a bridged stream lines up
            with local ones: well under a millisecond per hop on a LAN, a few
            milliseconds per hop over the internet. The same clock chain
            continues through a peer_coordinator session.
        </p>
        <p>
            Limits: values travel as 32-bit floats, no automatic reconnect, and
            it is meant for a trusted group with a token, behind TLS outside the
            lab.
        </p>
    {/snippet}
</Slide>
