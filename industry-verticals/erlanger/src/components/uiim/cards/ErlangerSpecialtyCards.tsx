'use client';

import { JSX } from 'react';
import {
  Field,
  Link as ContentSdkLink,
  LinkField,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Eyebrow: Field<string>;
  Title: Field<string>;
  Text: RichTextField;
  PrimaryLink: LinkField;
  CardTitle1: Field<string>;
  CardText1: Field<string>;
  CardLink1: LinkField;
  CardTitle2: Field<string>;
  CardText2: Field<string>;
  CardLink2: LinkField;
  CardTitle3: Field<string>;
  CardText3: Field<string>;
  CardLink3: LinkField;
  CardTitle4: Field<string>;
  CardText4: Field<string>;
  CardLink4: LinkField;
}

type SpecialtyProps = ComponentProps & { fields: Fields };
const cards = [1, 2, 3, 4] as const;

const ErlangerSpecialtyCardsView = (props: SpecialtyProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component erlanger-home erlanger-specialties ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="erlanger-specialties__inner">
        {(props.fields?.Eyebrow?.value || isEditing) && (
          <p className="erlanger-specialties__eyebrow">
            <Text field={props.fields.Eyebrow} />
          </p>
        )}
        {(props.fields?.Title?.value || isEditing) && (
          <h2>
            <Text field={props.fields.Title} />
          </h2>
        )}
        {(props.fields?.Text?.value || isEditing) && (
          <div className="erlanger-specialties__intro">
            <RichText field={props.fields.Text} />
          </div>
        )}
        <div className="erlanger-specialties__grid">
          {cards.map((index) => {
            const title = props.fields?.[`CardTitle${index}` as keyof Fields] as Field<string>;
            const text = props.fields?.[`CardText${index}` as keyof Fields] as Field<string>;
            const link = props.fields?.[`CardLink${index}` as keyof Fields] as LinkField;
            if (!title?.value && !isEditing) return null;
            return (
              <article className="erlanger-specialties__card" key={index}>
                <h3>
                  <Text field={title} />
                </h3>
                <p>
                  <Text field={text} />
                </p>
                {(link?.value?.href || isEditing) && (
                  <ContentSdkLink field={link} className="erlanger-gold-link" />
                )}
              </article>
            );
          })}
        </div>
        {(props.fields?.PrimaryLink?.value?.href || isEditing) && (
          <ContentSdkLink field={props.fields.PrimaryLink} className="erlanger-pill" />
        )}
      </div>
    </section>
  );
};

export const Default = ErlangerSpecialtyCardsView;
export const Erlanger = ErlangerSpecialtyCardsView;
