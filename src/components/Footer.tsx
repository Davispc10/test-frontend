'use client';

import useDarkMode from '@/hooks/useDarkMode';

export default function Footer() {
  const { colorClasses } = useDarkMode();

  return (
    <div
      className={`${colorClasses} flex h-8 items-center justify-center gap-x-2 text-base font-medium`}
    >
      <h3>
        Made with{' '}
        <a
          href="https://developer.marvel.com/docs"
          target="_blank"
          rel="noreferrer"
          className="font-marvel text-blue-900 hover:underline"
        >
          MARVEL API
        </a>
        . © 2021
      </h3>
      <span className="max-[460px]:hidden">-</span>
      <h3 className="max-[460px]:hidden">
        Developed by{' '}
        <a
          href="https://github.com/TLucas97"
          target="_blank"
          rel="noreferrer"
          className="font-marvel text-blue-900 hover:underline"
        >
          TARCISIO
        </a>
      </h3>
    </div>
  );
}
