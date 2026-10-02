'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
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
}

export type TwoColumnCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    placeholder,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    placeholder: string;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    const buttonStyle = props.params?.ButtonStyle
      ? `button-${props.params.ButtonStyle.toLowerCase()}`
      : 'button-main';

    return (
      <div
        className={`col-sm-12 col-lg-6 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={800} height={800} />
          {(isPageEditing || title?.value) && (
            <h2>
              <Text field={title} />
            </h2>
          )}
          {(isPageEditing || text?.value) && (
            <p>
              <Text field={text} />
            </p>
          )}
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className={`button ${buttonStyle}`} />
          )}
          <Placeholder name={placeholder} rendering={props.rendering} />
        </div>
      </div>
    );
  };

  return (
    <div className={`component two-column-cta pb-5 ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
            placeholder="two-col-placeholder-left"
            delay={0}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            placeholder="two-col-placeholder-right"
            delay={500}
          />
        </div>
      </div>
    </div>
  );
};

/* MasterBrand variant — left overlay image+Title1/Link1; right muted panel Title2/Text2/Link2 */
export const MasterBrand = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component two-column-cta mb-two-col ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-two-col__overlay">
        <div className="mb-overlay-card">
          <div className="mb-overlay-card__media">
            <NextImage field={props.fields.Image1} width={900} height={700} />
          </div>
          <div className="mb-overlay-card__gradient" aria-hidden="true" />
          <div className="mb-overlay-card__content">
            <h2 className="mb-overlay-card__title">
              <Text field={props.fields.Title1} />
            </h2>
            {(isPageEditing || props.fields?.Link1?.value?.href) && (
              <Link field={props.fields.Link1} className="mb-link-underline mb-link-underline--white" />
            )}
          </div>
        </div>
      </div>
      <div className="mb-two-col__panel">
        <h2 className="mb-two-col__title">
          <Text field={props.fields.Title2} />
        </h2>
        {(isPageEditing || props.fields?.Text2?.value) && (
          <p className="mb-two-col__text">
            <Text field={props.fields.Text2} />
          </p>
        )}
        {(isPageEditing || props.fields?.Link2?.value?.href) && (
          <Link field={props.fields.Link2} className="mb-link-underline" />
        )}
      </div>
    </div>
  );
};
