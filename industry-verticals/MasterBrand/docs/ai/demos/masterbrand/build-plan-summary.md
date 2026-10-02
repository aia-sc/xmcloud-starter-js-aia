# MasterBrand — Build Plan

> **Source:** https://www.masterbrandcabinets.com/
> **Analyzed:** 2026-10-02
> **Sections:** 11 (8 API-addable Financial components, 3 partial-design / manual)
> **Approach:** Financial PLAY! library + **pixel-perfect `MasterBrand` variants** on every section

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Dark utility bar: My Favorites, Careers, Exclusive Emails_ | Eyebrow | MasterBrand | Medium | Partial design — manual |
| 2 | _Slate-blue nav with white logo + links_ | Header | MasterBrand | High | Partial design — manual |
| 3 | _Full-bleed kitchen hero, white serif headline, pill ghost CTA_ | Hero | MasterBrand | High | API-addable |
| 4 | _Asymmetric 4-card masonry (basics / brands / find pro / organize)_ | Four Column CTA | MasterBrand | High | Custom masonry layout |
| 5 | _Planning guide photo + muted download panel_ | Promo CTA | MasterBrand | High | Image left / text right |
| 6 | _Centered "Why MasterBrand?" with flanking rules_ | Heading CTA | MasterBrand | High | Centered rules only |
| 7 | _Three image cards with white overlay titles_ | Three Column CTA | MasterBrand | High | Overlay cards |
| 8 | _Reviews copy + stars left, phone/stars photo right_ | CTA Banner | MasterBrand | High | 50/50 muted split |
| 9 | _Style gallery image left, Become a Dealer text right_ | Two Column CTA | MasterBrand | High | Mixed overlay + panel |
| 10 | _Dark logo wall — Our Family of Brands_ | Image Gallery | MasterBrand | Medium | White logos on charcoal |
| 11 | _Multi-column light footer + socials + NYSE mark_ | Footer | MasterBrand | Medium | Partial design — manual |

---

## Sections that need attention

> [!WARNING]
> Pixel-perfect requires custom `MasterBrand` variants on **all 11** sections. Default Financial layouts will not match the screenshot.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | _Masonry feature grid_ | Default Four Column CTA is equal 4-up | MasterBrand CSS grid: tall center card spanning 2 rows |
| 10 | _Brand logo wall_ | Image Gallery is photo grid with dotted accents | MasterBrand dark logo-wall variant |
| 1–2, 11 | _Header / footer chrome_ | Cannot add via API | Restyle existing partials + set MasterBrand variants in Pages |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 3 | Hero | MasterBrand | Full-bleed photo + centered overlay (Default is split text/image) |
| 4 | Four Column CTA | MasterBrand | Asymmetric masonry, not equal columns |
| 5 | Promo CTA | MasterBrand | Underlined text link, muted panel, no accents |
| 6 | Heading CTA | MasterBrand | Rules flanking centered title |
| 7 | Three Column CTA | MasterBrand | Image overlays instead of image+text below |
| 8 | CTA Banner | MasterBrand | Reviews layout without dotted accents |
| 9 | Two Column CTA | MasterBrand | One image-overlay column + one text-only panel |
| 10 | Image Gallery | MasterBrand | Dark logo wall |

---

## Components by type

**API-addable (8)** — Hero, Four Column CTA, Promo CTA, Heading CTA, Three Column CTA, CTA Banner, Two Column CTA, Image Gallery

**Manual / partials (3)** — Eyebrow, Header, Footer

**Custom new components (0)** — none; all reuse Financial PLAY!

---

## Build order

1. Extract & upload images → Content Hub  
2. Create MasterBrand datasource items under Data (Promos + per-component folders)  
3. Apply theme CSS variables + Esteban/Montserrat fonts  
4. Add `MasterBrand` pixel-perfect variants to all 11 component TSX files + Sitecore Variant Definitions  
5. Assemble Home page (API) and wire datasources  
6. SE sets variants in Pages + restyles header/footer partials  

---

## Theme snapshot (for review)

| Token | Value |
|-------|-------|
| Primary | `#4F758B` (slate blue) |
| Utility / brand wall | `#2C2C2C` / `#3A3A3A` |
| Muted sections | `#F5F4F1` |
| Headings | Esteban (serif) |
| Body / nav | Montserrat (sans) |
| Buttons | Pill radius (`9999px`) ghost style on hero |
