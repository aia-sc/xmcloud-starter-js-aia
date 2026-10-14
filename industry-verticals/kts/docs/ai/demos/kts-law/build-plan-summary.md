# KTS Law — Build Plan

> **Source:** https://ktslaw.com/
> **Analyzed:** 2026-10-07
> **Sections:** 10 (8 API-addable Financial PLAY! components, 2 partial-design / manual)
> **Approach:** Financial PLAY! library + **pixel-perfect `KTS` variants** on every section
> **Content root:** `/sitecore/content/legal/kts-law`
> **Code root:** `./industry-verticals/kts`

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _White header — logo left, search + hamburger right_ | Header | KTS | High | Partial design — manual |
| 2 | _Red "Connected to Next." + attorney portrait_ | Hero | KTS | High | API-addable |
| 3 | _Burgundy 3 pillars with 01/02/03 + Learn more_ | Three Column CTA | KTS | High | API-addable |
| 4 | _Red "Search for an attorney" strip_ | Promo CTA | KTS | High | API-addable |
| 5 | _Insights heading + "See all Insights" button_ | Heading CTA | KTS | High | Register rendering first |
| 6 | _Three ALERT insight cards with Read more_ | Three Column CTA | KTSInsights | High | Second datasource |
| 7 | _Red marquee: Cutting-edge / Ground-breaking / Pioneering_ | CTA Banner | KTS | Medium | Register rendering first |
| 8 | _Grey section with camera-lens tech image_ | Parallax Banner | KTS | High | API-addable |
| 9 | _Offices grid + practice areas_ | Promo CTA | KTSOffices | Medium | RichText for office columns |
| 10 | _Red footer — legal links + social icons_ | Footer | KTS | High | Partial design — manual |

---

## Sections that need attention

> [!WARNING]
> Pixel-perfect requires custom `KTS` / `KTSInsights` / `KTSOffices` variants. Default Financial layouts will not match the screenshot.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 2–4 | _Hero stack (red + portrait + burgundy + search)_ | Default Hero is split promo-style | One Hero.KTS + ThreeColumnCta.KTS + PromoCta.KTS |
| 7 | _Scrolling marquee typography_ | No stock marquee variant | CtaBanner.KTS with CSS marquee animation |
| 9 | _22 office links in 4 columns_ | Promo CTA is title/text/link, not a link grid | KTSOffices variant: RichText 4-col office list |
| 5, 7 | _Heading CTA / CTA Banner_ | Not on kts-law Available Renderings yet | Auto-register before assembly |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|------------------|
| 1 | Header | KTS | Minimal white chrome — logo + icons only |
| 2 | Hero | KTS | Red headline band stacked above portrait (not default split) |
| 3 | Three Column CTA | KTS | Burgundy pillars with outlined CTAs + number watermarks |
| 4 | Promo CTA | KTS | Full-bleed red search strip |
| 5 | Heading CTA | KTS | Left headline / right solid red CTA |
| 6 | Three Column CTA | KTSInsights | Image-top alert cards, red text links |
| 7 | CTA Banner | KTS | Solid red oversized marquee text |
| 8 | Parallax Banner | KTS | Muted grey, image-only |
| 9 | Promo CTA | KTSOffices | Offices + practices layout |
| 10 | Footer | KTS | Solid red footer matching brand |

---

## Components by type

**API-addable (8)** — Hero, Three Column CTA (×2), Promo CTA (×2), Heading CTA, CTA Banner, Parallax Banner

**Manual / partials (2)** — Header, Footer

**Custom new components (0)** — none; all reuse Financial PLAY!

**Must register first:** Heading CTA `{89E1D547-…}`, CTA Banner `{488B8AC0-…}`

---

## Build order

1. Extract & upload images → Content Hub  
2. Create KTS Law datasource items under `/sitecore/content/legal/kts-law/Data`  
3. Apply theme CSS variables (primary `#D21F3C`, burgundy `#4A152B`)  
4. Add `KTS` pixel-perfect variants to all component TSX files + Sitecore Variant Definitions  
5. Register missing renderings → assemble Home page → wire datasources  
6. SE sets variants in Pages + restyles header/footer partials  

---

## Theme snapshot (for review)

| Token | Value |
|-------|-------|
| Primary / footer | `#BA0C2F` (brand red) |
| Hero red (accent) | `#F4364C` |
| Secondary / pillars | `#4A152B` (burgundy) |
| Muted sections | `#F2F2F2` |
| Header | White / `#101820` text |
| Font | Diagramm → **Outfit** (Google Fonts substitute) |
| CTA buttons | `30px` radius; cards stay square |

---

## Approval Questions

1. **Does the build plan look correct?** Approved to proceed?
2. **Do you want pixel-perfect custom variants** for each component (Phase 5.5), or are generic template variants sufficient?

> Reply **approved** (and confirm pixel-perfect vs generic) to continue, or describe any changes needed.
