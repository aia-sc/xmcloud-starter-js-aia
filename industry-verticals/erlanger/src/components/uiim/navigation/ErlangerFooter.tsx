import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type FooterProps = ComponentProps;

const patientLinks = [
  { label: 'Financial Assistance', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/financial-assistance-policy' },
  { label: 'Price Transparency', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/price-transparency' },
  { label: 'Share Your Story', href: 'https://www.erlanger.org/share-your-story' },
  { label: 'No Surprises Act', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/no-surprises-act' },
  { label: 'Pay Your Bill Now', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/pay-your-bill-now' },
  { label: 'Insurance Accepted', href: 'https://www.erlanger.org/patient-and-family-resources/billing-and-insurance/accepted-insurance' },
  { label: 'Patient Rights', href: 'https://www.erlanger.org/patient-and-family-resources/policies/patients-rights' },
];

const professionalLinks = [
  { label: 'Healthcare Professionals', href: 'https://www.erlanger.org/for-healthcare-professionals' },
  { label: 'Observation Privileges', href: 'https://www.erlanger.org/for-healthcare-professionals/observation-privileges' },
  { label: 'Physician Login', href: 'https://www.erlanger.org/for-healthcare-professionals/for-physicians' },
  { label: 'Student Clinicals', href: 'https://www.erlanger.org/for-healthcare-professionals/student-clinical-placement' },
  { label: 'Physician Recruitment', href: 'https://www.erlanger.org/careers' },
];

const quickLinks = [
  { label: 'Board Calendar', href: 'https://www.erlanger.org/about-us/board-of-trustees' },
  { label: 'For Associates', href: 'https://www.erlanger.org/for-associates' },
  { label: 'ErlangerNOW', href: 'https://www.erlanger.org/patient-and-family-resources/patient-tools/erlangernow' },
  { label: 'For Vendors', href: 'https://www.erlanger.org/for-vendors' },
  { label: 'Volunteering', href: 'https://www.erlanger.org/volunteering' },
  { label: 'Job Shadowing', href: 'https://www.erlanger.org/careers/job-shadowing' },
];

const companyLinks = [
  { label: 'About Us', href: 'https://www.erlanger.org/about-us' },
  { label: 'Careers', href: 'https://www.erlanger.org/careers' },
  { label: 'Newsroom', href: 'https://erlangerhealth.wordpress.com/' },
  { label: 'Contact Us', href: 'https://www.erlanger.org/contact-us' },
  { label: 'HealthyU Blog', href: 'https://blog.erlanger.org/' },
];

const ErlangerFooterView = (props: FooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component erlanger-home erlanger-footer ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="erlanger-footer__grid">
        <div className="erlanger-footer__brand">
          <a href="https://www.erlanger.org/">
            <img
              src="https://aia-verticals.sitecoresandbox.cloud/api/public/content/84168-section6-img8?v=06510c0b"
              alt="Erlanger"
              className="erlanger-footer__logo"
            />
          </a>
          <p>
            975 East 3rd Street
            <br />
            Chattanooga, TN 37403
          </p>
          <p>
            Phone: <a href="tel:4237787000">423-778-7000</a>
          </p>
          <p>8AM – Midnight, 7 days a week</p>
          <div className="erlanger-footer__social" aria-label="Social media">
            <a href="https://www.facebook.com/erlangerhealth" aria-label="Facebook">
              f
            </a>
            <a href="https://www.youtube.com/user/ErlangerHealth" aria-label="YouTube">
              ▶
            </a>
            <a href="https://www.linkedin.com/company/erlanger-health-system" aria-label="LinkedIn">
              in
            </a>
            <a href="https://www.instagram.com/erlangerhealth/" aria-label="Instagram">
              ◇
            </a>
          </div>
          <img
            src="https://aia-verticals.sitecoresandbox.cloud/api/public/content/84182-section6-img9?v=61848ecd"
            alt="Best of the Best 2026"
            className="erlanger-footer__badge"
          />
          <p className="erlanger-footer__badge-copy">
            Voted <strong>Best of the Best</strong> over the past decade.
          </p>
          <p className="erlanger-footer__app-label">Get the ErlangerNOW app</p>
          <div className="erlanger-footer__apps">
            <a href="https://apps.apple.com/us/app/erlangernow/id1441781905">
              <img
                src="https://www.erlanger.org/-/media/erlanger-media/erlangernow/app-apple-v2.ashx"
                alt="Download on the App Store"
                height={39}
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=org.erlanger.erlangernow">
              <img
                src="https://www.erlanger.org/-/media/erlanger-media/erlangernow/app-android-v2.ashx"
                alt="Get it on Google Play"
                height={37}
              />
            </a>
          </div>
        </div>

        <div className="erlanger-footer__partners">
          <img
            src="https://www.erlanger.org/-/media/erlanger-media/footer/university-of-tennessee.ashx"
            alt="University of Tennessee Health Science Center"
            className="erlanger-footer__partner-logo"
          />
          <p>Erlanger is a teaching hospital system affiliated with the University of Tennessee Health Science Center.</p>
          <a href="https://www.uthsc.edu/">Visit the UTHSC website</a>
          <img
            src="https://aia-verticals.sitecoresandbox.cloud/api/public/content/84223-section6-img13?v=63c8b4b0"
            alt="Erlanger Foundation"
            className="erlanger-footer__partner-logo erlanger-footer__partner-logo--foundation"
          />
          <p>
            Advances Medical excellence in our region through investments in technology, clinical programs, medical
            education, research and facilities.
          </p>
          <a href="https://www.erlangerfoundation.org/">Learn more about the Foundation</a>
        </div>

        <div>
          <h3>FOR PATIENTS</h3>
          <ul>
            {patientLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <h3 className="erlanger-footer__stack-title">QUICK LINKS</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>FOR PROFESSIONALS</h3>
          <ul>
            {professionalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <h3 className="erlanger-footer__stack-title">COMPANY</h3>
          <ul>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="erlanger-footer__legal">
        <a href="https://www.erlanger.org/sitemap">Sitemap</a>
        <span>|</span>
        <a href="https://www.erlanger.org/patient-and-family-resources/policies/notice-of-privacy-practices">
          Patient Privacy Practices
        </a>
        <span>|</span>
        <a href="https://www.erlanger.org/digital-privacy-policy">Digital Privacy Policy</a>
        <span>|</span>
        <a href="https://www.erlanger.org/disclaimer">Disclaimer</a>
        <span>|</span>
        <span>©2026 Erlanger. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export const Default = ErlangerFooterView;
export const Erlanger = ErlangerFooterView;
