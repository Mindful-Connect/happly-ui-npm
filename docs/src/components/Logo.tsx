import Image from 'next/image'
import logoImg from '@/images/logo.png'

export function Logomark(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image
      src={logoImg}
      alt="HapplyUI"
      width={36}
      height={36}
      {...props}
    />
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image
      src={logoImg}
      alt="HapplyUI"
      width={32}
      height={32}
      {...props}
    />
  )
}
