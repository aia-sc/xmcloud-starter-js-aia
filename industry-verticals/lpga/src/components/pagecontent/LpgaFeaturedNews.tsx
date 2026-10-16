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
  Summary?: Field<string>;
  ItemLink?: LinkField;
  ItemImage?: ImageField;
}

export type FeaturedNewsItem = {
  fields: NewsItemFields;
  name: string;
  url: string;
};

interface FeaturedNewsFields {
  SectionTitle?: Field<string>;
  FeaturedHeadline?: Field<string>;
  FeaturedSummary?: RichTextField;
  FeaturedImage?: ImageField;
  FeaturedLink?: LinkField;
  items?: FeaturedNewsItem[];
}

export type LpgaFeaturedNewsProps = ComponentProps & {
  params: { [key: string]: string };
  fields: FeaturedNewsFields;
};

const BRAND = {
  primary: 'var(--brand-primary, #001E41)',
  accent: 'var(--brand-accent, #C8FF00)',
  white: '#ffffff',
  muted: 'var(--brand-muted-fg, #5A6872)',
};

const LpgaFeaturedNewsView = (props: LpgaFeaturedNewsProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const fields = normalizeLpgaListFields<FeaturedNewsFields>(
    props.fields,
    {
      SectionTitle: 'sectionTitle',
      FeaturedHeadline: 'featuredHeadline',
      FeaturedSummary: 'featuredSummary',
      FeaturedImage: 'featuredImage',
      FeaturedLink: 'featuredLink',
    },
    {
      Headline: 'headline',
      Summary: 'summary',
      ItemLink: 'itemLink',
      ItemImage: 'itemImage',
    }
  );
  const newsItems = (fields.items || []).filter((item) => item.name !== 'Data');

  return (
    <div
      className={`component lpga-featured-news ${sxaStyles}`}
      id={id || undefined}
      style={{
        background: 'var(--brand-bg, #ffffff)',
        color: 'var(--brand-fg, #171717)',
        fontFamily: "var(--brand-body-font, 'Figtree', sans-serif)",
      }}
    >
      <div className="container py-4 py-lg-5">
        {(fields.SectionTitle?.value || isEditing) && (
          <h2
            className="mb-4"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
              color: BRAND.primary,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            <Text field={fields.SectionTitle} />
          </h2>
        )}

        <div className="row g-0" style={{ minHeight: '22rem' }}>
          <div className="col-lg-7 col-xl-8 position-relative">
            <div
              className="position-relative h-100"
              style={{
                minHeight: '20rem',
                background: 'var(--brand-muted, #F4F6F8)',
                overflow: 'hidden',
              }}
            >
              {(fields.FeaturedImage?.value?.src || isEditing) && (
                <NextImage
                  field={fields.FeaturedImage}
                  width={960}
                  height={640}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', display: 'block', minHeight: '20rem' }}
                />
              )}
              <div
                className="position-absolute bottom-0 start-0 end-0 p-3 p-md-4"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 30, 65, 0.88) 0%, rgba(0, 30, 65, 0.45) 55%, transparent 100%)',
                  color: BRAND.white,
                }}
              >
                <h3
                  className="mb-2"
                  style={{
                    fontWeight: 800,
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
                    lineHeight: 1.2,
                    maxWidth: '36rem',
                  }}
                >
                  <Text field={fields.FeaturedHeadline} />
                </h3>
                {(fields.FeaturedSummary?.value || isEditing) && (
                  <div
                    className="mb-3"
                    style={{ fontSize: '0.9375rem', opacity: 0.92, maxWidth: '34rem' }}
                  >
                    <RichText field={fields.FeaturedSummary} />
                  </div>
                )}
                {(fields.FeaturedLink?.value?.href || isEditing) && (
                  <Link
                    field={fields.FeaturedLink}
                    className="text-decoration-none"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.55rem 1.1rem',
                      border: `1.5px solid ${BRAND.accent}`,
                      color: BRAND.white,
                      background: 'transparent',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      borderRadius: 'var(--brand-button-radius, 0.125rem)',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="col-lg-5 col-xl-4"
            style={{
              background: BRAND.primary,
              color: BRAND.white,
              padding: '1.5rem 1.25rem',
            }}
          >
            <div
              className="mb-3"
              style={{
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: BRAND.accent,
              }}
            >
              Top News
            </div>
            <ul className="list-unstyled mb-0">
              {newsItems.map((item, index) => {
                const { Headline, Summary, ItemLink } = item.fields || {};
                const isLast = index === newsItems.length - 1;
                const headlineContent = (
                  <span style={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.35 }}>
                    <Text field={Headline} />
                  </span>
                );

                return (
                  <li
                    key={item.url || item.name}
                    style={{
                      padding: '0.9rem 0',
                      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {(ItemLink?.value?.href || isEditing) && ItemLink ? (
                      <Link
                        field={ItemLink}
                        className="text-decoration-none d-block"
                        style={{ color: BRAND.white }}
                      >
                        {headlineContent}
                      </Link>
                    ) : (
                      headlineContent
                    )}
                    {(Summary?.value || isEditing) && (
                      <div
                        className="mt-1"
                        style={{ fontSize: '0.8125rem', opacity: 0.78, lineHeight: 1.4 }}
                      >
                        <Text field={Summary} />
                      </div>
                    )}
                  </li>
                );
              })}
              {newsItems.length === 0 && isEditing && (
                <li style={{ opacity: 0.7, fontSize: '0.875rem' }}>
                  Add news items via ComponentQuery
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Lpga = LpgaFeaturedNewsView;
export const Default = LpgaFeaturedNewsView;
