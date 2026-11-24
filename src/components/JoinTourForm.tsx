"use client"

import { FormEvent, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Icon } from "../icons"
import type { SiteSettings } from "../lib/types"

export default function JoinTourForm({ form }: { form: SiteSettings["joinForm"] }) {
  const params = useSearchParams()
  const tour = params.get("tour") ?? ""
  const dates = params.get("dates") ?? ""
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const response = await fetch("/api/join-tour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null)
    setStatus(response?.ok ? "sent" : "error")
  }

  const note = status === "sent" ? form.successMessage : status === "error" ? form.errorMessage : form.note

  return (
    <form className="enquiry-form enquiry-form-light" key={`${tour}-${dates}`} onSubmit={submit}>
      <div className="form-row">
        <label>{form.nameLabel}<input required name="name" autoComplete="name" /></label>
        <label>{form.emailLabel}<input required type="email" name="email" autoComplete="email" /></label>
      </div>
      <div className="form-row">
        <label>{form.phoneLabel}<input name="phone" autoComplete="tel" /></label>
        <label>{form.ridersLabel}<input required min="1" type="number" name="riders" defaultValue="1" /></label>
      </div>
      <div className="form-row">
        <label>{form.tourLabel}<input required name="tour" defaultValue={tour} /></label>
        <label>{form.departureLabel}<input required name="dates" defaultValue={dates} /></label>
      </div>
      <label>{form.messageLabel}<textarea name="message" rows={4} /></label>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>{form.submitLabel} <Icon name="arrow" /></button>
      <p className="form-note" role="status">{note}</p>
    </form>
  )
}
