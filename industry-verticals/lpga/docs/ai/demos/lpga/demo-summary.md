# LPGA Homepage Demo — Summary

> **Source:** https://www.lpga.com  
> **Content root:** `/sitecore/content/sports/lpga`  
> **Code:** `industry-verticals/lpga`  
> **Built:** 2026-10-16  
> **Article screenshot saved for later:** `reference/article-how-to-watch-shanghai.jpg`

---

## Build Overview

| Metric | Count |
|--------|------:|
| Custom Sitecore components | 3 |
| Pixel-perfect `Lpga` React variants | 4 (Tournament, FeaturedNews, Standings, CtaBanner) |
| Content Hub images uploaded | 9/9 |
| Datasources populated | 8+ |
| Components on Home (wired) | Tournament, FeaturedNews, Schedule/Drive On/Inspire CTAs, App Promo, Standings |

---

## Component Inventory

| # | Component | Status |
|---|-----------|--------|
| 1 | LpgaTournamentLeaderboard | ✅ On Home + wired (Buick Shanghai content) |
| 2 | LpgaFeaturedNews | ✅ On Home + wired (`LPGA_News_Featured`) |
| 3 | CTA Banner — Tour Schedule | ✅ Wired |
| 4 | CTA Banner — Drive On | ✅ Wired (CH image) |
| 5 | CTA Banner — Inspire | ✅ Wired (CH image) |
| 6 | App Promo — LPGA App | ✅ Wired (CH image) |
| 7 | LpgaStandings | ✅ On Home + wired (`LPGA_Competition_Standings` + CME/POY rows) |
| 8 | Navigation / Footer | Manual — still Financial partials; restyle via `site-lpga` theme |

OOB Financial components (Carousel, Promo CTAs, etc.) remain on Home for cleanup.

---

## Theme

Applied in `globals.scss` `:root` brand variables + `site-lpga` tokens in `_colors.scss`.  
Site theme class: `lpga` / `LPGA` → `site-lpga` (`site-theme.ts`).  
Fonts: Figtree (+ Roboto Serif available for editorial later).

---

## Image Upload Summary (Content Hub)

All **9/9** images uploaded, approved, and public-linked to `https://aia-verticals.sitecoresandbox.cloud`.

| File | Asset ID | Used for |
|------|----------|----------|
| section1-img1.jpg | 84290 | Featured news hero |
| section1-img2.jpg | 84297 | Impact/ad strip (available) |
| section1-img3.jpg | 84304 | Drive On banner |
| section1-img4.png | 84311 | Drive On logo (available) |
| section1-img5.jpg | 84318 | Hall of Fame (available) |
| section1-img6.jpg | 84328 | LPGA App promo |
| section1-img7.gif | 84337 | App reel (available) |
| section1-img8.jpg | 84345 | Spotlight bg (available) |
| section1-img9.jpg | 84357 | Inspire CTA |

---

## Manual Tasks

See `manual-tasks.md` and `variant-checklist.md`.

### High priority
1. Set **Lpga** variant on CTA Banner instances (Design tab) — custom components already render Lpga visuals via `Default`/`Lpga` exports.
2. Remove leftover Financial OOB blocks (Carousel banking slides, Five/Three Column CTAs, old Promo CTAs, duplicate App Promo).
3. Update Header/Footer partials for LPGA nav + Rolex block (or place custom header later).

### Personalization (optional)
Create additional datasources: `LPGA - <Component> - <Segment>` then Personalize in Pages.

---

## Key Paths

| Item | Path / ID |
|------|-----------|
| Home | `/sitecore/content/sports/lpga/Home` `{07db08f5-701a-4341-a712-2182f6b79f0b}` |
| Tournament DS | `.../Data/LpgaTournamentLeaderboard/Buick LPGA Shanghai Leaderboard` |
| Featured News (shared) | `.../Data/LpgaFeaturedNews/Buick LPGA Shanghai News` |
| Standings (shared) | `.../Data/LpgaStandings/Race to CME Globe Standings` |
| Renderings | `/sitecore/layout/Renderings/Project/Financial/Page Content/LPGA/` |
