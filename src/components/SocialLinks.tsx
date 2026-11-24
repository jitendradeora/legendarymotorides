import { Icon } from "../icons"
import type { SocialLink } from "../lib/types"

export function SocialLinks({ links, className = "social-links" }: { links: SocialLink[]; className?: string }) {
  return (
    <div className={className}>
      {links.map((social) => (
        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
          <Icon name={social.icon} size={18} />
        </a>
      ))}
    </div>
  )
}
