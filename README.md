# Rise Together talk

Private reveal.js deck. The figures, design tokens, fonts and images are imported live from the
site repo, which has to be checked out next to this one as `../zeyus.github.io`.

```sh
pnpm install
pnpm dev                       # present from here, or:
pnpm build && pnpm preview     # self-contained copy in dist/, works offline
```

- `src/meta.ts`: title, author, occasion, date
- `src/Deck.svelte`: slide order
- `src/slides/`: the slides; `src/deck.css`: the theme

Keys: arrows / space step through the slides, and through the wiring diagram's signals from left
to right. On the timing figures' scene
slides each press plays to the next stage and pauses; their lane timelines play and loop while on
show. `T` light / dark, `S` speaker notes, `F` fullscreen, `Esc` overview,
ctrl + click zooms in. `?theme=light` in the URL starts on the light theme.
