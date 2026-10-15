'use client';

import { JSX } from 'react';
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
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  PrimaryLink: LinkField;
}

type ResearchProps = ComponentProps & { fields: Fields };

/** Content Hub public URL used when Edge has not published the Image field yet. */
const RESEARCH_IMAGE_FALLBACK =
  'https://aia-verticals.sitecoresandbox.cloud/api/public/content/84141-section3-img5?v=1aa318ba';

const ErlangerResearchView = (props: ResearchProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const imageSrc = props.fields?.Image?.value?.src || RESEARCH_IMAGE_FALLBACK;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component erlanger-home erlanger-research ${props.params?.styles || ''}`} id={id || undefined}>
      <div
        className="erlanger-research__photo"
        style={imageSrc ? { backgroundImage: `url("${imageSrc}")` } : undefined}
      />
      <div className="erlanger-research__copy">
        {(props.fields?.Title?.value || isEditing) && (
          <h2>
            <Text field={props.fields.Title} />
          </h2>
        )}
        {(props.fields?.Text?.value || isEditing) && <RichText field={props.fields.Text} />}
        {(props.fields?.PrimaryLink?.value?.href || isEditing) && (
          <ContentSdkLink field={props.fields.PrimaryLink} className="erlanger-gold-link-light" />
        )}
      </div>
    </section>
  );
};

export const Default = ErlangerResearchView;
export const Erlanger = ErlangerResearchView;
