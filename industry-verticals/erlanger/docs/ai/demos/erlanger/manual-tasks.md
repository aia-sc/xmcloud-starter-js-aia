# Erlanger — Manual Tasks

Page: `/sitecore/content/medical/erlanger/Home`  
Local rendering host: http://localhost:3001

Work through these in Pages or Content Editor. The published page already shows the Erlanger layout.

## 1. Variant selection

Each Erlanger component exports `Default` and `Erlanger` as the same view, so the homepage looks correct without changing the variant. Select **Erlanger** in Pages only if you want the Design tab to match the build plan.

| Component | Set to |
|-----------|--------|
| Erlanger Header | Erlanger |
| Erlanger Hero | Erlanger |
| Erlanger Video Grid | Erlanger |
| Erlanger Specialty Cards | Erlanger |
| Erlanger Visit | Erlanger |
| Erlanger Research | Erlanger |
| Erlanger Stats | Erlanger |
| Erlanger Footer | Erlanger |

For each component: click it on the canvas, open the **Design** tab, and choose **Erlanger**.

## 2. Header and footer partials

The Erlanger header and footer are components on Home, not the site partials. The Header and Footer partials still contain the PLAY! Financial chrome. That chrome is hidden on the published page when an Erlanger section is present, and it still appears in editing mode.

- [ ] In the Header partial, remove or replace the PLAY! logo, financial navigation, and theme switcher.
- [ ] In the Footer partial, remove the PLAY! Finance footer.
- [ ] Header and footer link lists are in the React components (`ErlangerHeader.tsx`, `ErlangerFooter.tsx`). They are not Sitecore fields yet. Edit those files to change the links.

## 3. Link verification

These links go to the live Erlanger site. Change any that should stay inside the demo.

- [ ] Hero **LEARN MORE** — https://www.erlanger.org/
- [ ] Hero cards — Find a Doctor, Medical Services, Locations, MyChart
- [ ] Specialty cards and **View All Erlanger Medical Services** — https://www.erlanger.org/medical-services
- [ ] Visit accordion links — visitor information, parking, billing
- [ ] Research **Learn More** — https://www.erlanger.org/clinical-research
- [ ] Stats **Learn More** links — hospitals, medical services, primary care, clinical research
- [ ] Header and footer links — erlanger.org, erlangerfoundation.org, childrensaterlanger.org

## 4. Cleanup

These starter components are still on Home. They are hidden on the published page and visible in Pages. Remove each one: click the component, open the three-dot menu, choose **Remove**.

- [ ] Carousel
- [ ] Promo CTA (three instances)
- [ ] Five Column CTA
- [ ] Three Column CTA
- [ ] Two Column CTA
- [ ] Article List
- [ ] Documents List
- [ ] App Promo

The Next.js “1 Issue” badge from `ProfileWidget` is suppressed in development by not rendering that widget in `src/app/[site]/layout.tsx`.

## 5. Videos

The four homepage videos are YouTube embeds already stored on **Erlanger - Video Grid**. Do not download or upload the video files.

| Title | URL on the component |
|-------|----------------------|
| History of Firsts | https://www.youtube.com/embed/0zR4nAf5hFA |
| It's Our DNA | https://www.youtube.com/embed/AIeuh_t-MTk |
| Healthcare Forward | https://www.youtube.com/embed/ubD_ffp_YJ8 |
| We Are Erlanger | https://www.youtube.com/embed/IOHRe-l9Goc |

## 6. Images

All 14 homepage images are uploaded to Content Hub (`aia-verticals.sitecoresandbox.cloud`) and approved.

- Hero / research Image fields are set as **external** Content Hub public URLs (not DAM-linked).
- The React hero and research components also fall back to those public URLs if Experience Edge has not published the Image field yet.
- Header logo and footer badge use Content Hub public URLs in React.

### DAM provider error in Pages

If Pages shows **“The DAM provider cannot be shown”**, the XM Cloud ↔ Content Hub DAM connector is failing. That is unrelated to the asset itself (asset `84102` returns HTTP 200).

Do **not** use the DAM picker for this demo. Either:

1. Leave the Image field as the external URL already set on the datasource, or
2. In Content Editor, set Image to an external URL:  
   `https://aia-verticals.sitecoresandbox.cloud/api/public/content/84102-hero-banner?v=5ff67986`

Ask a system admin to repair the Content Hub DAM connector if you need in-Pages DAM browsing.

## 7. Personalization (optional)

Create extra datasource items under `/sitecore/content/medical/erlanger/Home/Data` when a section needs a segment-specific version.

| Component | Template |
|-----------|----------|
| Erlanger Hero | ErlangerHero |
| Erlanger Video Grid | ErlangerVideoGrid |
| Erlanger Specialty Cards | ErlangerSpecialtyCards |
| Erlanger Visit | ErlangerVisit |
| Erlanger Research | ErlangerResearch |
| Erlanger Stats | ErlangerStats |

Name them `Erlanger - <Component> - <Segment>`. In Pages, select the component, choose **Personalize**, add a condition, and assign that datasource.
