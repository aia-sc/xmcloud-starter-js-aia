import { ImageField } from '@sitecore-content-sdk/nextjs';
import { getSiteThemeClass } from 'lib/site-theme';

export const PULTE_MEDIA = {
  logoWhite: '/pulte/logo-white.svg',
  logoColor: '/pulte/logo-color.png',
  hero: '/pulte/hero-family.jpg',
  floorPlans: '/pulte/card-floorplans.jpg',
  personalization: '/pulte/card-personalization.jpg',
  ease: '/pulte/card-ease.jpg',
  quality: '/pulte/card-quality.jpg',
  caresVeterans: '/pulte/cares-veterans.jpg',
  caresCommunity: '/pulte/cares-community.jpg',
  caresSustainability: '/pulte/cares-sustainability.jpg',
  caresFoundation: '/pulte/cares-foundation.jpg',
  livingEnergy: '/pulte/living-energy.jpg',
  livingMoveIn: '/pulte/living-movein.jpg',
  livingQuestions: '/pulte/living-questions.jpg',
} as const;

export type PulteMediaKey = keyof typeof PULTE_MEDIA;

export function isPulteSite(siteName: string | undefined): boolean {
  return getSiteThemeClass(siteName) === 'site-pulte';
}

export function pulteImageField(
  key: PulteMediaKey,
  alt: string,
  width = 1200,
  height = 800
): ImageField {
  return {
    value: {
      src: PULTE_MEDIA[key],
      alt,
      width: String(width),
      height: String(height),
    },
  };
}

/** Prefer Pulte static assets on the pulte site so homepage imagery matches the screenshot. */
export function resolvePulteImage(
  siteName: string | undefined,
  field: ImageField | undefined,
  key: PulteMediaKey,
  alt: string,
  width = 1200,
  height = 800
): ImageField {
  if (isPulteSite(siteName)) {
    return pulteImageField(key, alt, width, height);
  }
  return field ?? { value: {} };
}
