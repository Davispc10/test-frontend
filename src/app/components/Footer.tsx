'use client';

import useDarkMode from '../hooks/useDarkMode';

export default function Footer() {
  const { headerFooterClasses } = useDarkMode();

  return (
    <div
      className={`${headerFooterClasses} h-8 flex items-center justify-center gap-x-2 text-base font-medium`}
    >
      <h3>
        Made with{' '}
        <a href="" className="text-blue-900 hover:underline font-marvel">
          MARVEL API
        </a>
        . © 2021
      </h3>
      <span className="max-[460px]:hidden">-</span>
      <h3 className="max-[460px]:hidden">
        Developed by{' '}
        <a href="" className="text-blue-900 hover:underline font-marvel">
          TARCISIO
        </a>
      </h3>
    </div>
  );
}
