import logo from '@/assets/marvel-logo.jpg';
import Image from 'next/image';

export function Header() {
  return (
    <header className="flex w-full items-center justify-center p-2">
      <Image src={logo} alt="Logo" width={100} height={100} objectFit="contain" />
    </header>
  );
}
