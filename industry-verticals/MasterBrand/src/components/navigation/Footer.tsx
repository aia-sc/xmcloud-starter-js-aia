'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  RichTextField,
  RichText,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { usePathname } from 'next/navigation';
import { cabinetsHeaderLogo } from 'lib/cabinet-brand-logos';

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Text1: RichTextField;
  Title2: Field<string>;
  Text2: RichTextField;
  Title3: Field<string>;
  Text3: RichTextField;
  Title4: Field<string>;
  Text4: RichTextField;
  Copyright: Field<string>;
  Link1: LinkField;
  Link2: LinkField;
  SocialsTitle: Field<string>;
  SocialLink1: LinkField;
  SocialIcon1: ImageField;
  SocialLink2: LinkField;
  SocialIcon2: ImageField;
  SocialLink3: LinkField;
  SocialIcon3: ImageField;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps): JSX.Element => {
  const pathname = usePathname() || '';
  const copyright = props.fields?.Copyright?.value || '';
  // Footer Blue partial / Our Cabinet Brands page — always use Blue chrome.
  if (/our-cabinet-brands/i.test(pathname) || /Cabinets LLC/i.test(copyright)) {
    return <MasterBrandBlue {...props} />;
  }

  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component component-spaced footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 row-gap-5 gx-5">
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title3} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title4} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-gap-5 gx-5">
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links links-socials">
                <Link field={props.fields?.SocialLink1}>
                  <NextImage field={props.fields?.SocialIcon1} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink2}>
                  <NextImage field={props.fields?.SocialIcon2} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink3}>
                  <NextImage field={props.fields?.SocialIcon3} width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

const footerLegalLinks = [
  { href: 'https://www.masterbrand.com/', label: 'Privacy Statement' },
  { href: 'https://www.masterbrand.com/investors/sec-filings/default.aspx', label: 'SEC Filings' },
  { href: 'https://www.masterbrand.com/', label: 'Terms of Use' },
  { href: 'https://www.masterbrand.com/', label: 'Notice of Privacy Practices' },
  { href: 'https://www.masterbrand.com/', label: 'Transparency in Coverage' },
  { href: 'https://www.masterbrand.com/', label: 'Do Not Sell My Personal Information' },
  { href: 'https://www.masterbrand.com/', label: 'Accessibility' },
];

