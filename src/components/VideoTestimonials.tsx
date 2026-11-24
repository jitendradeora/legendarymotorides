"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "../icons"
import type { Video } from "../lib/types"

type Props = { videos: Video[]; playLabel: string; closeLabel: string }

export default function VideoTestimonials({ videos, playLabel, closeLabel }: Props) {
  const [active, setActive] = useState<Video | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  return (
    <>
      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.youtubeId}>
            <div className="video-frame">
              <button aria-label={`${playLabel} ${video.title}`} className="video-play" type="button" onClick={() => setActive(video)}>
                <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" />
                <i aria-hidden="true"><Icon name="youtube" size={22} /></i>
              </button>
            </div>
            <h3>{video.title}</h3>
            <p>{video.rider} · {video.place}</p>
          </article>
        ))}
      </div>
      <dialog
        className="video-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        onClose={() => setActive(null)}
      >
        {active ? (
          <div className="video-dialog-panel">
            <button aria-label={closeLabel} className="video-dialog-close" type="button" onClick={() => dialogRef.current?.close()}>
              <Icon name="close" size={18} />
            </button>
            <div className="video-dialog-frame">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1`}
                title={active.title}
              />
            </div>
            <p><strong>{active.title}</strong><span>{active.rider} · {active.place}</span></p>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
