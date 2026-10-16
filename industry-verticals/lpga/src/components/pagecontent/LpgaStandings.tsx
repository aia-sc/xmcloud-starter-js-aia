'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { normalizeLpgaListFields } from 'lib/lpga-graphql-fields';

interface StandingFields {
  PlayerName?: Field<string>;
  Rank?: Field<string>;
  Points?: Field<string>;
  Events?: Field<string>;
  Wins?: Field<string>;
  Top10?: Field<string>;
  PlayerPhoto?: ImageField;
  Side?: Field<string>;
}

export type StandingItem = {
  fields: StandingFields;
  name: string;
  url: string;
};

interface StandingsFields {
  SectionTitle?: Field<string>;
  LeftTitle?: Field<string>;
  RightTitle?: Field<string>;
  items?: StandingItem[];
}

export type LpgaStandingsProps = ComponentProps & {
  params: { [key: string]: string };
  fields: StandingsFields;
};

const BRAND = {
  primary: 'var(--brand-primary, #001E41)',
  accent: 'var(--brand-accent, #C8FF00)',
  white: '#ffffff',
  muted: 'var(--brand-muted-fg, #5A6872)',
  border: 'var(--brand-border, #D8DDE3)',
};

const getSide = (side?: Field<string>): 'left' | 'right' => {
  const value = (side?.value || '').toString().trim().toLowerCase();
  return value === 'right' ? 'right' : 'left';
};

const StandingRow = ({
  item,
  isEditing,
}: {
  item: StandingItem;
  isEditing: boolean;
}): JSX.Element => {
  const { Rank, PlayerName, Points, PlayerPhoto } = item.fields || {};
  const hasPhoto = Boolean(PlayerPhoto?.value?.src);

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{
        padding: '0.75rem 0',
        borderBottom: `1px solid ${BRAND.border}`,
      }}
    >
      <span
        style={{
          width: '2rem',
          fontWeight: 800,
          color: BRAND.primary,
          fontSize: '0.9375rem',
          flexShrink: 0,
        }}
      >
        #<Text field={Rank} />
      </span>

      {(hasPhoto || isEditing) && (
        <div
          style={{
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--brand-muted, #F4F6F8)',
            flexShrink: 0,
          }}
        >
          <NextImage
            field={PlayerPhoto}
            width={36}
            height={36}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="flex-grow-1" style={{ fontWeight: 600, color: BRAND.primary, minWidth: 0 }}>
        <Text field={PlayerName} />
      </div>

      <div
        className="text-end"
        style={{ fontWeight: 800, color: BRAND.primary, fontSize: '0.9375rem', flexShrink: 0 }}
      >
        <Text field={Points} />
      </div>
    </div>
  );
};

const StandingsCard = ({
  title,
  items,
  isEditing,
}: {
  title?: Field<string>;
  items: StandingItem[];
  isEditing: boolean;
}): JSX.Element => (
  <div
    style={{
      background: BRAND.white,
      border: `1px solid ${BRAND.border}`,
      borderRadius: 'var(--brand-card-radius, 0.5rem)',
      overflow: 'hidden',
      height: '100%',
    }}
  >
    <div
      style={{
        background: BRAND.primary,
        color: BRAND.white,
        padding: '0.9rem 1.25rem',
        fontWeight: 800,
        fontSize: '0.8125rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <Text field={title} />
    </div>
    <div style={{ padding: '0.25rem 1.25rem 0.75rem' }}>
      {items.map((item) => (
        <StandingRow key={item.url || item.name} item={item} isEditing={isEditing} />
      ))}
      {items.length === 0 && isEditing && (
        <div style={{ padding: '1rem 0', color: BRAND.muted, fontSize: '0.875rem' }}>
          Add standing items for this side
        </div>
      )}
    </div>
  </div>
);

const LpgaStandingsView = (props: LpgaStandingsProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const fields = normalizeLpgaListFields<StandingsFields>(
    props.fields,
    {
      SectionTitle: 'sectionTitle',
      LeftTitle: 'leftTitle',
      RightTitle: 'rightTitle',
    },
    {
      PlayerName: 'playerName',
      Rank: 'rank',
      Points: 'points',
      Events: 'events',
      Wins: 'wins',
      Top10: 'top10',
      PlayerPhoto: 'playerPhoto',
      Side: 'side',
    }
  );
  const allItems = fields.items?.filter((item) => item.name !== 'Data') || [];
  const leftItems = allItems.filter((item) => getSide(item.fields?.Side) === 'left');
  const rightItems = allItems.filter((item) => getSide(item.fields?.Side) === 'right');

  return (
    <div
      className={`component lpga-standings ${sxaStyles}`}
      id={id || undefined}
      style={{
        background: 'var(--brand-bg, #ffffff)',
        fontFamily: "var(--brand-body-font, 'Figtree', sans-serif)",
      }}
    >
      <div className="container py-4 py-lg-5">
        {(fields.SectionTitle?.value || isEditing) && (
          <h2
            className="mb-4"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
              color: BRAND.primary,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            <Text field={fields.SectionTitle} />
          </h2>
        )}

        <div className="row g-4">
          <div className="col-lg-6">
            <StandingsCard title={fields.LeftTitle} items={leftItems} isEditing={isEditing} />
          </div>
          <div className="col-lg-6">
            <StandingsCard title={fields.RightTitle} items={rightItems} isEditing={isEditing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Lpga = LpgaStandingsView;
export const Default = LpgaStandingsView;
