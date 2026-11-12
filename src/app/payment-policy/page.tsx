import type { Metadata } from "next"
import { PaymentPolicyPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Payment policy",
  description: "How deposits and balances work for a Legendary Moto Rides booking.",
}

export default function Page() {
  return <PaymentPolicyPage />
}
