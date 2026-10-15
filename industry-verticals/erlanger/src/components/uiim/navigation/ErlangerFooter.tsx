import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type FooterProps = ComponentProps;

const columns = [
  {
    title: 'FOR PATIENTS',
    links: [
      { label: 'Financial Assistance', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/financial-assistance-policy' },
      { label: 'Price Transparency', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/price-transparency' },
      { label: 'Pay Your Bill Now', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/pay-your-bill-now' },
      { label: 'Insurance Accepted', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/accepted-insurance' },
      { label: 'Patient Rights', href: 'https://www.erlanger.org/patient-and-family-resources/policies/patients-rights' },
    ],
  },
  {
    title: 'FOR PROFESSIONALS',
    links: [
      { label: 'Healthcare Professionals', href: 'https://www.erlanger.org/for-healthcare-professionals' },
      { label: 'Physician Login', href: 'https://www.erlanger.org/for-healthcare-professionals/for-physicians' },
      { label: 'Student Clinicals', href: 'https://www.erlanger.org/for-healthcare-professionals/student-clinical-placement' },
      { label: 'Physician Recruitment', href: 'https://www.erlanger.org/careers' },
    ],
  },
  {
    title: 'QUICK LINKS',
    links: [
      { label: 'ErlangerNOW', href: 'https://www.erlanger.org/patient-and-family-resources/patient-tools/erlangernow' },
      { label: 'For Associates', href: 'https://www.erlanger.org/for-associates' },
      { label: 'Volunteering', href: 'https://www.erlanger.org/volunteering' },
      { label: 'Contact Us', href: 'https://www.erlanger.org/contact-us' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: 'https://www.erlanger.org/about-us' },
      { label: 'Careers', href: 'https://www.erlanger.org/careers' },
      { label: 'Newsroom', href: 'https://erlangerhealth.wordpress.com/' },
      { label: 'HealthyU Blog', href: 'https://blog.erlanger.org/' },
    ],
  },
];

const ErlangerFooterView = (props: FooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component erlanger-home erlanger-footer ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="erlanger-footer__grid">
        <div>
          <p>975 E 3rd St<br />Chattanooga, TN 37403</p>
          <p>
            <a href="tel:4237787000">423-778-7000</a>
          </p>
          <img
            src="https://aia-verticals.sitecoresandbox.cloud/api/public/content/84182-section6-img9?v=61848ecd"
            alt="Best of the Best 2026"
            width={120}
          />
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Default = ErlangerFooterView;
export const Erlanger = ErlangerFooterView;
