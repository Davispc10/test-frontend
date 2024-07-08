import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps extends ComponentProps<'h2'> {
  text?: string;
}

export function Title({ text, className, ...props }: TitleProps) {
  return (
    <h2 className={twMerge('text-lg font-bold md:text-2xl', className)} {...props}>
      {text}
    </h2>
  );
}
