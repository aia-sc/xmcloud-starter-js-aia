'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';
import { PulteMediaKey, resolvePulteImage } from 'lib/pulte-media';

interface Fields {
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
  Text5: Field<string>;
  Image5: ImageField;
  Link5: LinkField;
}

export type FiveColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const MARKET_IMAGES: PulteMediaKey[] = [
  'floorPlans',
  'personalization',
  'ease',
  'quality',
  'hero',
];

export const Default = (props: FiveColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const image = (key: PulteMediaKey, field: ImageField, alt: string) =>
    resolvePulteImage(page.siteName, field, key, alt, 400, 300);

  const Column = ({
    imageField,
    text,
    link,
    delay,
  }: {
    imageField: ImageField;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col ${!isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''} `}
        ref={domRef}
      >
        <Link field={link}>
          <div className="image-container">
            <NextImage field={imageField} className="d-block w-100 h-100" width={200} height={200} />
          </div>
        </Link>
        <div className="text-container">
          <Text field={text} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced five-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-gap-3 gx-5 justify-content-center">
          <Column
            imageField={image(MARKET_IMAGES[0], props.fields.Image1, props.fields.Text1?.value || '')}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            imageField={image(MARKET_IMAGES[1], props.fields.Image2, props.fields.Text2?.value || '')}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={200}
          />
          <Column
            imageField={image(MARKET_IMAGES[2], props.fields.Image3, props.fields.Text3?.value || '')}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={400}
          />
          <Column
            imageField={image(MARKET_IMAGES[3], props.fields.Image4, props.fields.Text4?.value || '')}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={600}
          />
          <Column
            imageField={image(MARKET_IMAGES[4], props.fields.Image5, props.fields.Text5?.value || '')}
            text={props.fields.Text5}
            link={props.fields.Link5}
            delay={800}
          />
        </div>
      </div>
    </div>
  );
};
