'use client';

import { JSX } from 'react';
import { ImageField, NextImage } from '@sitecore-content-sdk/nextjs';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

export type ImageItemProps = {
  fields: {
    Image: ImageField;
  };
  name: string;
  url: string;
};

export type ImageGalleryProps = {
  params: { [key: string]: string };
  fields: {
    items: ImageItemProps[];
  };
};

export const Default = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component image-gallery ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <DottedAccent className="dotted-accent-top" />
        <div className="image-gallery-grid">
          {images?.map((image) => (
            <div className="image-gallery-item" key={image.url}>
              <NextImage field={image.fields.Image} width={650} height={650} />
            </div>
          ))}
        </div>
        <DottedAccent className="dotted-accent-bottom" />
      </div>
    </div>
  );
};

/* MasterBrand variant — dark brand wall logo grid; no dotted accents */
export const MasterBrand = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;
  const title = props.params?.Title || props.params?.title;

  return (
    <div className={`component image-gallery mb-brand-wall ${sxaStyles}`} id={id ? id : undefined}>
      {title && <h2 className="mb-brand-wall__title">{title}</h2>}
      <div className="mb-brand-wall__grid">
        {images?.map((image) => (
          <div className="mb-brand-wall__logo" key={image.url || image.name}>
            <NextImage field={image.fields.Image} width={200} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};
