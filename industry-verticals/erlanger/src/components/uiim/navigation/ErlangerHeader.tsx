import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type HeaderProps = ComponentProps;

const utilityLinks = [
  { label: 'About Us', href: 'https://www.erlanger.org/about-us' },
  { label: 'Careers', href: 'https://www.erlanger.org/careers' },
  { label: 'Clinical Research', href: 'https://www.erlanger.org/clinical-research' },
  { label: 'Giving', href: 'https://www.erlangerfoundation.org/?campaign=557993' },
  { label: 'Contact Us', href: 'https://www.erlanger.org/contact-us' },
  { label: 'Pay Your Bill', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/pay-your-bill-now' },
  { label: 'MyChart', href: 'https://www.erlanger.org/patient-and-family-resources/patient-tools/mychart' },
  { label: "Children's Hospital", href: 'https://www.childrensaterlanger.org/' },
];

const navLinks = [
  { label: 'Find a Doctor', href: 'https://www.erlanger.org/find-a-doctor' },
  { label: 'Medical Services', href: 'https://www.erlanger.org/medical-services' },
  { label: 'Locations', href: 'https://www.erlanger.org/locations' },
  { label: 'Patients & Family Resources', href: 'https://www.erlanger.org/patient-and-family-resources' },
];

const ErlangerHeaderView = (props: HeaderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component erlanger-home erlanger-header ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="erlanger-header__utility">
        <div className="erlanger-header__utility-inner">
          {utilityLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="erlanger-header__main">
        <div className="erlanger-header__main-inner">
          <a href="https://www.erlanger.org/">
            <img
              className="erlanger-header__logo"
              src="https://aia-verticals.sitecoresandbox.cloud/api/public/content/84168-section6-img8?v=06510c0b"
              alt="Erlanger"
            />
          </a>
          <nav className="erlanger-header__nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export const Default = ErlangerHeaderView;
export const Erlanger = ErlangerHeaderView;
