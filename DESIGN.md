# DESIGN — ДариСмысл

World: the parcel and its waybill. The ground is kraft carton, text is carbon-blue ink, states are rubber stamps, actions are berry ribbon. Candy-wrapper prints appear only as the goods (the scenario panels). The direction contract is in `.impeccable/surfaces/app-page-tsx.md`.

## Tokens (app/globals.css :root), 2026-10-09 v2: calm palette
| Token | Value | Role |
|---|---|---|
| --frost / --frost-2 | #eef3f0 / #e1ebe5 | page ground; alternate sections |
| --paper | #ffffff | cards, form, receipt |
| --pine / --pine-2 / --pine-soft | #17312b / #22453c / #4d675f | text; dark bands (price, contact); secondary text |
| --berry / --berry-2 | #c8423a / #a8352e | primary buttons, ribbon, stamps, second line of the H1 |
| --honey / --honey-soft | #e8b654 / #f6e3b8 | the second tape, ticks, candy foil |
| --sage, --tan | #a9c7b4, #dcbb8f | outlines of the reel numbers; carton of the parcel |
| --rule | #d3dfd8 | hairlines |

## Type
- Display: Unbounded 800. Text: Golos Text 400/600.

## Structure (references: sync-agency.com, zsklnskky.github.io/inkside)
- Floating glass nav pill. It hides on scroll down, and the berry progress line shows how far the page is read.
- Hero: the H1 is split into characters, with the mascot video pill set inside it like a word. Quick-start chips open the form pre-filled.
- Tapes cross the section seams. The waybill steps scroll horizontally in a pinned reel on desktop (vertical cards below 1000px). The receipt prints, the checklist ticks, the FAQ cards open.

## Motion (app/motion.tsx: GSAP 3.13 + ScrollTrigger + SplitText, Lenis)
- Intro: a berry circle wipe, then the hero chars rise, the parcel drops with a bounce, the ribbon ties, the bow pops and the stamp spins in.
- Scroll: masked character reveals on H2, a rise on [data-rise], parallax on the parcel, the reel with containerAnimation stamps, and candies swinging in from the sides.
- `prefers-reduced-motion`: no Lenis and no tweens; the wipe is hidden.
