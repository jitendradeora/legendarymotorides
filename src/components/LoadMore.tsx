"use client"

import { Children, ReactNode, useState } from "react"

type Props = {
  children: ReactNode
  label: string
  /** Items shown first, and added on every click. */
  step?: number
  className?: string
}

/** Shows the first items of a list and reveals more on click. Nothing is shown when the list fits. */
export default function LoadMore({ children, label, step = 6, className }: Props) {
  const items = Children.toArray(children)
  const [visible, setVisible] = useState(step)
  return (
    <>
      <div className={className}>{items.slice(0, visible)}</div>
      {items.length > visible ? (
        <div className="load-more">
          <button type="button" className="button button-dark" onClick={() => setVisible((count) => count + step)}>{label}</button>
        </div>
      ) : null}
    </>
  )
}
