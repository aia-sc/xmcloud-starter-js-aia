'use client';

import { JSX, useState } from 'react';
import { Field, RichText, RichTextField, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  ItemTitle1: Field<string>;
  ItemContent1: RichTextField;
  ItemTitle2: Field<string>;
  ItemContent2: RichTextField;
  ItemTitle3: Field<string>;
  ItemContent3: RichTextField;
}

type VisitProps = ComponentProps & { fields: Fields };
const items = [1, 2, 3] as const;

const VisitItem = ({
  title,
  content,
  isEditing,
}: {
  title: Field<string>;
  content: RichTextField;
  isEditing: boolean;
}): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  if (!title?.value && !isEditing) return null;
  return (
    <div className="erlanger-visit__item">
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <h3>
          <Text field={title} />
        </h3>
      </button>
      {(isOpen || isEditing) && <RichText field={content} />}
    </div>
  );
};

const ErlangerVisitView = (props: VisitProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component erlanger-home erlanger-visit ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="erlanger-visit__inner">
        <div>
          {(props.fields?.Title?.value || isEditing) && (
            <h2>
              <Text field={props.fields.Title} />
            </h2>
          )}
          {(props.fields?.Text?.value || isEditing) && <RichText field={props.fields.Text} />}
        </div>
        <div>
          {items.map((index) => (
            <VisitItem
              key={index}
              title={props.fields?.[`ItemTitle${index}` as keyof Fields] as Field<string>}
              content={props.fields?.[`ItemContent${index}` as keyof Fields] as RichTextField}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Default = ErlangerVisitView;
export const Erlanger = ErlangerVisitView;
