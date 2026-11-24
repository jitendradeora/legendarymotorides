import type { Metadata } from "next"
import EnquiryForm from "@/components/EnquiryForm"
import Shell from "@/components/Shell"
import { ListingIntro } from "@/components/sections"
import { getContactPage, getDestinations, getSettings } from "@/lib/api"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getContactPage()).seo)
}

export default async function Page() {
  const [page, settings, destinations] = await Promise.all([getContactPage(), getSettings(), getDestinations()])
  const { contact, brand } = settings
  return (
    <Shell>
      <ListingIntro intro={page.intro} homeLabel={settings.labels.home} />
      <section className="contact-page section-light">
        <div className="container contact-grid">
          <div className="contact-details">
            <div><small>{contact.companyLabel}</small><strong>{brand.legalName}</strong></div>
            <div>
              <small>{contact.telephoneLabel}</small>
              {contact.phones.map((phone) => <a key={phone.dial} href={`tel:${phone.dial}`}>{phone.display}</a>)}
            </div>
            <div>
              <small>{contact.emailLabel}</small>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              {contact.alternateEmail ? <a href={`mailto:${contact.alternateEmail}`}>{contact.alternateEmail}</a> : null}
            </div>
            <div><small>{contact.officeLabel}</small><address>{contact.street}, {contact.locality}, {contact.postalCode}, {contact.countryName}.</address></div>
          </div>
          <EnquiryForm form={settings.enquiryForm} destinations={destinations.map((d) => d.title)} compact />
        </div>
      </section>
    </Shell>
  )
}
