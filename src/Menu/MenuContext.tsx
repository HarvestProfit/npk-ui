import { useMergeRefs } from '@floating-ui/react';
import React, { createContext, useContext, CSSProperties } from 'react';

interface MenuContextType {
  menu?: boolean;
  open?: boolean;
  refs?: {
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
    reference?: any;
    floating?: any;
  };
  setOpen?: (open: boolean) => void;
  context?: any,
  floatingStyles?: CSSProperties;
  getFloatingProps?: (any) => Record<string, any>;
  getReferenceProps?: (any) => Record<string, any>;
  useMergeRefs?: typeof useMergeRefs;
  initialFocus?: any;
  submenu?: boolean;
  labelId?: string | null;
  descriptionId?: string | null;
  showArrow?: boolean;
  arrowRef?: any;
  placement?: string;
  variant?: string;
  role?: string;
}

const MenuContext = createContext<MenuContextType | null>(null);

export default MenuContext;

interface MenuContentsContextType {
  inMenu: boolean;
  variant?: string;
  role?: 'dialog' | 'menu' | 'listbox',
  placement?: string;
  onDismiss?: (any?) => void;
}

export const MenuContentsContext = createContext<MenuContentsContextType>({ inMenu: false });

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);

  if (!context) {
    return {
      menu: false,
      refs: {
        setReference: () => null,
        setFloating: () => null
      },
      floatingStyles: {},
      getFloatingProps: () => ({}),
      getReferenceProps: () => ({}),
      useMergeRefs
    };
  }
  return context;
};

export const Reset: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MenuContext.Provider value={null}>
      <MenuContentsContext.Provider value={{ inMenu: false }}>
        {children}
      </MenuContentsContext.Provider>
    </MenuContext.Provider>
  );
};

export { MenuContextType, MenuContentsContextType }
