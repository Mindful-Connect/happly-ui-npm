export function Logomark(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      src="/logo.png"
      alt="HapplyUI"
      width={36}
      height={36}
      {...props}
    />
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      src="/logo.png"
      alt="HapplyUI"
      width={32}
      height={32}
      {...props}
    />
  )
}
