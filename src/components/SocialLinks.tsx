import { Icon } from "../icons"
import { siteConfig } from "../lib/site-config"

export function SocialLinks({ className = "social-links" }: { className?: string }) {
  return (
    <div className={className}>
      {siteConfig.socialLinks.map((social) => (
        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
          <Icon name={social.icon} size={18} />
        </a>
      ))}
    </div>
  )
}
