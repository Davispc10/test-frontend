'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  testid?: string;
}

export default function Button({
  children,
  href,
  disabled,
  testid,
  onClick,
}: ButtonProps) {
  const { buttonColorClasses } = useDarkMode();
  const router = useRouter();

  return (
    <button
      data-testid={testid}
      className={`${buttonColorClasses} ${
        disabled && 'pointer-events-none opacity-40'
      } flex max-w-[200px] items-center justify-between gap-x-3 px-5 py-3 font-medium transition-opacity hover:opacity-80`}
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
