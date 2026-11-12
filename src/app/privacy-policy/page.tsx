import type { Metadata } from "next"
import { PrivacyPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Legendary Moto Rides handles enquiry information.",
}

export default function Page() {
  return <PrivacyPage />
}
