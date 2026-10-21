'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  useSitecore,
  Link,
  LinkField,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { usePathname } from 'next/navigation';
import { cabinetsHeroBackground } from 'lib/cabinet-brand-logos';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

export type AppPromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component hero ${sxaStyles}`} id={id ? id : undefined}>
      <picture>
        <NextImage field={props.fields.Image} className="" width={1920} height={400}></NextImage>
      </picture>
      <div className="container content-container">
        <div className="top-layout">
          <div className="title">
            <Text field={props.fields.Title} />
          </div>
          <div className="subtitle">
            <RichText field={props.fields.Text} />
          </div>
        </div>
        <div className="bottom-layout">
          <div className="btn-array">
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="button button-main mt-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* MasterBrand variant — full-bleed cover. Empty Title renders the image only (forest band). */
export const MasterBrand = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const imageOnly = !props.fields?.Title?.value;

  return (
    <div
      className={`component hero mb-hero ${imageOnly ? 'mb-hero--image-only' : ''} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="mb-hero__media">
        <NextImage field={props.fields.Image} className="" width={1920} height={1080} />
      </div>
      <div className="mb-hero__overlay" aria-hidden="true" />
      <div className="mb-hero__content">
        <h1 className="mb-hero__title">
          <Text field={props.fields.Title} />
        </h1>
        {(isPageEditing || props.fields?.Link?.value?.href) && (
          <Link field={props.fields.Link} className="mb-btn-ghost" />
        )}
      </div>
    </div>
  );
};

/* Brand Portfolio — centered page title over a fixed-height banner */
export const BrandPortfolio = (props: AppPromoProps): JSX.Element => {
  const pathname = usePathname() || '';
  if (/our-cabinet-brands/i.test(pathname)) {
    return <MasterBrandBlue {...props} />;
  }

  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component hero mb-hero mb-hero--portfolio ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-hero__media">
        <NextImage field={props.fields?.Image} className="" width={1920} height={500} />
      </div>
      <div className="mb-hero__overlay" aria-hidden="true" />
      <div className="mb-hero__content">
        <h1 className="mb-hero__title">
          <Text field={props.fields?.Title} />
        </h1>
      </div>
    </div>
  );
};

/* MasterBrand Blue — left-aligned title + intro on wood-grain hero image */
export const MasterBrandBlue = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const imageField = props.fields?.Image?.value?.src ? props.fields.Image : cabinetsHeroBackground;

  return (
    <div className={`component hero mb-hero mb-hero--cabinets ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-hero__media">
        <NextImage field={imageField} className="" width={1920} height={420} />
      </div>
      <div className="mb-hero__overlay" aria-hidden="true" />
      <div className="mb-hero__content mb-hero__content--left">
        <h1 className="mb-hero__title">
          <Text field={props.fields?.Title} />
        </h1>
        {(isPageEditing || props.fields?.Text?.value) && (
          <div className="mb-hero__subtitle">
            <RichText field={props.fields?.Text} />
          </div>
        )}
      </div>
    </div>
  );
};
