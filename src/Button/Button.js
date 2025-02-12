import React, { useContext } from 'react';
import classes from './Button.module.css';
import { BaseButton } from '../';
import { CheckedIcon } from '@harvest-profit/npk/icons/regular';
import { useMenuContext } from '../Menu';
import { MenuContentsContext } from '../Menu/MenuContext';

function isNotSet(value) { return value === undefined || value === null; }

// assign button default values if it is part of a menu
const useButtonDefaults = (props) => {
  const filteredProps = Object.keys(props).reduce((agg, key) => (!isNotSet(props[key])) ? {...agg, [key]: props[key]} : agg, {});
  const otherProps = {};
  if (filteredProps.selected) otherProps.leadingVisual = (filteredProps.selectedIcon || CheckedIcon);

  const menuContext = useMenuContext();
  const menuContentsContext = useContext(MenuContentsContext);
 
  if (menuContext && (menuContext.submenu || menuContentsContext.inMenu)) {
    const menuVariant = menuContentsContext.inMenu ? menuContentsContext.variant : menuContext.variant
    otherProps.invisible = true;
    otherProps.align = 'start'
    otherProps.tabIndex = 1;

    if (menuVariant === 'select' || menuVariant === 'menu') otherProps.plain = true;
    if (menuVariant === 'select') otherProps.leadingVisual = (filteredProps.selectedIcon || CheckedIcon);
    if (menuVariant === 'select') otherProps.active = filteredProps.selected;
  }

  return {
    ...otherProps,
    ...filteredProps
  }
}

const Button = ({
  variant = 'default',
  elevated,
  invisible: invisibleProp,
  active: activeProp,
  plain: plainProp,
  className,
  ...props
}) => {
  const { invisible, plain, active, ...defaultProps } = useButtonDefaults({ ...props, invisible: invisibleProp, plain: plainProp, active: activeProp });


  return (<BaseButton {...defaultProps} data-elevated={elevated} data-invisible={invisible} data-variant={variant} data-active={active} data-plain={plain} className={`${classes.Button} ${className || ''}`} />)
}

export default Button;
