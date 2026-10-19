# LPGA Athletes — Directory + Profiles

Built from [Athlete Directory](https://www.lpga.com/athletes/directory) and [Saki Baba overview](https://www.lpga.com/athletes/saki-baba/101948/overview).

## Content tree

```
/sitecore/content/sports/lpga/Home/athletes          {4725822A-FB79-4562-953B-E0C7406C69F2}
  directory                                          {A3B0ADC6-1904-4392-B40F-584538CB4E5E}  → /athletes/directory
  brittany-altomare
  narin-an
  pajaree-anannarukarn
  aditi-ashok
  saki-baba                                          → full profile (screenshot match)
  jenny-bae
  laetitia-beck
  ana-belac
  jaravee-boonchant
  celine-borge
```

## Components

| React | Rendering ID | Kind |
|-------|--------------|------|
| `LpgaAthleteDirectory.tsx` | `{E56E26C8-E6A0-4694-AB4C-7ACF9742DDDD}` | list (10 athlete cards) |
| `LpgaAthleteProfile.tsx` | `{58174BEF-EA59-43F2-874A-F6548E7960EC}` | list (hero + stats + news children) |

## Datasources

- Directory: `/sitecore/content/sports/lpga/Data/LpgaAthleteDirectory/Athlete Directory`
- Profiles: `/sitecore/content/sports/lpga/Data/LpgaAthleteProfile/<Athlete Name>`

## Preview URLs (local)

- http://localhost:3000/athletes/directory
- http://localhost:3000/athletes/saki-baba
- http://localhost:3000/athletes/brittany-altomare
- …(same pattern for remaining 8 athletes)

## Content Hub headshots

10 directory headshots uploaded to Content Hub (`docs/ai/demos/lpga/images/athletes/image-manifest.json`) and wired into:

- Directory card `Photo` fields
- Profile `HeroImage` fields

| Athlete | Asset ID |
|---------|----------|
| Brittany Altomare | 84591 |
| Narin An | 84474 |
| Pajaree Anannarukarn | 84479 |
| Aditi Ashok | 84484 |
| Saki Baba | 84495 |
| Jenny Bae | 84502 |
| Laetitia Beck | 84509 |
| Ana Belac | 84521 |
| Jaravee Boonchant | 84529 |
| Celine Borge | 84537 |

## Notes

- Saki Baba profile includes CME/Rolex ranks, full stats, and 2 news items from the screenshot.
- Other athlete profiles have name/country/bio stubs ready for richer stats later.
