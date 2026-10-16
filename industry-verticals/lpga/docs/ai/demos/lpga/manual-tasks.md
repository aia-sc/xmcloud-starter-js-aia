# LPGA Demo — Manual Tasks

## 1. Variant selection (CTA Banner)

Custom LPGA components already export both `Default` and `Lpga` as the same pixel-perfect view — they render correctly without changing FieldNames.

For **CTA Banner** instances (Schedule / Drive On / Inspire): set variant to **Lpga** in Pages → Design tab if available.

## 2. Cleanup Financial starter leftovers

Remove or hide from Home `headless-main` (confirm in Pages first — remove requires explicit OK):

- Carousel (banking slides)
- Five Column CTA / Three Column CTA / Two Column CTA
- Old Promo CTA blocks
- Duplicate App Promo (keep the LPGA-wired one: `LPGA - App Promo`)
- Article List / Documents List if still banking content

## 3. Header / Footer

Partial designs still use Financial Header/Footer. Options:

- Restyle via `site-lpga` CSS, or
- Build/place LPGA header + footer in a follow-up (Rolex clock, LIVE pill, mega footer)

## 4. Article page (later)

Screenshot saved at:  
`docs/ai/demos/lpga/reference/article-how-to-watch-shanghai.jpg`

## 5. Personalization (optional)

Duplicate datasources as `LPGA - <Component> - <Segment>` and attach conditions in Pages.
