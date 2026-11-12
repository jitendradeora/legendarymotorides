import type { Metadata } from "next"
import { ContactPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Legendary Moto Rides in Shakarpur, New Delhi about a guided motorcycle tour.",
}

export default function Page() {
  return <ContactPage />
}
