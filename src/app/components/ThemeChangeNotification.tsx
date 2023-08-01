import { useCallback, useContext, useMemo } from 'react';
import { FaSun } from 'react-icons/fa';
import { GiMoon } from 'react-icons/gi';

import { ContextWrapper } from './AppContext';

export default function ThemeChangeNotification() {
  const { isDarkMode } = useContext(ContextWrapper);

  const icon = useMemo(() => {
    return isDarkMode ? (
      <GiMoon className="animate-scaleIn text-[3rem] text-gray-100" />
    ) : (
      <FaSun className="animate-scaleIn text-[3rem] text-gray-100" />
    );
  }, [isDarkMode]);

  const renderIcon = useCallback(() => {
    return icon;
  }, [icon]);

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      {renderIcon()}
    </div>
  );
}
