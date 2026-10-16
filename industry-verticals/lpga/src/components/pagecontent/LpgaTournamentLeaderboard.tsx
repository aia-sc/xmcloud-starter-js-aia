'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { normalizeLpgaListFields } from 'lib/lpga-graphql-fields';

interface PlayerFields {
  Rank?: Field<string>;
  PlayerName?: Field<string>;
  Country?: Field<string>;
  TotalScore?: Field<string>;
  Thru?: Field<string>;
  PlayerPhoto?: ImageField;
  FavoriteLabel?: Field<string>;
}

export type LeaderboardPlayerItem = {
  fields: PlayerFields;
  name: string;
  url: string;
};

interface LeaderboardFields {
  SectionTitle?: Field<string>;
  Dates?: Field<string>;
  Location?: Field<string>;
  WeatherText?: Field<string>;
  PrimaryLink?: LinkField;
  SecondaryLink?: LinkField;
  items?: LeaderboardPlayerItem[];
}

export type LpgaTournamentLeaderboardProps = ComponentProps & {
  params: { [key: string]: string };
  fields: LeaderboardFields;
};

const BRAND = {
  primary: 'var(--brand-primary, #001E41)',
  accent: 'var(--brand-accent, #C8FF00)',
  white: '#ffffff',
  muted: 'var(--brand-muted-fg, #5A6872)',
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const PlayerCard = ({
  item,
  isEditing,
}: {
  item: LeaderboardPlayerItem;
  isEditing: boolean;
}): JSX.Element => {
  const { Rank, PlayerName, Country, TotalScore, Thru, PlayerPhoto, FavoriteLabel } =
    item.fields || {};
  const hasPhoto = Boolean(PlayerPhoto?.value?.src);
  const playerName = PlayerName?.value || '';

  return (
    <div
      className="flex-shrink-0"
      style={{
        width: '11.5rem',
        background: BRAND.white,
        borderRadius: 'var(--brand-card-radius, 0.5rem)',
        padding: '1rem 0.875rem 1.125rem',
        color: BRAND.primary,
        fontFamily: "var(--brand-body-font, 'Figtree', sans-serif)",
      }}
    >
      <div className="d-flex align-items-start justify-content-between mb-2">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '1.75rem',
            height: '1.75rem',
            padding: '0 0.35rem',
            background: BRAND.primary,
            color: BRAND.white,
            fontWeight: 700,
            fontSize: '0.8125rem',
            borderRadius: '0.125rem',
          }}
        >
          <Text field={Rank} />
        </span>
        {(Country?.value || isEditing) && (
          <span style={{ fontSize: '0.7rem', color: BRAND.muted, fontWeight: 600 }}>
            <Text field={Country} />
          </span>
        )}
      </div>

      <div className="d-flex justify-content-center mb-2">
        {hasPhoto || isEditing ? (
          <div
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--brand-muted, #F4F6F8)',
            }}
          >
            <NextImage
              field={PlayerPhoto}
              width={72}
              height={72}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            aria-hidden
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              background: 'var(--brand-muted, #F4F6F8)',
              color: BRAND.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.125rem',
            }}
          >
            {getInitials(playerName)}
          </div>
        )}
      </div>

      <div
        className="text-center mb-2"
        style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.25, minHeight: '2.25rem' }}
      >
        <Text field={PlayerName} />
      </div>

      <div className="d-flex justify-content-between mb-3" style={{ fontSize: '0.75rem' }}>
        <div>
          <div style={{ color: BRAND.muted, fontWeight: 600, letterSpacing: '0.04em' }}>TOT</div>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>
            <Text field={TotalScore} />
          </div>
        </div>
        <div className="text-end">
          <div style={{ color: BRAND.muted, fontWeight: 600, letterSpacing: '0.04em' }}>THRU</div>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>
            <Text field={Thru} />
          </div>
        </div>
      </div>

      {(FavoriteLabel?.value || isEditing) && (
        <button
          type="button"
          className="w-100"
          style={{
            border: `1px solid ${BRAND.primary}`,
            background: BRAND.white,
            color: BRAND.primary,
            borderRadius: '999px',
            padding: '0.35rem 0.75rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <Text field={FavoriteLabel} />
        </button>
      )}
    </div>
  );
};

const LpgaTournamentLeaderboardView = (props: LpgaTournamentLeaderboardProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const fields = normalizeLpgaListFields<LeaderboardFields>(
    props.fields,
    {
      SectionTitle: 'sectionTitle',
      Dates: 'dates',
      Location: 'location',
      WeatherText: 'weatherText',
      PrimaryLink: 'primaryLink',
      SecondaryLink: 'secondaryLink',
    },
    {
      Rank: 'rank',
      PlayerName: 'playerName',
      Country: 'country',
      TotalScore: 'totalScore',
      Thru: 'thru',
      PlayerPhoto: 'playerPhoto',
      FavoriteLabel: 'favoriteLabel',
    }
  );
  const players = (fields.items || []).filter((item) => item.name !== 'Data');

  return (
    <div
      className={`component lpga-tournament-leaderboard ${sxaStyles}`}
      id={id || undefined}
      style={{
        background: BRAND.primary,
        color: BRAND.white,
        fontFamily: "var(--brand-heading-font, 'Figtree', sans-serif)",
      }}
    >
      <div className="container py-4 py-lg-5">
        <div className="row row-gap-3 align-items-end mb-4">
          <div className="col-lg-7">
            <h2
              className="mb-2"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              <Text field={fields.SectionTitle} />
            </h2>
            <div
              className="d-flex flex-wrap column-gap-3 row-gap-1"
              style={{ fontSize: '0.875rem', opacity: 0.92 }}
            >
              {(fields.Dates?.value || isEditing) && (
                <span>
                  <Text field={fields.Dates} />
                </span>
              )}
              {(fields.Location?.value || isEditing) && (
                <span>
                  <Text field={fields.Location} />
                </span>
              )}
              {(fields.WeatherText?.value || isEditing) && (
                <span>
                  <Text field={fields.WeatherText} />
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              {(fields.PrimaryLink?.value?.href || isEditing) && (
                <Link
                  field={fields.PrimaryLink}
                  className="text-decoration-none"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.65rem 1.25rem',
                    border: `1.5px solid ${BRAND.white}`,
                    color: BRAND.white,
                    background: 'transparent',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--brand-button-radius, 0.125rem)',
                  }}
                />
              )}
              {(fields.SecondaryLink?.value?.href || isEditing) && (
                <Link
                  field={fields.SecondaryLink}
                  className="text-decoration-none"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.65rem 1.25rem',
                    border: `1.5px solid ${BRAND.accent}`,
                    color: BRAND.white,
                    background: 'transparent',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--brand-button-radius, 0.125rem)',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className="d-flex gap-3 pb-2"
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
          }}
        >
          {players.map((item) => (
            <PlayerCard key={item.url || item.name} item={item} isEditing={isEditing} />
          ))}
          {players.length === 0 && isEditing && (
            <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>
              Add player items via ComponentQuery
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Lpga = LpgaTournamentLeaderboardView;
export const Default = LpgaTournamentLeaderboardView;
