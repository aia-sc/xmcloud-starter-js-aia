'use client';

import { AppPlaceholder, ComponentMap, ImageField, NextImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cabinetsHeaderLogo } from 'lib/cabinet-brand-logos';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

const isCabinetsBlueRoute = (pathname: string) => /our-cabinet-brands/i.test(pathname);

export const Default = (props: HeaderProps): JSX.Element => {
  const pathname = usePathname() || '';
  // Header Blue partial has no LogoImage; Our Cabinet Brands page uses the Blue chrome.
  if (isCabinetsBlueRoute(pathname) || !props.fields?.LogoImage?.value?.src) {
    return <MasterBrandBlue {...props} />;
  }

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
  { href: '/Brand-Portfolio', label: 'Brand Portfolio' },
  { href: 'https://www.masterbrand.com/careers/default.aspx', label: 'Careers' },
];

const masterBrandBlueUtility = [
  { href: 'https://www.masterbrandcabinets.com/favorites', label: 'My Favorites' },
  { href: 'https://masterbrand.wd12.myworkdayjobs.com/en-US/Careers', label: 'Careers' },
  { href: 'https://www.masterbrandcabinets.com/exclusive-email', label: 'Exclusive Emails' },
];

const masterBrandBlueNav = [
  { href: 'https://www.masterbrandcabinets.com/get-started', label: 'Get Started' },
  { href: '/Our-Cabinet-Brands', label: 'Our Brands' },
  { href: 'https://www.masterbrandcabinets.com/inspiration-gallery', label: 'Inspiration' },
  { href: 'https://www.masterbrandcabinets.com/why-masterbrand', label: 'Why MasterBrand?' },
  { href: 'https://www.masterbrandcabinets.com/blog', label: 'Design Blog' },
  { href: 'https://www.masterbrandcabinets.com/dealer-locator', label: 'Where to Buy' },
];

/* MasterBrand variant — white bar, wordmark left, five text links right */
export const MasterBrand = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const pathname = usePathname() || '/';

  return (
    <div className={`component header mb-header ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-header__inner">
        <a href="/" className="mb-header__logo" aria-label="MasterBrand">
          <NextImage field={props.fields?.LogoImage} width={274} height={32} />
        </a>
        <nav className="mb-header__nav" aria-label="Primary">
          {masterBrandNav.map((item) => {
            const isHome = item.href === '/';
            const isActive = isHome
              ? pathname === '/' || /\/(en)\/?$/.test(pathname)
              : item.href.startsWith('/') && pathname.includes(item.href.replace(/^\//, ''));
            return (
              <a key={item.label} href={item.href} className={isActive ? 'is-active' : undefined}>
                {item.label}
              </a>
            );
          })}
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

/* MasterBrand Blue — charcoal utility + slate-blue primary bar (cabinets consumer chrome) */
export const MasterBrandBlue = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const pathname = usePathname() || '/';
  // Prefer the sharp white cabinets logo from Content Hub (not the IR wordmark).
  const logoField = cabinetsHeaderLogo;

  return (
    <div className={`component header mb-header-blue ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-header-blue__utility">
        <div className="mb-header-blue__utility-inner">
          {masterBrandBlueUtility.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mb-header-blue__main">
        <div className="mb-header-blue__inner">
          <a href="/" className="mb-header-blue__logo" aria-label="MasterBrand">
            <NextImage field={logoField} width={274} height={32} />
          </a>
          <nav className="mb-header-blue__nav" aria-label="Primary">
            {masterBrandBlueNav.map((item) => {
              const isActive =
                item.href.startsWith('/') &&
                /our-cabinet-brands/i.test(pathname) &&
                /our-cabinet-brands/i.test(item.href);
              return (
                <a key={item.label} href={item.href} className={isActive ? 'is-active' : undefined}>
                  {item.label}
                </a>
              );
            })}
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
    </div>
  );
};
