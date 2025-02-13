import { useMergeRefs } from '@floating-ui/react';
import React from 'react';

const MenuContext = React.createContext(null);

export default MenuContext;
export const MenuContentsContext = React.createContext({ isMenu: false });

export const useMenuContext = () => {
  const context = React.useContext(MenuContext);

  if (!context) {
    return {
      menu: false,
      refs: {
        setReference: () => null
      },
      floatingStyles: {},
      getFloatingProps: () => ({}),
      getReferenceProps: () => {},
      useMergeRefs
    }
  }
  return context;
};