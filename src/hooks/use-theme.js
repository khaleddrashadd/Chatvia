import { useEffect, useState } from 'react';

const useTheme = () => {
  const storgeTheme = JSON.parse(localStorage.getItem('dark'));
  const [isDarkMode, setIsDarkMode] = useState(storgeTheme ?? false);
  useEffect(() => {
    localStorage.setItem('dark', isDarkMode);
    return () => {
      localStorage.removeItem('dark');
    };
  }, [isDarkMode]);

  const toggleTheme = theme => {
    setIsDarkMode(theme);
  };

  return { isDarkMode, toggleTheme };
};
export default useTheme;
