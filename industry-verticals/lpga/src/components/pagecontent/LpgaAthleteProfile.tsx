'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  RichText,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { normalizeLpgaListFields } from 'lib/lpga-graphql-fields';

interface NewsItemFields {
  Headline?: Field<string>;
  Meta?: Field<string>;
  ItemLink?: LinkField;
  ItemImage?: ImageField;
  ContentType?: Field<string>;
}

export type AthleteNewsItem = {
  fields: NewsItemFields;
  name: string;
  url: string;
};

interface ProfileFields {
  AthleteName?: Field<string>;
  Country?: Field<string>;
  RookieLabel?: Field<string>;
  Bio?: RichTextField;
  HeroImage?: ImageField;
  CmeRank?: Field<string>;
  RolexRank?: Field<string>;
  CareerWins?: Field<string>;
  SeasonWins?: Field<string>;
  CareerEarnings?: Field<string>;
  OfficialYtd?: Field<string>;
  CareerTop10s?: Field<string>;
  SeasonTop10s?: Field<string>;
  CareerTop25?: Field<string>;
  SeasonTop25?: Field<string>;
  FavoriteLabel?: Field<string>;
  items?: AthleteNewsItem[];
}

export type LpgaAthleteProfileProps = ComponentProps & {
  params: { [key: string]: string };
  fields: ProfileFields;
};

const BRAND = {
  primary: 'var(--brand-primary, #001E41)',
  accent: 'var(--brand-accent, #C8FF00)',
  white: '#ffffff',
  muted: 'var(--brand-muted-fg, #5A6872)',
  soft: '#F4F6F8',
  border: '#E2E6EA',
};

const Stat = ({
  value,
  label,
  isEditing,
}: {
  value?: Field<string>;
  label: string;
  isEditing: boolean;
}): JSX.Element | null => {
  if (!value?.value && !isEditing) return null;
  return (
    <div className="col-6 col-md-3 py-3">
      <Text
        field={value}
        tag="div"
        className="fw-bold"
        style={{ color: BRAND.primary, fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.1 }}
      />
      <div
        className="text-uppercase mt-1"
        style={{ color: BRAND.muted, fontSize: '0.7rem', letterSpacing: '0.05em', fontWeight: 600 }}
      >
        {label}
      </div>
    </div>
  );
};

