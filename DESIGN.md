# DESIGN — ДариСмысл

World: the parcel and its waybill. The ground is kraft carton, text is carbon-blue ink, states are rubber stamps, actions are berry ribbon. Candy-wrapper prints appear only as the goods (the scenario panels). The direction contract is in `.impeccable/surfaces/app-page-tsx.md`.

## Direction v3: «тихий иней» (2026-10-09)
After «глаза разбегаются» the page was distilled. The refs come from Refero: Customer.io, Ease Health, Headspace, Family, sweetgreen.

| Token | Value | Role |
|---|---|---|
| --bg / --band / --card | #f6f8f5 / #eef3f0 / #fff | ground; alternate sections; cards |
| --line | #dfe6e1 | hairlines instead of shadows |
| --pine / --body / --muted | #17312b / #3d524b / #5f716a | headings; body text; secondary text (>=4.5:1) |
| --berry | #c8423a | the single primary action, the ribbon, the second line of the H1 |

- Type: Unbounded 700 for H1 (64 desktop / 38 mobile) and H2 (40 / 28). Golos Text 600 for H3, 400 for body (18 / 16).
- Rhythm: sections 112 / 72px, card padding 32 / 24px, gap 24px. Radii: cards 20, buttons 9999, inputs 12.
- Structure: hero (H1, lead, one button, a link with an arrow, the parcel with the mascot) → 2 cards → 4 steps on a 1px line → dark «Условия» → 4 FAQ items → form (inputs 52px tall, full-width button).
- Motion: reveals only (y 16 → 0, 0.6s, power2.out) plus Lenis. No pinning, no scrub, no decoration. Only the mascot moves on its own.
