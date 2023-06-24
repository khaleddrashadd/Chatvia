import { useState } from 'react';

const useTheme = () => {
  const storgeTheme = JSON.parse(localStorage.getItem('dark'));
  const [isDarkMode, setIsDarkMode] = useState(storgeTheme ?? false);
  
  const toggleTheme = theme => {
    setIsDarkMode(theme);
    localStorage.setItem('dark', theme);
  };

  return { isDarkMode, toggleTheme };
};
export default useTheme;
