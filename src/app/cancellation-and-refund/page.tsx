import PolicyPage, { policyMetadata } from "@/components/PolicyPage"

export const generateMetadata = () => policyMetadata("cancellation-and-refund")

export default function Page() {
  return <PolicyPage slug="cancellation-and-refund" />
}
