'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function Button({ children, href, onClick }: ButtonProps) {
  const { buttonColorClasses } = useDarkMode();
  const router = useRouter();

  return (
    <button
      className={`${buttonColorClasses} max-w-[200px] px-5 py-3 font-medium flex items-center justify-between gap-x-3`}
      onClick={() => {
        if (href) {
          router.push(href);
        }
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}
