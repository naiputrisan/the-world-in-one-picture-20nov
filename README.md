# the-world-in-one-picture-20nov

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/naiputrisan/the-world-in-one-picture-20nov/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/naiputrisan/the-world-in-one-picture-20nov/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

One picture for Friday 20 November 2026: five stories, each told by its scene first and its headline second. A burning bridge over the Dnipro, a cyclone spiral off Odisha, a red trading screen, a summit hall full of flags, and a fence full of cars — the day in a single frame.

## Run it

```sh
node main.ts
```

That copies `entry.png` into `/output/entry.png` and prints its size and SHA-256. Pass a folder as the first argument to deliver somewhere else, for example `node main.ts ./out`.

## The five stories

- **Russia hits three Kyiv bridges** — seven killed, 17 hurt as the Dnipro crossings shut.
- **Cyclone Akvan hits Odisha** — 372,000 evacuated, no deaths reported.
- **AI sell-off goes global** — Nikkei −5%, Nasdaq −5.3%, Nvidia −14%.
- **COP31 goes into overtime** — no deal on the final day, fossil-fuel text gone.
- **US nears a ban on Chinese cars** — deal close, Mercedes spared.

## How the picture is built

`poster.html` lays out the page at exactly 1024×1024: a masthead, one full-width hero panel, and a 2×2 grid. The five scene images live in `assets/` and fill each panel; the headline and a single short sub-line sit on a dark gradient at the foot of every panel so the words stay readable at any size. `main.ts` is the entrypoint: it only delivers the finished `entry.png`.

## Files

- `entry.png` — the poster, 1024×1024, 285,451 bytes, SHA-256 `b47f5291d9715bb4f41943a603d463e9f49442fe6fa768bd65d1556826da5337`.
- `poster.html` — the layout that renders the poster.
- `main.ts` — entrypoint, delivers `entry.png` to the output folder.
- `assets/` — the five scene images.
- `LICENSE` — MIT.

---

<sub>Entered on [make.fun](https://make.fun/?ref=yrjfqw9z&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
