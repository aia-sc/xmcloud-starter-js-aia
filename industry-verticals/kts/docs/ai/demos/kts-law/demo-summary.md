# KTS Law Demo Summary

**Source:** https://ktslaw.com/  
**Content:** `/sitecore/content/legal/kts-law`  
**Code:** `./industry-verticals/kts`  
**Approach:** Financial PLAY! + pixel-perfect `KTS` variants  
**Completed:** 2026-10-07

## What shipped

| Area | Status |
|------|--------|
| Theme (`kts-law.theme.yaml` → `globals.scss` + Outfit) | Done |
| Content Hub images (hero, 3 insights, endcap, logo) | Uploaded |
| Datasources with KTS copy + DAM images | Updated & wired |
| React exports: `KTS`, `KTSInsights`, `KTSOffices` | Done |
| SCSS: `variants/_kts.scss` | Done |
| Sitecore Variant Definitions | Created (10) |
| Home assembly (8 core sections) | Wired |
| Variant selection / reorder / leftover cleanup | **Manual** (see checklist) |

## Page map

| # | Section | Component | Variant | Datasource |
|---|---------|-----------|---------|------------|
| 1 | Header | Header | KTS | Partial |
| 2 | Connected to Next + portrait | Hero | KTS | Home/Data/Hero |
| 3 | Burgundy pillars 01–03 | Three Column CTA | KTS | Home/Data/Three_Column_CTA |
| 4 | Search for an attorney | Promo CTA | KTS | Data/.../KTS Law - Attorney Search |
| 5 | Insights heading | Heading CTA | KTS | Home/Data/Heading_CTA |
| 6 | Alert cards | Three Column CTA | KTSInsights | Data/.../Three Column CTA 1 |
| 7 | Marquee typography | CTA Banner | KTS | Home/Data/KTS_Marquee |
| 8 | Tech visual | Parallax Banner | KTS | Home/Data/Parallax_Banner |
| 9 | Offices | Promo CTA | KTSOffices | Data/.../Promo CTA 1 |
| 10 | Footer | Footer | KTS | Partial |

## Brand tokens

- Primary / footer: `#BA0C2F`
- Hero accent: `#F4364C`
- Pillars burgundy: `#4A152B`
- Font: Outfit (Diagramm substitute)

## Next for SE

1. Deploy FE  
2. Follow `variant-checklist.md` + `manual-tasks.md`  
3. Screenshot Home vs `docs/ai/themes/kts-law/screenshot-desktop.png`
