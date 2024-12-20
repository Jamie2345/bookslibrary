import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    // Read the theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Set the data-theme attribute on the document element
    document.documentElement.setAttribute("data-theme", theme);
    // Store the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (theme: string) => {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
