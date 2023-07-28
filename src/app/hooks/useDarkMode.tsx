import { useContext, useMemo, useCallback } from 'react';
import { ContextWrapper } from '../../components/AppContext';
import { GiMoon } from 'react-icons/gi';
import { FaSun } from 'react-icons/fa';

export default function useDarkMode() {
  const { setIsDarkMode, isDarkMode } = useContext(ContextWrapper);

  const colorClasses = useMemo(
    () => (isDarkMode ? 'bg-dark text-white' : 'bg-marvel-primary text-white'),
    [isDarkMode]
  );

  const appContainerClasses = useMemo(
    () =>
      isDarkMode
        ? 'dark-gradient animate-gradient text-white'
        : 'light-comics animate-moveEffect text-black',
    [isDarkMode]
  );

  const characterContainerClasses = useMemo(
    () =>
      !isDarkMode && 'bg-[#f2f2f2] w-fit p-5 rounded-lg shadow-3xl border-4',
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
  };
}
