'use client';

import { JSX, useMemo, useState } from 'react';
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

interface AthleteCardFields {
  AthleteName?: Field<string>;
  Country?: Field<string>;
  LetterGroup?: Field<string>;
  ProfileLink?: LinkField;
  Photo?: ImageField;
}

export type AthleteCardItem = {
  fields: AthleteCardFields;
  name: string;
  url: string;
};

interface DirectoryFields {
  SectionTitle?: Field<string>;
  ActiveCount?: Field<string>;
  SearchPlaceholder?: Field<string>;
  items?: AthleteCardItem[];
}

export type LpgaAthleteDirectoryProps = ComponentProps & {
  params: { [key: string]: string };
  fields: DirectoryFields;
};

const BRAND = {
  primary: 'var(--brand-primary, #001E41)',
  white: '#ffffff',
  muted: 'var(--brand-muted-fg, #5A6872)',
  soft: '#F4F6F8',
  border: '#E2E6EA',
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const AthleteCard = ({
  item,
  isEditing,
}: {
  item: AthleteCardItem;
  isEditing: boolean;
}): JSX.Element => {
  const { AthleteName, Country, ProfileLink, Photo } = item.fields || {};
  const name = AthleteName?.value || '';
  const hasPhoto = Boolean(Photo?.value?.src);
  const content = (
    <div className="d-flex align-items-center gap-3 py-3">
      <div className="position-relative flex-shrink-0">
        <div
          className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
          style={{
            width: '4.5rem',
            height: '4.5rem',
            background: BRAND.soft,
            color: BRAND.primary,
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {hasPhoto || isEditing ? (
            <NextImage field={Photo} editable={isEditing} className="w-100 h-100" style={{ objectFit: 'cover' }} />
          ) : (
            <span aria-hidden="true">{getInitials(name)}</span>
          )}
        </div>
        <span
          className="position-absolute rounded-1"
          style={{
            right: 0,
            bottom: 0,
            width: '1.1rem',
            height: '0.75rem',
            background: BRAND.primary,
            border: `2px solid ${BRAND.white}`,
          }}
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0 flex-grow-1">
        {(name || isEditing) && (
          <Text
            field={AthleteName}
            tag="div"
            className="fw-bold text-truncate"
            style={{ color: BRAND.primary, fontSize: '1.05rem', lineHeight: 1.2 }}
          />
        )}
        {(Country?.value || isEditing) && (
          <Text field={Country} tag="div" className="small" style={{ color: BRAND.muted }} />
        )}
        <span className="d-inline-block mt-1" style={{ color: BRAND.muted, fontSize: '0.85rem' }} aria-hidden="true">
          ★
        </span>
      </div>
    </div>
  );

  if (ProfileLink && (ProfileLink.value?.href || isEditing)) {
    return (
      <Link field={ProfileLink} className="text-decoration-none d-block">
        {content}
      </Link>
    );
  }

  return content;
};

const LpgaAthleteDirectoryView = (props: LpgaAthleteDirectoryProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const [query, setQuery] = useState('');

  const fields = normalizeLpgaListFields<DirectoryFields>(
    props.fields,
    {
      SectionTitle: 'sectionTitle',
      ActiveCount: 'activeCount',
      SearchPlaceholder: 'searchPlaceholder',
    },
    {
      AthleteName: 'athleteName',
      Country: 'country',
      LetterGroup: 'letterGroup',
      ProfileLink: 'profileLink',
      Photo: 'photo',
    }
  );

  const athletes = (fields.items || []).filter((item) => item.name !== 'Data');

  const grouped = useMemo(() => {
    const filtered = athletes.filter((item) => {
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      const name = item.fields?.AthleteName?.value?.toLowerCase() || '';
      const country = item.fields?.Country?.value?.toLowerCase() || '';
      return name.includes(q) || country.includes(q);
    });

    const map = new Map<string, AthleteCardItem[]>();
    filtered.forEach((item) => {
      const letter =
        (item.fields?.LetterGroup?.value || item.fields?.AthleteName?.value || '?').trim().charAt(0).toUpperCase() ||
        '?';
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(item);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [athletes, query]);

  return (
    <div
      className={`component lpga-athlete-directory ${sxaStyles}`}
      id={id || undefined}
      style={{ background: BRAND.white, fontFamily: "var(--brand-body-font, 'Figtree', sans-serif)" }}
    >
      <div style={{ background: BRAND.primary, color: BRAND.white, padding: '2.5rem 1.25rem 2rem' }}>
        <div className="container">
          {(fields.SectionTitle?.value || isEditing) && (
            <Text
              field={fields.SectionTitle}
              tag="h1"
              className="mb-0"
              style={{
                fontFamily: "var(--brand-display-font, 'Roboto Serif', Georgia, serif)",
                fontWeight: 600,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            />
          )}
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex align-items-center gap-2 mb-3" style={{ maxWidth: '28rem' }}>
          <label className="visually-hidden" htmlFor="lpga-athlete-search">
            Search athletes
          </label>
          <input
            id="lpga-athlete-search"
            type="search"
            className="form-control"
            placeholder={fields.SearchPlaceholder?.value || 'Search...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderColor: BRAND.border, borderRadius: '0.35rem' }}
          />
        </div>
        {(fields.ActiveCount?.value || isEditing) && (
          <Text
            field={fields.ActiveCount}
            tag="p"
            className="text-uppercase fw-semibold mb-4"
            style={{ color: BRAND.muted, letterSpacing: '0.06em', fontSize: '0.8rem' }}
          />
        )}

        {grouped.map(([letter, items]) => (
          <section key={letter} className="mb-4">
            <div
              className="d-flex align-items-center gap-3 mb-2"
              style={{ borderBottom: `1px solid ${BRAND.border}`, paddingBottom: '0.35rem' }}
            >
              <span style={{ color: BRAND.primary, fontWeight: 700, fontSize: '1.5rem' }}>{letter}</span>
            </div>
            <div className="row g-3">
              {items.map((item) => (
                <div key={item.url || item.name} className="col-12 col-md-6 col-lg-4">
                  <AthleteCard item={item} isEditing={isEditing} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {grouped.length === 0 && (
          <p style={{ color: BRAND.muted }}>No athletes match your search.</p>
        )}
      </div>
    </div>
  );
};

export const Lpga = LpgaAthleteDirectoryView;
export const Default = LpgaAthleteDirectoryView;