const LpgaAthleteProfileView = (props: LpgaAthleteProfileProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const fields = normalizeLpgaListFields<ProfileFields>(
    props.fields,
    {
      AthleteName: 'athleteName',
      Country: 'country',
      RookieLabel: 'rookieLabel',
      Bio: 'bio',
      HeroImage: 'heroImage',
      CmeRank: 'cmeRank',
      RolexRank: 'rolexRank',
      CareerWins: 'careerWins',
      SeasonWins: 'seasonWins',
      CareerEarnings: 'careerEarnings',
      OfficialYtd: 'officialYtd',
      CareerTop10s: 'careerTop10s',
      SeasonTop10s: 'seasonTop10s',
      CareerTop25: 'careerTop25',
      SeasonTop25: 'seasonTop25',
      FavoriteLabel: 'favoriteLabel',
    },
    {
      Headline: 'headline',
      Meta: 'meta',
      ItemLink: 'itemLink',
      ItemImage: 'itemImage',
      ContentType: 'contentType',
    }
  );

  const newsItems = (fields.items || []).filter((item) => item.name !== 'Data');
  const hasHero = Boolean(fields.HeroImage?.value?.src);

  return (
    <div
      className={`component lpga-athlete-profile ${sxaStyles}`}
      id={id || undefined}
      style={{ background: BRAND.white, fontFamily: "var(--brand-body-font, 'Figtree', sans-serif)" }}
    >
      <section
        className="position-relative overflow-hidden"
        style={{ background: BRAND.primary, color: BRAND.white, minHeight: '22rem' }}
      >
        <div className="container position-relative" style={{ zIndex: 2, paddingTop: '3rem', paddingBottom: '5rem' }}>
          <div className="row align-items-end">
            <div className="col-lg-7">
              {(fields.Country?.value || isEditing) && (
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span
                    className="rounded-1"
                    style={{ width: '1.25rem', height: '0.85rem', background: BRAND.accent, display: 'inline-block' }}
                    aria-hidden="true"
                  />
                  <Text
                    field={fields.Country}
                    tag="span"
                    className="text-uppercase fw-semibold"
                    style={{ letterSpacing: '0.08em', fontSize: '0.8rem' }}
                  />
                </div>
              )}
              {(fields.AthleteName?.value || isEditing) && (
                <Text
                  field={fields.AthleteName}
                  tag="h1"
                  className="mb-2"
                  style={{
                    fontFamily: "var(--brand-display-font, 'Roboto Serif', Georgia, serif)",
                    fontWeight: 600,
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    lineHeight: 1.05,
                  }}
                />
              )}
              {(fields.RookieLabel?.value || isEditing) && (
                <Text
                  field={fields.RookieLabel}
                  tag="p"
                  className="mb-0 text-uppercase"
                  style={{ letterSpacing: '0.08em', fontSize: '0.85rem', opacity: 0.9 }}
                />
              )}
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              {(hasHero || isEditing) && (
                <div
                  className="ms-lg-auto"
                  style={{
                    maxWidth: '22rem',
                    borderRadius: '0.25rem',
                    overflow: 'hidden',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                  }}
                >
                  <NextImage
                    field={fields.HeroImage}
                    editable={isEditing}
                    className="w-100 h-auto"
                    style={{ display: 'block', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 3 }}>
        <div className="row g-3">
          {(fields.CmeRank?.value || isEditing) && (
            <div className="col-md-6 col-lg-4">
              <div className="bg-white p-3 shadow-sm" style={{ borderRadius: '0.25rem' }}>
                <div className="small text-uppercase fw-semibold mb-1" style={{ color: BRAND.muted }}>
                  Race to CME Globe
                </div>
                <Text field={fields.CmeRank} tag="div" className="fw-bold" style={{ color: BRAND.primary, fontSize: '2rem' }} />
              </div>
            </div>
          )}
          {(fields.RolexRank?.value || isEditing) && (
            <div className="col-md-6 col-lg-4">
              <div className="bg-white p-3 shadow-sm" style={{ borderRadius: '0.25rem' }}>
                <div className="small text-uppercase fw-semibold mb-1" style={{ color: BRAND.muted }}>
                  Rolex Rankings
                </div>
                <Text field={fields.RolexRank} tag="div" className="fw-bold" style={{ color: BRAND.primary, fontSize: '2rem' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
          {(fields.Bio?.value || isEditing) && (
            <RichText
              field={fields.Bio}
              className="mb-0"
              style={{
                fontFamily: "var(--brand-display-font, 'Roboto Serif', Georgia, serif)",
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                color: BRAND.primary,
                maxWidth: '40rem',
                lineHeight: 1.35,
              }}
            />
          )}
          {(fields.FavoriteLabel?.value || isEditing) && (
            <span
              className="d-inline-flex align-items-center gap-2 px-3 py-2"
              style={{
                border: `1px solid ${BRAND.border}`,
                borderRadius: '999px',
                color: BRAND.primary,
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              ★ <Text field={fields.FavoriteLabel} tag="span" />
            </span>
          )}
        </div>

        <div className="mb-4" style={{ borderBottom: `2px solid ${BRAND.primary}`, maxWidth: '6rem', paddingBottom: '0.35rem' }}>
          <span className="fw-bold" style={{ color: BRAND.primary }}>
            Overview
          </span>
        </div>

        <div className="row border-top border-bottom mb-5" style={{ borderColor: BRAND.border }}>
          <Stat value={fields.CareerWins} label="Career Wins" isEditing={isEditing} />
          <Stat value={fields.SeasonWins} label="Wins" isEditing={isEditing} />
          <Stat value={fields.CareerEarnings} label="Official Career Earnings" isEditing={isEditing} />
          <Stat value={fields.OfficialYtd} label="Official YTD" isEditing={isEditing} />
          <Stat value={fields.CareerTop10s} label="Career Top 10s" isEditing={isEditing} />
          <Stat value={fields.SeasonTop10s} label="Top 10s" isEditing={isEditing} />
          <Stat value={fields.CareerTop25} label="Career Top 25 Finishes" isEditing={isEditing} />
          <Stat value={fields.SeasonTop25} label="Top 25 Finishes" isEditing={isEditing} />
        </div>

        {(newsItems.length > 0 || isEditing) && (
          <section>
            <h2
              className="text-uppercase mb-4"
              style={{ color: BRAND.primary, fontSize: '0.85rem', letterSpacing: '0.08em', fontWeight: 700 }}
            >
              News & Video
            </h2>
            <div className="row g-4">
              {newsItems.map((item) => {
                const { Headline, Meta, ItemLink, ItemImage, ContentType } = item.fields || {};
                const card = (
                  <div
                    className="d-flex gap-3 p-3 h-100"
                    style={{ background: BRAND.soft, borderRadius: '0.35rem' }}
                  >
                    {(ItemImage?.value?.src || isEditing) && (
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{ width: '7.5rem', height: '5rem', borderRadius: '0.25rem', background: BRAND.border }}
                      >
                        <NextImage
                          field={ItemImage}
                          editable={isEditing}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      {(ContentType?.value || isEditing) && (
                        <Text
                          field={ContentType}
                          tag="div"
                          className="text-uppercase small mb-1"
                          style={{ color: BRAND.muted, letterSpacing: '0.05em' }}
                        />
                      )}
                      {(Headline?.value || isEditing) && (
                        <Text
                          field={Headline}
                          tag="div"
                          className="fw-semibold"
                          style={{ color: BRAND.primary, lineHeight: 1.3 }}
                        />
                      )}
                      {(Meta?.value || isEditing) && (
                        <Text field={Meta} tag="div" className="small mt-1" style={{ color: BRAND.muted }} />
                      )}
                    </div>
                  </div>
                );

                return (
                  <div key={item.url || item.name} className="col-md-6">
                    {ItemLink && (ItemLink.value?.href || isEditing) ? (
                      <Link field={ItemLink} className="text-decoration-none d-block h-100">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export const Lpga = LpgaAthleteProfileView;
export const Default = LpgaAthleteProfileView;
