'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Title3: Field<string>;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Title4: Field<string>;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
}

export type FourColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-3 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <Link field={link}>
          <div className="content-wrapper">
            <NextImage field={image} width={300} height={300} />
            <div className="text-wrapper">
              <h2>
                <Text field={title} />
              </h2>
              <p>
                <Text field={text} />
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced four-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            title={props.fields.Title4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
        </div>
      </div>
    </div>
  );
};

/* MasterBrand variant — asymmetric masonry: text-under-image left, tall center, stacked right */
export const MasterBrand = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const OverlayCard = ({
    image,
    title,
    link,
    className,
  }: {
    image: ImageField;
    title: Field<string>;
    link: LinkField;
    className?: string;
  }) => (
    <div className={`mb-overlay-card ${className || ''}`}>
      <div className="mb-overlay-card__media">
        <NextImage field={image} width={800} height={800} />
      </div>
      <div className="mb-overlay-card__gradient" aria-hidden="true" />
      <div className="mb-overlay-card__content">
        <h2 className="mb-overlay-card__title">
          <Text field={title} />
        </h2>
        {(isPageEditing || link?.value?.href) && (
          <Link field={link} className="mb-link-underline mb-link-underline--white" />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`component component-spaced four-column-cta mb-masonry-wrap ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="mb-masonry">
        <div className="mb-masonry__left">
          <Link field={props.fields.Link1} className="mb-masonry__left-image">
            <NextImage field={props.fields.Image1} width={600} height={400} />
          </Link>
          <div className="mb-masonry__left-panel">
            <h2>
              <Text field={props.fields.Title1} />
            </h2>
            {(isPageEditing || props.fields.Text1?.value) && (
              <p>
                <Text field={props.fields.Text1} />
              </p>
            )}
            {(isPageEditing || props.fields?.Link1?.value?.href) && (
              <Link field={props.fields.Link1} className="mb-link-underline" />
            )}
          </div>
        </div>

        <OverlayCard
          className="mb-masonry__center"
          image={props.fields.Image2}
          title={props.fields.Title2}
          link={props.fields.Link2}
        />
        <OverlayCard
          className="mb-masonry__right-top"
          image={props.fields.Image3}
          title={props.fields.Title3}
          link={props.fields.Link3}
        />
        <OverlayCard
          className="mb-masonry__right-bottom"
          image={props.fields.Image4}
          title={props.fields.Title4}
          link={props.fields.Link4}
        />
      </div>
    </div>
  );
};
