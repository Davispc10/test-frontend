'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import { useEffect } from 'react';

import ThemeChangeNotification from './ThemeChangeNotification';

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  const { handleDarkModeChange, appContainerClasses } = useDarkMode();

  useEffect(() => {
    handleDarkModeChange();
  }, [handleDarkModeChange]);

  return (
    <main className={`${appContainerClasses}`} data-testid="app-container">
      <ThemeChangeNotification />
      <div className="m-auto max-w-[1368px] py-6 max-[1368px]:px-4">
        {children}
      </div>
    </main>
  );
}
