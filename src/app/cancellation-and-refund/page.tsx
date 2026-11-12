import type { Metadata } from "next"
import { CancellationPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Cancellation and refunds",
  description: "Cancellation guidance for Legendary Moto Rides motorcycle tours.",
}

export default function Page() {
  return <CancellationPage />
}
