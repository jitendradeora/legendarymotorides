import type { SiteSettings } from "../lib/types"
import { Brand } from "./Brand"
import Newsletter from "./Newsletter"
import { SocialLinks } from "./SocialLinks"

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { brand, contact, footer, newsletter, socialLinks } = settings
  return (
    <>
      <Newsletter content={newsletter} />
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Brand logo={brand.logo} siteName={brand.siteName} />
              <p className="footer-tagline">{brand.tagline}</p>
              <p className="footer-about">{brand.about}</p>
            </div>
            <div className="footer-nav">
              <strong>{footer.exploreTitle}</strong>
              {footer.exploreLinks.map((link) => <a key={link.url} href={link.url}>{link.label}</a>)}
            </div>
            <div className="footer-nav">
              <strong>{footer.contactTitle}</strong>
              {contact.phones.map((phone) => <a key={phone.dial} href={`tel:${phone.dial}`}>{phone.display}</a>)}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              {contact.alternateEmail ? <a href={`mailto:${contact.alternateEmail}`}>{contact.alternateEmail}</a> : null}
            </div>
            <div className="footer-address">
              <address>{contact.street}, {contact.locality} {contact.postalCode}, {contact.countryName}.</address>
              <SocialLinks links={socialLinks} />
            </div>
          </div>
          <div className="footer-policies mb-0">
            {footer.policyLinks.map((link) => <a key={link.url} href={link.url}>{link.label}</a>)}
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {brand.legalName}</span>
            <span>{brand.footerSlogan}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
