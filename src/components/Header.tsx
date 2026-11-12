"use client"

import { useState } from "react"
import { Icon } from "../icons"
import { Brand } from "./Brand"
import { SocialLinks } from "./SocialLinks"

const links = [
  ["Destinations", "/destinations"],
  ["Tours", "/motorcycle-tours"],
  ["Tour calendar", "/tour-calendar"],
  ["Insights", "/insights"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export default function Header({ variant = "page" }: { variant?: "home" | "page" }) {
  const [open, setOpen] = useState(false)

  if (variant === "home") {
    return (
      <header className="header">
        <div className="header-inner">
          <Brand href="/" />
          <nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">
            {links.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="mobile-enquire" href="/custom-tours" onClick={() => setOpen(false)}>
              Plan your ride
            </a>
            <SocialLinks className="social-links mobile-socials" />
          </nav>
          <a className="button button-primary page-header-cta" href="/custom-tours">
            Plan your ride
          </a>
          <button
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="menu-button"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <Icon name={open ? "close" : "menu"} size={25} />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className="page-header">
      <div className="container page-header-inner">
        <Brand />
        <nav className={open ? "page-nav page-nav-open" : "page-nav"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <SocialLinks className="social-links social-links-compact" />
        </nav>
        <a className="button button-primary page-header-cta" href="/custom-tours">
          Plan your ride
        </a>
        <button
          className="page-menu"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  )
}
