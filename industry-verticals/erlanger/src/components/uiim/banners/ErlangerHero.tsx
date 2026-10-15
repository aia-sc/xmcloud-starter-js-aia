'use client';

import { CSSProperties, JSX } from 'react';
import {
  Field,
  ImageField,
  Link as ContentSdkLink,
  LinkField,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Tagline: Field<string>;
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  PrimaryLink: LinkField;
  CardTitle1: Field<string>;
  CardLink1: LinkField;
  CardTitle2: Field<string>;
  CardLink2: LinkField;
  CardTitle3: Field<string>;
  CardLink3: LinkField;
  CardTitle4: Field<string>;
  CardLink4: LinkField;
}

type HeroProps = ComponentProps & { fields: Fields };

const cards = [1, 2, 3, 4] as const;

/** Content Hub public URL used when Edge has not published the Image field yet. */
const HERO_IMAGE_FALLBACK =
  'https://aia-verticals.sitecoresandbox.cloud/api/public/content/84102-hero-banner?v=5ff67986';

const ErlangerHeroView = (props: HeroProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const imageSrc = props.fields?.Image?.value?.src || HERO_IMAGE_FALLBACK;
  const id = props.params?.RenderingIdentifier;

  return (
    <section
      className={`component erlanger-home erlanger-hero ${props.params?.styles || ''}`}
      id={id || undefined}
      style={imageSrc ? ({ '--hero-image': `url("${imageSrc}")` } as CSSProperties) : undefined}
    >
      <div className="erlanger-hero__shade" />
      <div className="erlanger-hero__inner">
        <div>
          {(props.fields?.Tagline?.value || isEditing) && (
            <p className="erlanger-hero__eyebrow">
              <Text field={props.fields.Tagline} />
            </p>
          )}
          {(props.fields?.Title?.value || isEditing) && (
            <h1>
              <Text field={props.fields.Title} />
            </h1>
          )}
          {(props.fields?.Text?.value || isEditing) && (
            <div className="erlanger-hero__text">
              <RichText field={props.fields.Text} />
            </div>
          )}
          {(props.fields?.PrimaryLink?.value?.href || isEditing) && (
            <ContentSdkLink field={props.fields.PrimaryLink} className="erlanger-gold-link-light" />
          )}
        </div>
        <div className="erlanger-hero__cards">
          {cards.map((index) => {
            const title = props.fields?.[`CardTitle${index}` as keyof Fields] as Field<string>;
            const link = props.fields?.[`CardLink${index}` as keyof Fields] as LinkField;
            if (!title?.value && !link?.value?.href && !isEditing) return null;
            return (
              <ContentSdkLink key={index} field={link} className="erlanger-hero__card">
                <h5>
                  <Text field={title} /> <span aria-hidden="true">›</span>
                </h5>
                <span className="erlanger-gold-link">{link?.value?.text || 'Learn More'}</span>
              </ContentSdkLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Default = ErlangerHeroView;
export const Erlanger = ErlangerHeroView;
