# DESIGN — ДариСмысл

World: the parcel and its waybill. The ground is kraft carton, text is carbon-blue ink, states are rubber stamps, actions are red ribbon tape. Candy-wrapper prints appear only as the goods (the scenario panels). The direction contract is in `.impeccable/surfaces/app-page-tsx.md`.

## Tokens (app/globals.css :root)
| Token | Value | Role |
|---|---|---|
| --kraft / -2 / -3 | #c58f55 / #b27a42 / #d8a873 | ground and section fields, always with the `--fibers` texture |
| --ink / --ink-2 | #16206b / #0e1550 | all text on kraft; the dark price and contact bands |
| --ink-soft | #33407f | secondary text, only on paper (contrast is too low on kraft) |
| --stamp | #4338ca | stamps, focus ring, links on paper |
| --ribbon / -2 | #d4152b / #a90f20 | primary buttons (.btn-tape), ribbons, second line of the H1 |
| --foil, --pine | #e9c46a, #0f5a3c | only for candy wrappers and price chips |
| --paper, --rule | #f4f6fa, #c3cce0 | waybill and form sheets; their ruling |

## Type
- Display: Unbounded 800, letter-spacing -0.02 to -0.03em. Used for H1, H2 (.title), H3 and the stamps.
- Text: Golos Text 400/600. Numerals tabular in the phone number, waybill numbers and the date field.

## Components
- `.btn-tape`, `.btn-ink`, `.btn-paper`: 52px tall, 3px corner radius, `translateY(2px)` on press.
- `.stamp`: double rule plus grain mask. Dashed (`.stamp-yours`) means the visitor's move; solid means ours. State is never shown by hue alone.
- `.sheet` (waybill), `.receipt` (torn edge, dotted leaders), `.paper-stack` (ruled checklist with ticks), `.wrapper` (candy with pleated twisted ends).
- The form is a ruled paper sheet with numbered fields, underline inputs and chip radios.

## Motion
- The waybill stamps press in with a scroll-driven animation (`animation-timeline: view()`). Without support, they stay visible.
- The «ПРИНЯТО» stamp lands on the form after a successful submit.
- `prefers-reduced-motion` disables all of it.
