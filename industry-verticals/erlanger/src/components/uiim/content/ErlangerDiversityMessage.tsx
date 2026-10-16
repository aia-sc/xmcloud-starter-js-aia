'use client';

import { JSX } from 'react';
import {
  Field,
  Link as ContentSdkLink,
  LinkField,
  RichText,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: RichTextField;
  PrimaryLink: LinkField;
  BackToTopText: Field<string>;
}

type DiversityProps = ComponentProps & { fields: Fields };

const ErlangerDiversityMessageView = (props: DiversityProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const id = props.params?.RenderingIdentifier;
  const backToTop = props.fields?.BackToTopText?.value || 'BACK TO TOP';

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className={`component erlanger-home erlanger-diversity ${props.params?.styles || ''}`}
      id={id || undefined}
    >
      <div className="erlanger-diversity__inner">
        {(props.fields?.Text?.value || isEditing) && (
          <div className="erlanger-diversity__copy">
            <RichText field={props.fields.Text} />
          </div>
        )}
        {(props.fields?.PrimaryLink?.value?.href || isEditing) && (
          <ContentSdkLink field={props.fields.PrimaryLink} className="erlanger-diversity__link" />
        )}
      </div>
      <div className="erlanger-diversity__topbar">
        <button type="button" onClick={handleBackToTop}>
          {backToTop}
          <span aria-hidden="true">▲</span>
        </button>
      </div>
    </section>
  );
};

export const Default = ErlangerDiversityMessageView;
export const Erlanger = ErlangerDiversityMessageView;
