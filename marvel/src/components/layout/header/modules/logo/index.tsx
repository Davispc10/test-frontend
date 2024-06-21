import Image from 'next/image'
import LogoImg from '@/assets/imgs/logo-marvel.png'

export function Logo() {
  return <Image width={80} alt="Logo Marvel" src={LogoImg} />
}
