# Manual Tasks — KTS Law

## 1. Set Headless Variants (required)

See `variant-checklist.md`. After FE deploy, set each Home rendering to the listed **KTS** / **KTSInsights** / **KTSOffices** variant.

## 2. Reorder Home sections (required)

Current assembly order is messy (Parallax too early; leftover PLAY! components still present). Target top-to-bottom:

1. Hero  
2. Three Column CTA (pillars)  
3. Promo CTA (attorney search)  
4. Heading CTA  
5. Three Column CTA (insights)  
6. CTA Banner (marquee)  
7. Parallax Banner  
8. Promo CTA (offices)  

Drag components in Pages to match.

## 3. Remove leftover PLAY! components (required)

Delete from Home (keep only the 8 KTS sections above):

- Carousel  
- Five Column CTA  
- Promo CTA 2  
- Two Column CTA  
- Article List  
- Documents List  
- App Promo  

## 4. Header / Footer partials (required)

Header and Footer live on the partial design, not the page body.

1. Open the site partial design that owns Header/Footer.  
2. Set Header variant → **KTS** (white bar, logo left).  
3. Set Footer variant → **KTS** (solid red).  
4. Replace logo media with Kilpatrick lockup if still PLAY! branding (`84061-logo` in Content Hub).

## 5. Deploy FE before preview

Pixel-perfect styles live in `industry-verticals/kts` (`_kts.scss`, theme CSS vars, Outfit font). Deploy / run the kts rendering host before judging the live preview.
