import React, { createContext, forwardRef, useContext } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import classes from './Button.module.css';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import { CheckedIcon } from '@harvest-profit/npk/icons/regular';
import { useMenuContext, Reset as MenuReset } from '../Menu';
import { MenuContentsContext, MenuContentsContextType } from '../Menu/MenuContext';

interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'danger' | 'secondary'; // Add other variants as needed
  elevated?: boolean;
  invisible?: boolean;
  active?: boolean;
  plain?: boolean;
  className?: string;
  selected?: boolean;
  selectedIcon?: any;
  leadingVisual?: any;
  [key: string]: any; // Allow other props
}

const ButtonContext = createContext({} as ButtonProps);

function isNotSet(value: any): boolean {
  return value === undefined || value === null;
}

// assign button default values if it is part of a menu
const useButtonDefaults = (props: ButtonProps): ButtonProps => {
  const filteredProps = Object.keys(props).reduce((agg, key) => (!isNotSet(props[key])) ? { ...agg, [key]: props[key] } : agg, {} as ButtonProps);
  const otherProps: ButtonProps = {};
  if (filteredProps.selected) otherProps.leadingVisual = (filteredProps.selectedIcon || CheckedIcon);

  const menuContext = useMenuContext();
  const menuContentsContext = useContext<MenuContentsContextType>(MenuContentsContext);

  if (menuContext && (menuContext.submenu || menuContentsContext.inMenu)) {
    const menuVariant = menuContentsContext.inMenu ? menuContentsContext.role : menuContext.role;
    otherProps.invisible = true;
    otherProps.align = 'start';
    otherProps.tabIndex = 1;

    console.log('in menu', menuContext);

    if (menuVariant === 'listbox' || menuVariant === 'menu') otherProps.plain = true;
    if (menuVariant === 'listbox') otherProps.leadingVisual = (filteredProps.selectedIcon || CheckedIcon);
    if (menuVariant === 'listbox') otherProps.active = filteredProps.selected;
    if (menuVariant === 'listbox') otherProps.role = 'option';
    if (menuVariant === 'listbox' && filteredProps.selected) otherProps['aria-selected'] = true;
  }

  const buttonContextDefaults = useContext(ButtonContext) || {};
  otherProps.variant ||= 'secondary';

  return {
    ...otherProps,
    ...buttonContextDefaults,
    ...filteredProps,
  };
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(({
  variant: variantProp,
  elevated,
  invisible: invisibleProp,
  active: activeProp,
  plain: plainProp,
  className,
  ...props
}, forwardedRef) => {

  const { invisible, plain, active, variant, ...defaultProps } = useButtonDefaults({ ...props, invisible: invisibleProp, plain: plainProp, active: activeProp, variant: variantProp });

  return (
    <BaseButton
      {...defaultProps}
      ref={forwardedRef}
      data-elevated={elevated}
      data-invisible={invisible}
      data-variant={variant}
      data-active={active}
      data-plain={plain}
      className={`${classes.Button} ${className || ''}`}
    />
  );
}) as ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & RefAttributes<HTMLDivElement>> & { Context: React.Provider<ButtonProps>, Reset: React.FC<{ children: React.ReactNode }> };

Button.Context = ButtonContext.Provider;

Button.Reset = ({ children }) => {
  return (
    <ButtonContext.Provider value={{}}>
      <MenuReset>
        {children}
      </MenuReset>
    </ButtonContext.Provider>
  )
}

Button.displayName = 'Button';

export default Button;

export type { ButtonProps };
