"use client"

import { FormEvent, useState } from "react"
import { Icon } from "../icons"
import { siteConfig } from "../lib/site-config"
import { Brand } from "./Brand"
import { SocialLinks } from "./SocialLinks"

function Newsletter() {
  const [message, setMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get("email") || "")
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const result = (await response.json().catch(() => null)) as { ok?: boolean; forwarded?: boolean; message?: string } | null
    if (!response.ok) {
      setMessage(result?.message || "Enter a valid email address.")
      return
    }
    setMessage(result?.forwarded ? "You're on the list." : "Thanks. We'll add this address when the newsletter is connected.")
    event.currentTarget.reset()
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter-grid">
        <div>
          <p className="eyebrow eyebrow-light"><span />Stay in the saddle</p>
          <h2 id="newsletter-title">New departures, straight to you.</h2>
          <p className="newsletter-copy">Season dates, new journeys, and the occasional road update. No noise.</p>
        </div>
        <form className="newsletter-form" onSubmit={submit}>
          <div className="newsletter-row">
            <label>
              Email address
              <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" />
            </label>
            <button className="button button-primary" type="submit">Subscribe <Icon name="arrow" /></button>
          </div>
          <p className="form-note">{message || "One email when there is something worth riding for."}</p>
        </form>
      </div>
    </section>
  )
}

export default function Footer() {
  return (
    <>
      <Newsletter />
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Brand />
              <p className="footer-tagline">{siteConfig.tagline}</p>
              <p className="footer-about">{siteConfig.about}</p>
            </div>
            <div className="footer-nav">
              <strong>Explore</strong>
              <a href="/destinations">Destinations</a>
              <a href="/motorcycle-tours">Motorcycle tours</a>
              <a href="/tour-calendar">Tour calendar</a>
              <a href="/join-tour">Join a tour</a>
              <a href="/custom-tours">Custom tours</a>
              <a href="/insights">Insights</a>
              <a href="/gallery">Gallery</a>
              <a href="/about">About us</a>
            </div>
            <div className="footer-nav">
              <strong>Contact</strong>
              <a href={siteConfig.phoneLinks[0]}>{siteConfig.phones[0]}</a>
              <a href={siteConfig.phoneLinks[1]}>{siteConfig.phones[1]}</a>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`mailto:${siteConfig.alternateEmail}`}>{siteConfig.alternateEmail}</a>
            </div>
            <div className="footer-address">
              <address>{siteConfig.address.streetAddress}, {siteConfig.address.addressLocality} {siteConfig.address.postalCode}, India.</address>
              <SocialLinks />
            </div>
          </div>
          <div className="footer-policies mb-0">
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/payment-policy">Payment Policy</a>
            <a href="/cancellation-and-refund">Cancellation & Refund</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
            <span>By the Motorcyclist, For the Motorcyclist.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
