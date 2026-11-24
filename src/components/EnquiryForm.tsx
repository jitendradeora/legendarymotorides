"use client"

import { FormEvent, useState } from "react"
import { Icon } from "../icons"
import type { SiteSettings } from "../lib/types"

type Props = { form: SiteSettings["enquiryForm"]; destinations: string[]; compact?: boolean }

export default function EnquiryForm({ form, destinations, compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    setStatus("sending")
    const values = Object.fromEntries(new FormData(element).entries())
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null)
    if (response?.ok) {
      setStatus("sent")
      element.reset()
    } else {
      setStatus("error")
    }
  }

  const note = status === "sent" ? form.successMessage : status === "error" ? form.errorMessage : form.note

  return (
    <form className={`enquiry-form ${compact ? "enquiry-form-light" : ""}`} onSubmit={submit}>
      <div className="form-row">
        <label>{form.nameLabel}<input required name="name" autoComplete="name" /></label>
        <label>{form.emailLabel}<input required type="email" name="email" autoComplete="email" /></label>
      </div>
      <div className="form-row">
        <label>
          {form.destinationLabel}
          <select required name="destination" defaultValue="">
            <option value="" disabled>{form.destinationPlaceholder}</option>
            {destinations.map((name) => <option key={name}>{name}</option>)}
            <option>{form.destinationUnsure}</option>
          </select>
        </label>
        <label>{form.ridersLabel}<input required min="1" type="number" name="riders" /></label>
      </div>
      <div className="form-row">
        <label>{form.datesLabel}<input type="date" name="dates" suppressHydrationWarning min={new Date().toISOString().slice(0, 10)} /></label>
        <label>{form.durationLabel}<input name="duration" placeholder={form.durationPlaceholder} /></label>
      </div>
      <div className="form-row">
        <label>
          {form.experienceLabel}
          <select name="experience" defaultValue="">
            <option value="" disabled>{form.experiencePlaceholder}</option>
            {form.experienceOptions.map((option) => <option key={option.text}>{option.text}</option>)}
          </select>
        </label>
        <label>
          {form.accommodationLabel}
          <select name="accommodation" defaultValue="">
            <option value="" disabled>{form.accommodationPlaceholder}</option>
            {form.accommodationOptions.map((option) => <option key={option.text}>{option.text}</option>)}
          </select>
        </label>
      </div>
      <label>{form.messageLabel}<textarea name="message" rows={4} /></label>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>{form.submitLabel} <Icon name="arrow" /></button>
      <p className="form-note" role="status">{note}</p>
    </form>
  )
}
