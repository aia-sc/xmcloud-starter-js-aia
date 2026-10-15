'use client';

import { JSX } from 'react';
import { Field, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  VideoTitle1: Field<string>;
  VideoUrl1: Field<string>;
  VideoTitle2: Field<string>;
  VideoUrl2: Field<string>;
  VideoTitle3: Field<string>;
  VideoUrl3: Field<string>;
  VideoTitle4: Field<string>;
  VideoUrl4: Field<string>;
}

type VideoProps = ComponentProps & { fields: Fields };

const videos = [1, 2, 3, 4] as const;

const ErlangerVideoGridView = (props: VideoProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component erlanger-home erlanger-video ${props.params?.styles || ''}`} id={id || undefined}>
      {(props.fields?.Title?.value || isEditing) && (
        <h2>
          <Text field={props.fields.Title} />
        </h2>
      )}
      <div className="erlanger-video__grid">
        {videos.map((index) => {
          const title = props.fields?.[`VideoTitle${index}` as keyof Fields] as Field<string>;
          const url = props.fields?.[`VideoUrl${index}` as keyof Fields] as Field<string>;
          if (!url?.value && !isEditing) return null;
          return (
            <div className="erlanger-video__frame" key={index}>
              {url?.value && !isEditing ? (
                <iframe
                  src={url.value}
                  title={title?.value || `Erlanger video ${index}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Text field={url} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const Default = ErlangerVideoGridView;
export const Erlanger = ErlangerVideoGridView;
