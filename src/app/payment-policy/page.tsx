import PolicyPage, { policyMetadata } from "@/components/PolicyPage"

export const generateMetadata = () => policyMetadata("payment-policy")

export default function Page() {
  return <PolicyPage slug="payment-policy" />
}
