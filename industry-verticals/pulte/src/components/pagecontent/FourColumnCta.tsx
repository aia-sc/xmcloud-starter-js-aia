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
import { isPulteSite, PulteMediaKey, resolvePulteImage } from 'lib/pulte-media';

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
  const pulte = isPulteSite(page.siteName);

  const t1 = (props.fields.Title1?.value || '').toLowerCase();
  const isCares = pulte && (t1.includes('veteran') || t1.includes('honor'));

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
            <NextImage field={image} width={480} height={320} />
            <div className="text-wrapper">
              <h2>
                <Text field={title} />
              </h2>
              <p>
                <Text field={text} />
              </p>
              {pulte &&
                (isCares ? (
                  <span className="pulte-text-link">Learn More</span>
                ) : (
                  <span className="pulte-learn-more">Learn More</span>
                ))}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const imageKeysForTitles = (): [PulteMediaKey, PulteMediaKey, PulteMediaKey, PulteMediaKey] => {
    if (isCares) {
      return ['caresVeterans', 'caresCommunity', 'caresSustainability', 'caresFoundation'];
    }
    return ['floorPlans', 'personalization', 'ease', 'quality'];
  };

  const [k1, k2, k3, k4] = imageKeysForTitles();
  const image = (key: PulteMediaKey, field: ImageField, alt: string) =>
    resolvePulteImage(page.siteName, field, key, alt, 640, 420);

  return (
    <div
      className={`component component-spaced four-column-cta ${
        isCares ? 'four-column-cta--cares' : ''
      } ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        {isCares && (
          <div className="heading-content-wrapper mx-auto text-center mb-4 mb-lg-5">
            <h2 className="display-4 fw-bold">Pulte Cares</h2>
            <p>As a true and caring neighbor, our company invests in our communities.</p>
          </div>
        )}
        <div className="row">
          <Column
            image={image(k1, props.fields.Image1, props.fields.Title1?.value || 'Pulte feature')}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            image={image(k2, props.fields.Image2, props.fields.Title2?.value || 'Pulte feature')}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={image(k3, props.fields.Image3, props.fields.Title3?.value || 'Pulte feature')}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={image(k4, props.fields.Image4, props.fields.Title4?.value || 'Pulte feature')}
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
