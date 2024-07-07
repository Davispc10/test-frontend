import type React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-1 flex-col px-8 py-16">{children}</div>
    </div>
  );
}
