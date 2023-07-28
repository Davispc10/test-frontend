import { GiMoon } from 'react-icons/gi';
import { FaSun } from 'react-icons/fa';
import { useContext, useMemo, useCallback } from 'react';
import { ContextWrapper } from './AppContext';

export default function ThemeChangeNotification() {
  const { isDarkMode } = useContext(ContextWrapper);

  const icon = useMemo(() => {
    return isDarkMode ? (
      <GiMoon className="text-gray-100 text-[3rem] animate-scaleIn" />
    ) : (
      <FaSun className="text-gray-100 text-[3rem] animate-scaleIn" />
    );
  }, [isDarkMode]);

  const renderIcon = useCallback(() => {
    return icon;
  }, [icon]);

  return (
    <div className="absolute inset-0 flex justify-center items-center -z-10">
      {renderIcon()}
    </div>
  );
}
