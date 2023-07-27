'use client';

import { createContext, useState, useMemo } from 'react';

type TConextWrapper = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const ContextWrapper = createContext<TConextWrapper>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

interface AppContextProps {
  children: React.ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const memoizedValue = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
    }),
    [isDarkMode, setIsDarkMode]
  );

  return (
    <ContextWrapper.Provider value={memoizedValue}>
      {children}
    </ContextWrapper.Provider>
  );
}
