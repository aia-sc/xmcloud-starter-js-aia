# Our Cabinet Brands checklist

Page: `/sitecore/content/homebuilding/masterbrand/Home/Our Cabinet Brands`  
Route: `/Our-Cabinet-Brands`  
Page Design: **MasterBrand Blue** (Header Blue + Footer Blue partials)

## Content Hub

- Brand: **MasterBrand Cabinets** (entity id `85035`)
- Header / footer logo: `85195-mb-cabinets-logo` (white wordmark from live site)
- Hero background: `85211-bg-our-brands-head` (wood-grain title band)
- 16 kitchen card images related via `PCMBrandToMasterAsset`
- 16 brand logos uploaded + tagged with brand name (`85227`–`85433`):
  Aristokraft, Bertch, Decora, Diamond, Dura Supreme, Fieldstone, Homecrest, Kemper, KitchenCraft, Mantra, Mid Continent, Omega, Schrock, StarMark, Ultracraft, Urban Effects
- Dura Supreme card logo replaced with dark-on-transparent asset `85526` (related to brand `85499`; prior white/opaque asset `85290` caused a black box via CSS invert)
- Brand entities: `85495`–`85510` (one per cabinet brand)

## Chrome colors (live match)

| Element | Color |
|---------|-------|
| Utility bar | `#3D3935` |
| Primary nav | `#4F758B` |
| Footer band | `#3C322C` |

## Variants (set Design tab to **MasterBrand Blue** in Pages)

| # | Component | Variant label | GUID |
|---|-----------|---------------|------|
| Header Blue partial | Header | MasterBrand Blue | `{46A2484B-8D72-406C-9DB8-8789F60F0446}` |
| Footer Blue partial | Footer | MasterBrand Blue | `{25710D2C-40D1-4612-AC33-A6C14068C9C1}` |
| 1 | Hero | MasterBrand Blue | `{DEE1ED82-FAA5-481C-9811-EF7D91746EF1}` |
| 2–5 | Four Column CTA (rows) | MasterBrand Blue | `{FDE8A647-9264-45A6-A930-5697C20DF654}` |

Delivery also path-detects `/Our-Cabinet-Brands` so the blue chrome and cabinet cards render even if FieldNames still show BrandPortfolio/Default. Brand card titles map to Content Hub logos via `src/lib/cabinet-brand-logos.ts`.

## Explore More

Brand Portfolio card Link4 → internal `{890948B1-82E9-4B25-BF2C-E8BAEF6FFDE3}` (`/Our-Cabinet-Brands`).
