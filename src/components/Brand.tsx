import type { Img } from "../lib/types"

export function Brand({ href = "/", logo, siteName }: { href?: string; logo: Img; siteName: string }) {
  return (
    <a className="logo" href={href} aria-label={`${siteName} home`}>
      {logo ? <img className="logo-image" src={logo.sourceUrl} alt="" width={320} height={240} /> : <span>{siteName}</span>}
    </a>
  )
}
