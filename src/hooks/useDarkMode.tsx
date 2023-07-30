import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FaSun } from 'react-icons/fa';
import { GiMoon } from 'react-icons/gi';

import { ContextWrapper } from '../components/AppContext';

export default function useDarkMode() {
  const { setIsDarkMode, isDarkMode } = useContext(ContextWrapper);

  const appContainerClasses = useMemo(
    () =>
      isDarkMode
        ? `bg-dark-comics bg-contain text-white overflow-y-scroll h-calc`
        : 'bg-light-comics bg-contain text-black overflow-y-scroll h-calc animate-moveEffect',
    [isDarkMode]
  );

  const colorClasses = useMemo(
    () => (isDarkMode ? 'bg-dark text-white' : 'bg-marvel-primary text-white'),
    [isDarkMode]
  );

  const buttonColorClasses = useMemo(
    () =>
      isDarkMode ? 'bg-dark-light text-white' : 'bg-marvel-primary text-white',
    [isDarkMode]
  );

  const characterContainerClasses = useMemo(
    () =>
      !isDarkMode
        ? 'bg-[#f2f2f2] w-fit p-5 rounded-lg shadow-3xl border-4'
        : 'bg-[#202020] w-fit p-5 rounded-lg shadow-3xl',
    [isDarkMode]
  );

  const setDarkMode = useCallback(() => {
    typeof window !== 'undefined' &&
      localStorage.setItem('darkMode', `${!isDarkMode}`);
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  const DarkModeIcons = useCallback(() => {
    return (
      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={setDarkMode}
      >
        {isDarkMode ? (
          <FaSun className="animate-scaleIn text-2xl text-white" />
        ) : (
          <GiMoon className="animate-scaleIn text-2xl text-white" />
        )}
      </div>
    );
  }, [isDarkMode, setDarkMode]);

  function handleDarkModeChange() {
    const darkMode =
      typeof window !== 'undefined' && localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }

  return {
    handleDarkModeChange,
    DarkModeIcons,
    colorClasses,
    appContainerClasses,
    characterContainerClasses,
    buttonColorClasses,
  };
}
