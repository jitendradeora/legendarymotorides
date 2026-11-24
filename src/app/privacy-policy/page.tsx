import PolicyPage, { policyMetadata } from "@/components/PolicyPage"

export const generateMetadata = () => policyMetadata("privacy-policy")

export default function Page() {
  return <PolicyPage slug="privacy-policy" />
}
