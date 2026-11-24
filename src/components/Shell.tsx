import { getSettings } from "../lib/api"
import Footer from "./Footer"
import Header from "./Header"
import MoveToTop from "./MoveToTop"

/** Header, footer and floating button, all fed from WordPress Site Settings. */
export default async function Shell({ children, variant = "page" }: { children: React.ReactNode; variant?: "home" | "page" }) {
  const settings = await getSettings()
  const content = (
    <>
      <Header variant={variant} brand={settings.brand} header={settings.header} socialLinks={settings.socialLinks} labels={settings.labels} />
      <main>{children}</main>
      <Footer settings={settings} />
      <MoveToTop label={settings.labels.moveTop} />
    </>
  )
  return variant === "home" ? <div id="top">{content}</div> : content
}
