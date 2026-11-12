export function Brand({ href = "/" }: { href?: string }) {
  return (
    <a className="logo" href={href} aria-label="Legendary Moto Rides home">
      <img className="logo-image" src="/images/logo.webp" alt="" width={320} height={240} />
    </a>
  )
}
