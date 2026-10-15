'use client';

import { JSX } from 'react';
import { Field, Link as ContentSdkLink, LinkField, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Value1: Field<string>;
  Label1: Field<string>;
  Text1: Field<string>;
  Link1: LinkField;
  Value2: Field<string>;
  Label2: Field<string>;
  Text2: Field<string>;
  Link2: LinkField;
  Value3: Field<string>;
  Label3: Field<string>;
  Text3: Field<string>;
  Link3: LinkField;
  Value4: Field<string>;
  Label4: Field<string>;
  Text4: Field<string>;
  Link4: LinkField;
}

type StatsProps = ComponentProps & { fields: Fields };
const stats = [1, 2, 3, 4] as const;

const ErlangerStatsView = (props: StatsProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component erlanger-home erlanger-stats ${props.params?.styles || ''}`} id={id || undefined}>
      {(props.fields?.Title?.value || isEditing) && (
        <h2>
          <Text field={props.fields.Title} />
        </h2>
      )}
      <div className="erlanger-stats__grid">
        {stats.map((index) => {
          const value = props.fields?.[`Value${index}` as keyof Fields] as Field<string>;
          const label = props.fields?.[`Label${index}` as keyof Fields] as Field<string>;
          const text = props.fields?.[`Text${index}` as keyof Fields] as Field<string>;
          const link = props.fields?.[`Link${index}` as keyof Fields] as LinkField;
          if (!value?.value && !isEditing) return null;
          return (
            <article className="erlanger-stats__card" key={index}>
              <strong>
                <Text field={value} />
              </strong>
              <div>
                <h3>
                  <Text field={label} />
                </h3>
                <p>
                  <Text field={text} />
                </p>
                {(link?.value?.href || isEditing) && (
                  <ContentSdkLink field={link} className="erlanger-gold-link" />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export const Default = ErlangerStatsView;
export const Erlanger = ErlangerStatsView;