const socialIcon = (label: string) => {
  const common = {
    viewBox: '0 0 24 24',
    width: 14,
    height: 14,
    fill: 'currentColor',
    'aria-hidden': true as const,
  };

  if (label === 'LinkedIn') {
    return (
      <svg {...common}>
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6V24h-4v-7.7c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24h-4V8.5z" />
      </svg>
    );
  }
  if (label === 'Facebook') {
    return (
      <svg {...common}>
        <path d="M22 12.1C22 6.5 17.5 2 11.9 2S1.8 6.5 1.8 12.1c0 5 3.7 9.2 8.4 10v-7.1H7.7v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.3V22c4.8-.8 8.5-5 8.5-9.9z" />
      </svg>
    );
  }
  if (label === 'X') {
    return (
      <svg {...common}>
        <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.8-6.3L5.7 22H3l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
      </svg>
    );
  }
  if (label === 'Instagram') {
    return (
      <svg {...common}>
        <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.8 6.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM21.5 7.4a6.3 6.3 0 0 0-1.7-4.5 6.3 6.3 0 0 0-4.5-1.7c-1.8-.1-7.1-.1-8.9 0a6.3 6.3 0 0 0-4.5 1.7A6.3 6.3 0 0 0 .2 7.4c-.1 1.8-.1 7.1 0 8.9a6.3 6.3 0 0 0 1.7 4.5 6.3 6.3 0 0 0 4.5 1.7c1.8.1 7.1.1 8.9 0a6.3 6.3 0 0 0 4.5-1.7 6.3 6.3 0 0 0 1.7-4.5c.1-1.8.1-7.1 0-8.9zM19.3 18a3.6 3.6 0 0 1-2 2c-1.4.6-4.7.4-6.3.4s-4.9.1-6.3-.4a3.6 3.6 0 0 1-2-2c-.6-1.4-.4-4.7-.4-6.3s-.1-4.9.4-6.3a3.6 3.6 0 0 1 2-2c1.4-.6 4.7-.4 6.3-.4s4.9-.1 6.3.4a3.6 3.6 0 0 1 2 2c.6 1.4.4 4.7.4 6.3s.2 4.9-.4 6.3z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7L15.8 12z" />
    </svg>
  );
};

const footerSocials = [
  { href: 'https://www.linkedin.com/company/masterbrand', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/', label: 'Facebook' },
  { href: 'https://x.com/', label: 'X' },
  { href: 'https://www.instagram.com/', label: 'Instagram' },
  { href: 'https://www.youtube.com/', label: 'YouTube' },
];

/* MasterBrand variant — logo, contact, email alerts, and a legal bar */
export const MasterBrand = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component footer mb-footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-footer__main">
        <a href="/" className="mb-footer__logo" aria-label="MasterBrand">
          <NextImage field={props.fields?.Image1} width={168} height={20} />
        </a>
        <div className="mb-footer__contact">
          <div className="mb-footer__heading">
            <Text field={props.fields?.Title1} />
          </div>
          <div className="mb-footer__address">
            <RichText field={props.fields?.Text1} />
          </div>
        </div>
        <form
          className="mb-footer__signup"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="mb-footer__heading">
            <Text field={props.fields?.Title2} />
          </div>
          <input type="email" name="email" placeholder="Enter your email address" aria-label="Email address" />
          <fieldset className="mb-footer__alerts">
            <legend>Alert type</legend>
            <label>
              <input type="radio" name="alertType" defaultChecked /> Email
            </label>
            <label>
              <input type="radio" name="alertType" /> SEC Filing
            </label>
            <label>
              <input type="radio" name="alertType" /> Events and Presentations
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="mb-footer__bar">
        <div className="mb-footer__copyright">
          <Text field={props.fields?.Copyright} />
        </div>
        <nav className="mb-footer__legal" aria-label="Legal">
          {footerLegalLinks.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mb-footer__socials">
          {footerSocials.map((item) => (
            <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">
              {socialIcon(item.label)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const blueFooterColumns = [
  {
    title: 'Our Brands',
    links: [
      { href: '/Our-Cabinet-Brands', label: 'Cabinet Brands' },
      { href: 'https://www.aristokraft.com/', label: 'Aristokraft' },
      { href: 'https://www.diamondcabinets.com/', label: 'Diamond' },
      { href: 'https://www.omegacabinetry.com/', label: 'Omega' },
    ],
  },
  {
    title: 'Why MasterBrand',
    links: [
      { href: 'https://www.masterbrandcabinets.com/why-masterbrand', label: 'Quality' },
      { href: 'https://www.masterbrand.com/sustainability/default.aspx', label: 'Sustainability' },
      { href: 'https://www.masterbrandcabinets.com/why-masterbrand', label: 'Innovation' },
    ],
  },
  {
    title: 'For Pros',
    links: [
      { href: 'https://www.masterbrandcabinets.com/dealer-locator', label: 'Dealer Locator' },
      { href: 'https://www.masterbrandcabinets.com/', label: 'Dealer Portal' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { href: 'https://www.masterbrand.com/about-us/default.aspx', label: 'Leadership' },
      { href: 'https://www.masterbrand.com/news/default.aspx', label: 'News' },
      { href: 'https://www.masterbrand.com/careers/default.aspx', label: 'Careers' },
    ],
  },
  {
    title: 'For Consumers',
    links: [
      { href: 'https://www.masterbrandcabinets.com/dealer-locator', label: 'Where to Buy' },
      { href: 'https://www.masterbrandcabinets.com/', label: 'Warranty' },
    ],
  },
];

/* MasterBrand Blue — family-of-brands band + multi-column consumer footer */
export const MasterBrandBlue = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  // Prefer sharp white cabinets logo (Content Hub) over any blurry IR wordmark.
  const logoField = cabinetsHeaderLogo;

  return (
    <div className={`component footer mb-footer-blue ${sxaStyles}`} id={id ? id : undefined}>
      <div className="mb-footer-blue__band" aria-hidden="false">
        <span className="mb-footer-blue__band-rule" />
        <span className="mb-footer-blue__band-label">Our Family of Brands</span>
        <span className="mb-footer-blue__band-rule" />
      </div>
      <div className="mb-footer-blue__main">
        <div className="mb-footer-blue__brand">
          <a href="/" className="mb-footer-blue__logo" aria-label="MasterBrand">
            <NextImage field={logoField} width={274} height={32} />
          </a>
          <div className="mb-footer-blue__socials">
            {footerSocials.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">
                {socialIcon(item.label)}
              </a>
            ))}
          </div>
          <div className="mb-footer-blue__address">
            <RichText field={props.fields?.Text1} />
          </div>
        </div>
        {blueFooterColumns.map((column) => (
          <div key={column.title} className="mb-footer-blue__col">
            <div className="mb-footer-blue__heading">{column.title}</div>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-footer-blue__bar">
        <div className="mb-footer-blue__copyright">
          <Text field={props.fields?.Copyright} />
        </div>
      </div>
    </div>
  );
};
