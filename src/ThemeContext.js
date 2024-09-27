import React, { createContext } from "react";

const defaultConfig = {
  prependRootId: 'app-prepend-root'
}

const ThemeContext = createContext(defaultConfig);

export default ThemeContext;

export const ThemeContextProvider = ({ config = {}, children }) => (
  <ThemeContext.Provider value={{ ...defaultConfig, ...config }}>
    {children}
  </ThemeContext.Provider>
)