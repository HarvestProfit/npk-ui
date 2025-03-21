import React, { createContext, ReactNode } from "react";

interface ThemeContextType {
  prependRootId: string;
  appendRootId: string;
  currencySymbol: string;
}

const defaultConfig: ThemeContextType = {
  prependRootId: 'app-prepend-root',
  appendRootId: 'app-append-root',
  currencySymbol: '$',
};

const ThemeContext = createContext<ThemeContextType>(defaultConfig);

export default ThemeContext;

interface ThemeContextProviderProps {
  config?: Partial<ThemeContextType>;
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ config = {}, children }) => (
  <ThemeContext.Provider value={{ ...defaultConfig, ...config }}>
    {children}
  </ThemeContext.Provider>
);

export type { ThemeContextType, ThemeContextProviderProps };