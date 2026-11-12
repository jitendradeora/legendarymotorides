import type { Metadata } from "next"
import { TermsPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Booking terms for Legendary Moto Rides motorcycle tours.",
}

export default function Page() {
  return <TermsPage />
}
