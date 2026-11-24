import PolicyPage, { policyMetadata } from "@/components/PolicyPage"

export const generateMetadata = () => policyMetadata("terms-and-conditions")

export default function Page() {
  return <PolicyPage slug="terms-and-conditions" />
}
