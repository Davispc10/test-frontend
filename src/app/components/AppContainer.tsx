'use client';

import { useEffect } from 'react';
import ThemeChangeNotification from './ThemeChangeNotification';
import useDarkModeChange from '../hooks/useDarkMode';

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  const { handleDarkModeChange, appContainerClasses } = useDarkModeChange();

  useEffect(() => {
    handleDarkModeChange();
  }, [handleDarkModeChange]);

  return (
    <div className={`${appContainerClasses}`}>
      <ThemeChangeNotification />
      <div className="max-w-[1368px] max-[1368px]:px-4 m-auto py-6">
        {children}
      </div>
    </div>
  );
}
