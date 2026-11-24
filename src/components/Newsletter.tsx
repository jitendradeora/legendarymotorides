"use client"

import { FormEvent, useState } from "react"
import { Icon } from "../icons"
import type { SiteSettings } from "../lib/types"

export default function Newsletter({ content }: { content: SiteSettings["newsletter"] }) {
  const [message, setMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get("email") || "")
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) {
      setMessage(content.errorMessage)
      return
    }
    setMessage(content.successMessage)
    form.reset()
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter-grid">
        <div>
          <p className="eyebrow eyebrow-light"><span />{content.eyebrow}</p>
          <h2 id="newsletter-title">{content.title}</h2>
          <p className="newsletter-copy">{content.copy}</p>
        </div>
        <form className="newsletter-form" onSubmit={submit}>
          <div className="newsletter-row">
            <label>
              {content.emailLabel}
              <input required type="email" name="email" autoComplete="email" placeholder={content.placeholder} />
            </label>
            <button className="button button-primary" type="submit">{content.buttonLabel} <Icon name="arrow" /></button>
          </div>
          <p className="form-note">{message || content.defaultNote}</p>
        </form>
      </div>
    </section>
  )
}
