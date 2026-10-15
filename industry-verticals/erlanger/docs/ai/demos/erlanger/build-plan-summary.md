# Erlanger — Build Plan

> **Source:** https://www.erlanger.org/
> **Analyzed:** 2026-10-15
> **Sections:** 8 (7 template, 1 custom)
> **Content root:** `/sitecore/content/medical/erlanger` (the path `medicall` does not exist)
> **Code root:** `industry-verticals/erlanger`

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Navy utility links over a white logo bar with Find a Doctor, Medical Services, Locations, and Patients & Family Resources_ | Navigation Header | Erlanger | High | Header partial. Manual placement |
| 2 | _Full-bleed ErlangerNOW photo, left headline, four white quick-link cards on the right_ | Hero Banner | Erlanger | Medium | Needs fields for the four cards |
| 3 | _Black band, “The Future of Health Care,” four YouTube videos in a 2×2 grid_ | Erlanger Video Grid | Default | High | Custom. Videos stay as URLs |
| 4 | _Navy specialty band with Orthopaedics, Urology, Heart Care, and Pediatrics, plus a gold “View All” button_ | Feature Cards Grid | Erlanger | High | |
| 5 | _Pale band, “Before your visit” on the left, accordion on the right_ | FAQ Accordion | Erlanger | Medium | Split intro + accordion |
| 6 | _Operating-room photo beside the clinical research mission_ | Feature Highlight | Erlanger | High | |
| 7 | _Black band, “Erlanger by the Numbers,” four white cards: 7, 57, 28, 55_ | Trust Stats Row | Erlanger | High | 2×2 cards, each with a link |
| 8 | _White mega footer, gold top rule, address, partners, and four link columns_ | Site Footer | Erlanger | High | Footer partial. Manual placement |

---

## Sections that need attention

> [!WARNING]
> The UIIM component library is not in this app or in Sitecore. `/sitecore/layout/Renderings/Project/medical` is empty, and `src/components/uiim` does not exist. The manifest still points at `main/main-website` and `fmc-custom-demo`. Pixel-perfect work means creating the components above before content can be placed.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 2 | _Hero plus four quick-link cards_ | Hero Banner has no child items for those cards | Add link fields or child items on the Erlanger variant |
| 3 | _2×2 YouTube grid_ | No template component renders multiple videos | Build Erlanger Video Grid. Keep the four embed URLs. Do not download the videos |
| — | _Whole page_ | Home still shows the financial starter (Carousel, Promo CTAs, Article List, and others) | Those OOB components cannot be removed via the API. Clean them up in Pages after assembly |

---

## Variant Decisions

You asked for pixel-perfect components, so every section gets an `Erlanger` variant rather than a generic template layout.

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Navigation Header | Erlanger | Two solid bars: navy utility row, white main nav |
| 2 | Hero Banner | Erlanger | Full-bleed photo with a stack of quick-link cards |
| 4 | Feature Cards Grid | Erlanger | Navy four-up text cards and a gold pill button |
| 5 | FAQ Accordion | Erlanger | Intro on the left, accordion on the right |
| 6 | Feature Highlight | Erlanger | Photo left, dark copy panel right |
| 7 | Trust Stats Row | Erlanger | 2×2 white cards on black, not a single number row |
| 8 | Site Footer | Erlanger | White mega footer with a gold top rule |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero Banner | Simple, plus four quick links |
| 3 | Erlanger Video Grid | List (parent + 4 videos) |
| 4 | Feature Cards Grid | List (parent + 4 cards) |
| 5 | FAQ Accordion | List (parent + 3 items) |
| 6 | Feature Highlight | Simple |
| 7 | Trust Stats Row | List (parent + 4 stats) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Navigation Header | Header partial design | Build the variant, then assign it in the header partial |
| 8 | Site Footer | Footer partial design | Build the variant, then assign it in the footer partial |

### Custom components needed

| # | What's on the page | Suggested approach | Fields needed |
|---|-------------------|-------------------|---------------|
| 3 | _2×2 YouTube grid_ | New Erlanger Video Grid | Title, plus child VideoTitle, VideoUrl, PosterImage |

---

## Theme

Navy `#002452`, utility navy `#003476`, gold `#dab066`. Headings are Georgia. Body is Atkinson Hyperlegible. Full tokens are in `docs/ai/themes/erlanger.theme.yaml`.

---

## Build Order

```
Phase 1 — Sitecore content (after the components exist):
  1. Hero Banner
  2. Erlanger Video Grid
  3. Feature Cards Grid
  4. FAQ Accordion
  5. Feature Highlight
  6. Trust Stats Row

Phase 2 — Apply theme (CSS variables + Atkinson Hyperlegible)

Phase 3 — Custom component:
  Erlanger Video Grid

Phase 4 — Pixel-perfect Erlanger variants for every section

Manual:
  Navigation Header and Site Footer in partial designs
  Remove financial starter components from Home
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Pixel-perfect Erlanger variants are already requested.** Confirm that is still what you want, including building the missing components in this app and in Sitecore.

> Reply "approved" to proceed, or describe any changes needed.
