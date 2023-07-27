'use client';

import { BsGithub } from 'react-icons/bs';
import useDarkMode from '../hooks/useDarkMode';

export default function Header() {
  const { headerFooterClasses, DarkModeIcons } = useDarkMode();

  return (
    <header
      className={`${headerFooterClasses} h-16 flex justify-between items-center shadow-2xl px-4`}
    >
      <BsGithub className="text-white text-[1.9rem] animate-scaleIn bg-dark rounded p-1 cursor-pointer" />
      <h1 className="text-[3.5rem] text-marvel-white font-marvel mt-2 linear-wipe cursor-pointer transition-all ease-in-out">
        MARVEL
      </h1>
      <DarkModeIcons />
    </header>
  );
}
