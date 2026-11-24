"use client"

import { useState } from "react"
import { Icon } from "../icons"
import type { SiteSettings } from "../lib/types"
import { Brand } from "./Brand"
import { SocialLinks } from "./SocialLinks"

type Props = {
  variant?: "home" | "page"
  brand: SiteSettings["brand"]
  header: SiteSettings["header"]
  socialLinks: SiteSettings["socialLinks"]
  labels: SiteSettings["labels"]
}

export default function Header({ variant = "page", brand, header, socialLinks, labels }: Props) {
  const [open, setOpen] = useState(false)
  const toggleLabel = open ? labels.menuClose : labels.menuOpen
  const close = () => setOpen(false)

  if (variant === "home") {
    return (
      <header className="header">
        <div className="header-inner">
          <Brand href="/" logo={brand.logo} siteName={brand.siteName} />
          <nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">
            {header.navLinks.map((link) => (
              <a href={link.url} key={link.url} onClick={close}>{link.label}</a>
            ))}
            <a className="mobile-enquire" href={header.ctaUrl} onClick={close}>{header.ctaLabel}</a>
            <SocialLinks links={socialLinks} className="social-links mobile-socials" />
          </nav>
          <a className="button button-primary page-header-cta" href={header.ctaUrl}>{header.ctaLabel}</a>
          <button aria-expanded={open} aria-label={toggleLabel} className="menu-button" onClick={() => setOpen(!open)} type="button">
            <Icon name={open ? "close" : "menu"} size={32} />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className="page-header">
      <div className="container page-header-inner">
        <Brand logo={brand.logo} siteName={brand.siteName} />
        <nav className={open ? "page-nav page-nav-open" : "page-nav"} aria-label="Main navigation">
          {header.navLinks.map((link) => (
            <a href={link.url} key={link.url} onClick={close}>{link.label}</a>
          ))}
          <SocialLinks links={socialLinks} className="social-links social-links-compact" />
        </nav>
        <a className="button button-primary page-header-cta" href={header.ctaUrl}>{header.ctaLabel}</a>
        <button className="page-menu" type="button" aria-expanded={open} aria-label={toggleLabel} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} size={32} />
        </button>
      </div>
    </header>
  )
}
