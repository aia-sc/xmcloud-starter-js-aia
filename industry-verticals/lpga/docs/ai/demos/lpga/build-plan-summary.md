# LPGA — Build Plan

> **Source:** https://www.lpga.com  
> **Analyzed:** 2026-10-16  
> **Sections:** 17 (12 template-mapped, 3 custom, 2 context-only)  
> **Target:** Homepage (`/sitecore/content/sports/lpga/Home`)  
> **Code:** `industry-verticals/lpga`  
> **Article screenshot saved for later:** `docs/ai/demos/lpga/reference/article-how-to-watch-shanghai.jpg`

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Thin Impact / Impact Award promo strip with golfer photo_ | Announcement Bar | Highlight | High | LpgaImpact custom variant recommended |
| 2 | _LPGA logo, main nav, LIVE pill, Rolex clock_ | Navigation Header | Default | High | Context-only (partial design) |
| 3 | _Buick LPGA Shanghai band + live player score cards_ | **Custom: LpgaTournamentLeaderboard** | Default | High | Sports-specific |
| 4 | _Large featured story + Top News sidebar + thumbnails_ | **Custom: LpgaFeaturedNews** | Default | High | Asymmetric news layout |
| 5 | _Tall portrait Tour Highlights cards_ | Feature Cards Grid | Carousel | High | LpgaHighlights variant |
| 6 | _Bright green Tour Schedule banner_ | CTA Banner | Default | High | |
| 7 | _From the Tour video grid (play icons)_ | Feature Cards Grid | WithImages | Medium | LpgaVideoGrid variant |
| 8 | _Press conference video cards_ | Feature Cards Grid | TwoColumn | Medium | |
| 9 | _Explore the LPGA — 6 org cards_ | Value Proposition Grid | Default | High | LpgaExplore variant |
| 10 | _Drive On / Hall of Fame dark banners_ | Feature Highlight | Centered | Medium | May use 1–2 instances |
| 11 | _Founding Partners logo + blurb cards_ | Logo Cloud | WithLabels | High | LpgaPartners variant |
| 12 | _Circular “trending / social” player bubbles_ | Feature Cards Grid | Carousel | Low | Prefer LpgaSocial custom variant |
| 13 | _LPGA App phone mockup promo_ | CTA Banner | WithImage | High | Or reuse Financial AppPromo |
| 14 | _CME Globe / Rolex POY standings (or player compare)_ | **Custom: LpgaStandings** | Default | High | Ranking tables |
| 15 | _Purple “Inspire a Million More Girls” CTA_ | CTA Banner | WithImage | High | |
| 16 | _Yellow newsletter signup_ | Newsletter Signup | Banner | High | |
| 17 | _Navy mega footer with columns, apps, social_ | Site Footer | MegaFooter | High | Context-only |

---

## Sections that need attention

> [!WARNING]
> These need custom components or careful review.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Live tournament + player score carousel_ | No sports leaderboard template | Build **LpgaTournamentLeaderboard** |
| 4 | _Featured news + Top News sidebar_ | Asymmetric layout | Build **LpgaFeaturedNews** |
| 12 | _Circular social/trending bubbles_ | Weak template fit | Custom variant on FeatureCardsGrid |
| 14 | _Dual standings / player comparison_ | No ranking template | Build **LpgaStandings** |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Announcement Bar | Highlight | High-contrast top promo |
| 2 | Navigation Header | Default | Solid white bar (theme `navStyle: solid-bar`) |
| 5 | Feature Cards Grid | Carousel | Horizontal portrait highlights |
| 6 | CTA Banner | Default | Solid accent schedule strip |
| 7 | Feature Cards Grid | WithImages | Video thumbnails with play overlay |
| 8 | Feature Cards Grid | TwoColumn | Wider press cards |
| 11 | Logo Cloud | WithLabels | Partners with descriptive text |
| 13 | CTA Banner | WithImage | App promo with phone mockup |
| 15 | CTA Banner | WithImage | Foundation inspire banner |
| 16 | Newsletter Signup | Banner | Full-width yellow form |
| 17 | Site Footer | MegaFooter | Multi-column + social + apps |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Announcement Bar | Simple |
| 3 | LpgaTournamentLeaderboard (custom) | List (parent + player children) |
| 4 | LpgaFeaturedNews (custom) | List (featured + news children) |
| 5 | Feature Cards Grid (Highlights) | List |
| 6 | CTA Banner (Schedule) | Simple |
| 7 | Feature Cards Grid (Videos) | List |
| 8 | Feature Cards Grid (Press) | List |
| 9 | Value Proposition Grid | List |
| 10 | Feature Highlight | Simple |
| 11 | Logo Cloud | List |
| 12 | Feature Cards Grid (Social) | List |
| 13 | CTA Banner (App) | Simple |
| 14 | LpgaStandings (custom) | List |
| 15 | CTA Banner (Inspire) | Simple |
| 16 | Newsletter Signup | Simple |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Navigation Header | Header partial design | Wire LPGA nav + Rolex block |
| 17 | Site Footer | Footer partial design | Wire LPGA mega footer |

### Custom components needed

| # | What's on the page | Suggested approach | Fields needed |
|---|-------------------|-------------------|---------------|
| 3 | Tournament + live scores | New list component | Title, dates, location, CTAs, player children |
| 4 | Featured news layout | New list component | Featured image/headline + sidebar children |
| 14 | Standings / comparison | New list component | Two ranking groups or player stats rows |

---

## Build Order

```
Phase 1 — Sitecore content (datasources under /sitecore/content/sports/lpga/Data):
  1. AnnouncementBar
  2. LpgaTournamentLeaderboard (custom)
  3. LpgaFeaturedNews (custom)
  4. FeatureCardsGrid ×3 (Highlights, Videos, Press/Social)
  5. CTABanner ×3 (Schedule, App, Inspire)
  6. ValuePropositionGrid (Explore)
  7. FeatureHighlight (Drive On)
  8. LogoCloud (Partners)
  9. LpgaStandings (custom)
  10. NewsletterSignup

Phase 2 — Apply LPGA theme (CSS variables + Figtree)

Phase 3 — Build 3 custom components + register in Available Renderings

Phase 5.5 — Optional pixel-perfect Lpga* variants

Phase 6 — Assemble on Home + Content Hub images (Erlanger-style upload)
```

---

## Content Hub

Credentials verified (**200 OK**). After approval, Phase 2.5–3 will download homepage images and upload/approve/public-link them in Content Hub the same way as Erlanger.

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table to the homepage screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5 — `Lpga*` exports for nav, highlights, video grid, partners, footer) **or are generic template variants sufficient?**

> Reply **approved** (and answer Q2) to proceed, or describe any changes needed.
