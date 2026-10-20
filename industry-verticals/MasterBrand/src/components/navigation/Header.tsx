'use client';

import { AppPlaceholder, ComponentMap, ImageField, NextImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <div className={`component header ${props.params.styles?.trimEnd()}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <AppPlaceholder name="header-left" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};



export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  
  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <a href="/"><NextImage field={props.fields.LogoImage} width={200} height={50} /></a>
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};

const masterBrandNav = [
  { href: '/', label: 'Overview' },
  { href: 'https://www.masterbrand.com/about-us/default.aspx', label: 'About Us' },
  { href: 'https://www.masterbrand.com/investors/default.aspx', label: 'Investors' },
  { href: 'https://www.masterbrand.com/brand-portfolio/default.aspx', label: 'Brand Portfolio' },
  { href: 'https://www.masterbrand.com/careers/default.aspx', label: 'Careers' },
];

/* MasterBrand variant — white bar, wordmark left, five text links right */
export const MasterBrand = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  return (
    <div className={`component header mb-header ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-header__inner">
        <a href="/" className="mb-header__logo" aria-label="MasterBrand">
          <NextImage field={props.fields?.LogoImage} width={274} height={32} />
        </a>
        <nav className="mb-header__nav" aria-label="Primary">
          {masterBrandNav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        {isEditing && (
          <div className="mb-header__editing">
            <AppPlaceholder
              name="header-right"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
        )}
      </div>
    </div>
  );
};
