import React, { createContext, ReactNode } from "react";

interface NavigationContextType {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  hrefProp?: string,
  matchWith: (href: string, locationPath: string, props: any) => boolean;
  transformPath: (href: string, locationPath: string, props: any) => string;
}

export const defaultNavigationConfig: NavigationContextType = {
  as: 'a',
  hrefProp: 'href',
  matchWith: (href: string, locationPath: string) => locationPath.endsWith(href),
  transformPath: (href: string, locationPath: string) => href,
};

const NavigationContext = createContext<NavigationContextType>(defaultNavigationConfig);

export default NavigationContext;

interface NavigationContextProviderProps {
  config?: Partial<NavigationContextType>;
  children: ReactNode;
}

export const NavigationContextProvider: React.FC<NavigationContextProviderProps> = ({ config = {}, children }) => (
  <NavigationContext.Provider value={{ ...defaultNavigationConfig, ...config }}>
    {children}
  </NavigationContext.Provider>
);

export type { NavigationContextType, NavigationContextProviderProps };
