import React, { forwardRef, useContext } from 'react';
import ThemeContext from '../ThemeContext';
import classes from './Menu.module.css';
import MenuContext, { MenuContentsContext, useMenuContext } from './MenuContext';
import Button from '../Button';
import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import * as Icons from '@harvest-profit/npk/icons/regular';
import usePopover from './usePopover';

function placementFromContextPlacement(placement) {
  if (!placement) return 'bottom-start';
  return placement.includes('end') ? 'left-start' : 'right-start';
}

const Menu = ({ children, variant = null, arrow = null, autoDismiss = true, placement, ...restOptions }) => {
  const menuContentsContext = useContext(MenuContentsContext);

  const popover = usePopover({ 
    showArrow: arrow || (variant === 'menu' ? true : false), 
    autoDismiss, 
    submenu: menuContentsContext.inMenu,
    placement: placement || placementFromContextPlacement(menuContentsContext.placement),
    variant: menuContentsContext.variant,
    ...restOptions
  });

  const menuContentsOptions = {};
  if (autoDismiss === true || autoDismiss === 'menu') {
    menuContentsOptions.onDismiss = () => {
      popover.setOpen(false);
      if (autoDismiss === true && menuContentsContext.onDismiss) menuContentsContext.onDismiss();
    };
  }

  return (
    <MenuContentsContext.Provider value={{ inMenu: false, ...menuContentsOptions, variant: variant || menuContentsContext.variant }}>
      <MenuContext.Provider value={popover}>
        {children}
      </MenuContext.Provider>
    </MenuContentsContext.Provider>
  )
}

Menu.Overlay = forwardRef(({ children, style, ...props }, forwardedRef) => {
  const theme = useContext(ThemeContext);

  const menuContext = useMenuContext();
  const menuContentsContext = useContext(MenuContentsContext);
  const ref = menuContext.useMergeRefs([menuContext.refs.setFloating, forwardedRef]);

  if (!menuContext.open) return null;

  return (
    <FloatingPortal id={theme.appendRootId}>
      <FloatingFocusManager context={menuContext.context} modal={menuContext.context.modal}>
        <div 
          ref={ref}
          style={{...menuContext.floatingStyles, ...style}}
          className={classes.Overlay}
          data-component={menuContext.submenu ? 'submenu' : 'menu'}
          data-variant={menuContentsContext.variant}
          aria-labelledby={menuContext.labelId}
          aria-describedby={menuContext.descriptionId}
          {...menuContext.getFloatingProps(props)}
        >

          {menuContext.showArrow && <FloatingArrow data-component="menu-arrow" fill="currentColor" stroke="var(--menu-border-color)" strokeWidth={1} tipRadius={1} ref={menuContext.arrowRef} context={menuContext.context} />}
          <div data-component="menu-contents">
            <MenuContentsContext.Provider value={{ ...menuContentsContext, variant: menuContentsContext.variant, placement: menuContext.placement, inMenu: true }}>
              {children}
            </MenuContentsContext.Provider>
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
});

Menu.Overlay.displayName = "Menu.Overlay";

Menu.Divider = ({className = '', ...props}) => (
  <hr className={`${classes.Divider} ${className}`} {...props} />
);

Menu.Divider.displayName = "Menu.Divider";

Menu.Section = ({className = '', children, ...props}) => (
  <div className={`${classes.Section} ${className}`} {...props}>
    {children}
  </div>
);

Menu.Section.displayName = "Menu.Section";

export default Menu;
