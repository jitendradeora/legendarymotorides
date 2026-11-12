import { useEffect, useState } from "react"
import { Icon } from "../icons"

export default function MoveToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <button
      aria-label="Move to top"
      className={visible ? "move-top move-top-visible" : "move-top"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <Icon name="up" />
    </button>
  )
}
