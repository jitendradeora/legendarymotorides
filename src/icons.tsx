export type IconName =
  | "arrow"
  | "close"
  | "facebook"
  | "helmet"
  | "instagram"
  | "mail"
  | "menu"
  | "phone"
  | "route"
  | "shield"
  | "tripadvisor"
  | "up"
  | "x"
  | "youtube"

interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    facebook: (
      <path
        d="M14 8h-2a2 2 0 0 0-2 2v2H8v3h2v7h3v-7h2.2L16 12h-3v-1a1 1 0 0 1 1-1h2V8Z"
        fill="currentColor"
        stroke="none"
      />
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    helmet: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h11c2 0 3 1 3 3H8a4 4 0 0 1-4-3Z" />
        <path d="M18 14h2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 3c-4-1.6-7.4-5-9-9l3-2-2-4Z" />
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" />
      </>
    ),
    tripadvisor: (
      <>
        <circle cx="8.5" cy="11" r="3.2" />
        <circle cx="15.5" cy="11" r="3.2" />
        <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none" />
        <path d="M12 14.2 13.4 17h-2.8L12 14.2Z" fill="currentColor" stroke="none" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    up: (
      <>
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </>
    ),
    x: (
      <>
        <path d="M5 5 19 19" />
        <path d="M19 5 5 19" />
      </>
    ),
    youtube: (
      <>
        <rect x="3" y="6.5" width="18" height="11" rx="2.5" />
        <path d="m11 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  )
}

export function RouteMap({ stops }: { stops: readonly string[] }) {
  const points = ["48,190", "125,112", "205,148", "282,62"]

  return (
    <div className="route-map-art">
      <svg
        aria-hidden="true"
        viewBox="0 0 330 230"
        fill="none"
        role="img"
      >
        <path
          d="M25 205C72 163 88 109 130 116c44 8 46 49 83 35 39-15 35-83 93-105"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="7 8"
        />
        {points.slice(0, stops.length).map((point, index) => {
          const [cx, cy] = point.split(",")
          return (
            <g key={point}>
              <circle cx={cx} cy={cy} r="12" fill="currentColor" />
              <text
                x={cx}
                y={Number(cy) + 4}
                textAnchor="middle"
                fill="#111311"
                fontSize="10"
                fontWeight="700"
              >
                {index + 1}
              </text>
            </g>
          )
        })}
      </svg>
      <ol>
        {stops.slice(0, 4).map((stop) => <li key={stop}>{stop}</li>)}
      </ol>
    </div>
  )
}
