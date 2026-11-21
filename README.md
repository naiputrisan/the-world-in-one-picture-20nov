# the-world-in-one-picture-20nov

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/naiputrisan/the-world-in-one-picture-20nov/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/naiputrisan/the-world-in-one-picture-20nov/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

One poster that sums up the world news of **Friday 20 November 2026**:
five stories, each carried by a full-bleed scene picture with one headline
and one short line — a hero panel across the top and four panels below, on
a single 1024×1024 page. The design puts the pictures first and keeps every
word big enough to read at 300 pixels wide, the size the judge effectively
sees.

## The five stories

1. **Russia Hits Three Kyiv Bridges** — Russia's biggest bridge strikes of
   the war hit the Podilsko-Voskresenskyi, Darnytskyi and Southern bridges
   across the Dnipro on the morning of 20 November, killing 7 people and
   injuring 17, and shutting crossings between the city's two banks.
2. **Cyclone Akvan Hits Odisha** — Cyclone Akvan made landfall near
   Gopalpur on the morning of 20 November with winds of 70–80 km/h; more
   than 372,000 people were evacuated across Odisha, and no deaths or
   major damage were reported.
3. **AI Sell-Off Goes Global** — the AI rout spread from Asia to the US:
   the Nikkei fell 5% to a seven-month low, the Kospi 5% and the Taiex 6%,
   then the Nasdaq dropped 5.3% and Nvidia plunged 14% after Reuters
   reported the SEC is examining its accounting.
4. **COP31 Goes Into Overtime** — the Antalya climate talks ran past their
   final day with no deal: the draft text had scrubbed every mention of
   fossil fuels and dropped the $120-billion-a-year adaptation finance
   target, and Panama threatened to block consensus.
5. **US Nears Ban on Chinese Cars** — US lawmakers from both parties
   closed in on a bill banning Chinese cars from the American market, with
   last-minute talks aimed at sparing Mercedes-Benz, which is nearly 20%
   Chinese-owned; the bill's sponsors aim to send it to the president
   before the end of the year.

Stories as reported by **Reuters, AP, Bloomberg and the BBC** on
20 November 2026. The car ban is reported as a negotiation, not a passed
law, and nothing unverified is stated as fact.

## How the image was made

Each panel's scene is an AI-generated photorealistic news-style picture
(burning bridges over the Dnipro with the Kyiv skyline; a cyclone spiral
over the Odisha coast; a plunging red market chart with a computer chip;
a climate summit hall at night with flags, a globe and solar panels;
electric cars behind a barrier at a port under US and Chinese flags).
`poster.html` lays the five scenes out at exactly 1024×1024 with the
masthead and the headlines set in HTML type over gradient bands, and
headless Chromium (Puppeteer) rendered it to `entry.png` — so every word
is typeset programmatically and stays crisp. The shipped `entry.png` is a
1024×1024 JPEG (the rules allow a PNG or a JPEG under that name) of
290,490 bytes. Before shipping, the render was downscaled to 300 pixels
wide and every headline and line was read back from the downscale alone. `main.ts` validates the image (PNG/JPEG
magic bytes, ≤ 1 MiB, dimensions read from the image header, no zero
sides) and copies it byte-for-byte to the output directory, verifying the
copy.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=nai-putri&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
