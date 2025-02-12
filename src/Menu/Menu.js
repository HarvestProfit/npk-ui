import React, { forwardRef, useContext, useMemo, useState } from 'react';
import ThemeContext from '../ThemeContext';
import classes from './Menu.module.css';
import { autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import MenuContext, { MenuContentsContext, useMenuContext } from './MenuContext';
import Button from '../Button';
import { FloatingFocusManager, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useMergeRefs, useRole } from '@floating-ui/react';
import * as Icons from '@harvest-profit/npk/icons/regular';

export function usePopover({
  initialOpen = false,
  placement = "bottom-start",
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      shift({ padding: 5 })
    ]
  });

  const click = useClick(data.context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(data.context);
  const role = useRole(data.context);
  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  );
}

const Menu = ({ children, variant = "dialog", autoDismiss = true, ...restOptions }) => {
  const popover = usePopover({ ...restOptions });
  const menuContentsContext = useContext(MenuContentsContext);
  const menuContentsOptions = {};

  if (autoDismiss === true || autoDismiss === 'menu') {
    menuContentsOptions.onDismiss = () => {
      popover.setOpen(false);
      if (autoDismiss === true && menuContentsContext.onDismiss) menuContentsContext.onDismiss();
    };
  }

  return (
    <MenuContentsContext.Provider value={{ inMenu: false, ...menuContentsOptions }}>
      <MenuContext.Provider value={{ popover, useMergeRefs, submenu: menuContentsContext.inMenu, variant }}>
        {children}
      </MenuContext.Provider>
    </MenuContentsContext.Provider>
  )
}

Menu.Overlay = forwardRef(({ children, style, ...props }, forwardedRef) => {
  const theme = useContext(ThemeContext);

  const menuContext = useMenuContext();
  const menuContentsContext = useContext(MenuContentsContext);
  const ref = menuContext.useMergeRefs([menuContext.popover.refs.setFloating, forwardedRef]);

  if (!menuContext.popover.open) return null;

  return (
    <FloatingPortal id={theme.appendRootId}>
      <FloatingFocusManager context={menuContext.popover.context} modal={menuContext.popover.context.modal}>
        <div 
          ref={ref} 
          style={{...menuContext.popover.floatingStyles, ...style}}
          className={classes.Overlay}
          data-component={menuContext.submenu ? 'submenu' : 'menu'}
          data-variant={menuContext.variant}
          aria-labelledby={menuContext.popover.labelId}
          aria-describedby={menuContext.popover.descriptionId}
          {...menuContext.popover.getFloatingProps(props)}
        >
          <MenuContentsContext.Provider value={{ ...menuContentsContext, inMenu: true }}>
            {children}
          </MenuContentsContext.Provider>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
})

Menu.Button = ({ selected, ...props}) => {
  const menuContext = useMenuContext();
  const menuButtonProps = {};
  if (menuContext.variant === 'select') menuButtonProps.variant = 'select';
  if (menuButtonProps.variant === 'select') menuButtonProps.leadingVisual = Icons.CheckedIcon;
  if (menuButtonProps.variant === 'select') menuButtonProps.active = selected;

  return (
    <Button tabIndex={1} invisible align="start" {...menuButtonProps} {...props} />
  )
}

Menu.Divider = ({className = '', ...props}) => (
  <hr className={`${classes.Divider} ${className}`} {...props} />
);

Menu.Section = ({className = '', children, ...props}) => (
  <div className={`${classes.Section} ${className}`} {...props}>
    {children}
  </div>
);

export default Menu;
