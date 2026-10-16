'use client';

import { CSSProperties, FormEvent, JSX, useMemo, useState } from 'react';
import {
  Field,
  ImageField,
  Link as ContentSdkLink,
  LinkField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Image: ImageField;
  SpecialtyLabel: Field<string>;
  ZipLabel: Field<string>;
  LastNameLabel: Field<string>;
  SpecialtyPlaceholder: Field<string>;
  SearchButtonText: Field<string>;
  SpecialtyOptions: Field<string>;
  LocationLink: LinkField;
}

type FindDoctorHeroProps = ComponentProps & { fields: Fields };

const HERO_IMAGE_FALLBACK = 'https://www.erlanger.org/assets/dist/img/fad-banner.jpeg';

const DEFAULT_SPECIALTIES = [
  'Addiction Counseling',
  'Adolescent Medicine',
  'Cardiology',
  'Emergency Medicine',
  'Family Medicine',
  'Gastroenterology',
  'Internal Medicine',
  'Neurology',
  'Orthopaedics',
  'Pediatrics',
  'Primary Care',
  'Surgery - General',
  'Urology',
  "Women's Health",
];

const ErlangerFindDoctorHeroView = (props: FindDoctorHeroProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const id = props.params?.RenderingIdentifier;
  const imageSrc = props.fields?.Image?.value?.src || HERO_IMAGE_FALLBACK;
  const [specialty, setSpecialty] = useState('');
  const [zip, setZip] = useState('');
  const [lastName, setLastName] = useState('');

  const specialties = useMemo(() => {
    const raw = props.fields?.SpecialtyOptions?.value?.trim();
    if (!raw) return DEFAULT_SPECIALTIES;
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }, [props.fields?.SpecialtyOptions?.value]);

  const specialtyPlaceholder = props.fields?.SpecialtyPlaceholder?.value || 'All Types';
  const searchLabel = props.fields?.SearchButtonText?.value || 'Search';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (specialty) params.set('specialty', specialty);
    if (zip) params.set('zip', zip);
    if (lastName) params.set('lastname', lastName);
    const query = params.toString();
    window.location.href = `https://www.erlanger.org/find-a-doctor${query ? `?${query}` : ''}`;
  };

  return (
    <section
      className={`component erlanger-home erlanger-fad-hero ${props.params?.styles || ''}`}
      id={id || undefined}
      style={imageSrc ? ({ '--fad-hero-image': `url("${imageSrc}")` } as CSSProperties) : undefined}
    >
      <div className="erlanger-fad-hero__shade" />
      <div className="erlanger-fad-hero__inner">
        {(props.fields?.Title?.value || isEditing) && (
          <h1>
            <Text field={props.fields.Title} />
          </h1>
        )}
        <form className="erlanger-fad-hero__form" onSubmit={handleSubmit}>
          <div className="erlanger-fad-hero__field">
            <label htmlFor="erlanger-fad-specialty">
              <Text field={props.fields?.SpecialtyLabel} />
            </label>
            <div className="erlanger-fad-hero__select-wrap">
              <select
                id="erlanger-fad-specialty"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                aria-label={specialtyPlaceholder}
              >
                <option value="">{specialtyPlaceholder}</option>
                {specialties.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {(props.fields?.LocationLink?.value?.href || isEditing) && (
              <ContentSdkLink field={props.fields.LocationLink} className="erlanger-fad-hero__location" />
            )}
          </div>
          <div className="erlanger-fad-hero__field">
            <label htmlFor="erlanger-fad-zip">
              <Text field={props.fields?.ZipLabel} />
            </label>
            <div className="erlanger-fad-hero__input-wrap">
              <input
                id="erlanger-fad-zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
              <span className="erlanger-fad-hero__keypad" aria-hidden="true" />
            </div>
          </div>
          <div className="erlanger-fad-hero__field">
            <label htmlFor="erlanger-fad-lastname">
              <Text field={props.fields?.LastNameLabel} />
            </label>
            <input
              id="erlanger-fad-lastname"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="erlanger-fad-hero__actions">
            <button type="submit">{searchLabel}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export const Default = ErlangerFindDoctorHeroView;
export const Erlanger = ErlangerFindDoctorHeroView;
