import { useContext, useMemo, useCallback } from 'react';
import { ContextWrapper } from '../components/AppContext';
import { GiMoon } from 'react-icons/gi';
import { FaSun } from 'react-icons/fa';

export default function useDarkMode() {
  const { setIsDarkMode, isDarkMode } = useContext(ContextWrapper);

  const headerFooterClasses = useMemo(
    () => (isDarkMode ? 'bg-dark text-white' : 'bg-marvel-primary text-white'),
    [isDarkMode]
  );

  const appContainerClasses = useMemo(
    () =>
      isDarkMode ? 'dark-gradient text-white' : 'light-gradient text-black',
    [isDarkMode]
  );

  const DarkModeIcons = useCallback(() => {
    return (
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={setDarkMode}
      >
        {isDarkMode ? (
          <FaSun className="text-white text-2xl animate-scaleIn" />
        ) : (
          <GiMoon className="text-white text-2xl animate-scaleIn" />
        )}
      </div>
    );
  }, [isDarkMode]);

  function setDarkMode() {
    typeof window !== 'undefined' &&
      localStorage.setItem('darkMode', `${!isDarkMode}`);
    setIsDarkMode(!isDarkMode);
  }

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
    headerFooterClasses,
    appContainerClasses,
    DarkModeIcons,
  };
}
