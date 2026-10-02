# MasterBrand Demo — Summary

> **Source:** https://www.masterbrandcabinets.com/  
> **Sitecore:** `/sitecore/content/Financial/masterbrand`  
> **Code:** `./industry-verticals/MasterBrand`  
> **Built:** 2026-10-02  
> **Approach:** Financial PLAY! components + pixel-perfect `MasterBrand` variants

---

## Build Overview

| Metric | Count |
|--------|------:|
| Template components reused | 11 |
| Custom new components | 0 |
| Pixel-perfect variants (React + Sitecore) | 11 |
| Datasources created / populated | 7+ |
| Images uploaded to Content Hub | 35/35 |
| API-wired on Home | 6 |
| Manual / partial work remaining | See below |

---

## Component Inventory

| # | Section | Component | Datasource | Status |
|---|---------|-----------|------------|--------|
| 1 | Utility bar | Eyebrow | Partial | ⚠️ Set variant `MasterBrand` on Header partial |
| 2 | Main nav | Header | Partial | ⚠️ Set variant `MasterBrand` |
| 3 | Hero | Hero | MasterBrand - Hero | ✅ Wired — ⚠️ Set variant |
| 4 | Featured masonry | Four Column CTA | MasterBrand_Featured_Grid | ✅ Wired — ⚠️ Set variant |
| 5 | Planning guide | Promo CTA | MasterBrand - Planning Guide | ✅ Wired — ⚠️ Set variant |
| 6 | Why heading | Heading CTA | MasterBrand_Why_Heading | ⚠️ Confirm on page + set variant |
| 7 | Why cards | Three Column CTA | MasterBrand - Why Cards | ✅ Wired — ⚠️ Set variant |
| 8 | Reviews | CTA Banner | MasterBrand - Reviews | ✅ Wired — ⚠️ Set variant |
| 9 | Style + Dealer | Two Column CTA | MasterBrand - Style and Dealer | ✅ Wired — ⚠️ Set variant |
| 10 | Brand logo wall | Image Gallery | — | ❌ Branch template missing — add manually |
| 11 | Footer | Footer | Partial | ⚠️ Set variant `MasterBrand` |

---

## Theme

| Token | Value |
|-------|-------|
| Primary | `#4F758B` |
| Muted | `#F5F4F1` |
| Brand wall | `#3A3A3A` |
| Headings | Esteban |
| Body | Montserrat |
| Delivery | Inlined `:root` in `src/app/globals.scss` + Google Fonts in `layout.tsx` |

---

## Image Upload Summary

**35/35 uploaded** to `https://aia-verticals.sitecoresandbox.cloud` and approved. DAM XML set on Hero, Featured Grid, Planning Guide, Why Cards, Reviews, Style column.

> NOTE: Financial Image fields are classic Sitecore Image type. DAM XML may render via Content Hub connector if configured; if images don’t show in Pages, re-map from Content Hub public URLs into Media Library.

---

## Manual Tasks

### 1. Variant Selection (~3 min)

In Pages editor, set **FieldNames / Variant** to `MasterBrand` for:

| Component | Variant ID |
|-----------|------------|
| Hero | `{134e6916-d412-457d-a571-74c38321264a}` |
| Four Column CTA | `{d9966ff9-454e-4080-8793-452ed3fdd1be}` |
| Promo CTA | `{ac5feb28-7d15-458f-8b77-f312fae33646}` |
| Heading CTA | `{7d855c6f-9784-47b0-bf6f-4810c13e7c94}` |
| Three Column CTA | `{7ca6f2e5-00a3-4004-a546-f4b6d8089851}` |
| CTA Banner | `{635656ca-4161-4523-acc0-e77c80e13ae6}` |
| Two Column CTA | `{d100a844-539a-4152-b7ee-4f0f5eb2f33e}` |
| Header (partial) | `{6487ce65-6386-4c0c-9962-2fd4dcdfa709}` |
| Footer (partial) | `{fb3c21af-f326-4546-96ac-140d7d5af40b}` |

### 2. Cleanup OOB Financial components

Remove or hide from Home `headless-main`: Carousel, Five Column CTA, extra Promo CTAs, Article List, Documents List, App Promo.

### 3. Brand logo wall

Image Gallery branch template missing. Options: add logos via Rich Text/Promo, or recreate Image Gallery rendering datasource location.

### 4. Header / Footer content

Update partial designs with MasterBrand logo (`img-00` / asset 83542) and nav/footer link copy from live site.

### 5. Personalization (optional)

Duplicate datasources as `MasterBrand - <Component> - <Segment>` and assign in Pages → Personalize.

---

## Code changes

- `MasterBrand` exports on: Hero, FourColumnCta, PromoCta, HeadingCta, ThreeColumnCta, CtaBanner, TwoColumnCta, ImageGallery, Header, Footer, Eyebrow
- `src/assets/sass/variants/_masterbrand.scss`
- Theme CSS variables + Esteban/Montserrat fonts

## Progress files

`docs/ai/demos/masterbrand/` — build-plan, content-map, demo-progress, images/
