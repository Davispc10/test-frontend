'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import { useRouter } from 'next/navigation';
import { BsGithub } from 'react-icons/bs';

export default function Header() {
  const { colorClasses, DarkModeIcons } = useDarkMode();

  const router = useRouter();

  return (
    <header
      className={`${colorClasses} flex h-16 items-center justify-between px-4 shadow-2xl`}
    >
      <a href="https://github.com/TLucas97" target="_blank" rel="noreferrer">
        <BsGithub className="animate-scaleIn cursor-pointer rounded bg-dark p-1 text-[1.9rem] text-white" />
      </a>
      <h1
        className="linear-wipe mt-2 cursor-pointer font-marvel text-[3.5rem] text-marvel-white transition-all ease-in-out"
        onClick={() => router.push('/')}
      >
        MARVEL
      </h1>
      <DarkModeIcons />
    </header>
  );
}