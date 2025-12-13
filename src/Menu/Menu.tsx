import React, { forwardRef, useContext, useEffect, ReactNode, CSSProperties } from 'react';
import ThemeContext, { ThemeContextType } from '../ThemeContext';
import classes from './Menu.module.css';
import MenuContext, { MenuContentsContext, useMenuContext, MenuContentsContextType } from './MenuContext';
import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import usePopover from './usePopover';
import Button from '../Button';

interface MenuProps {
  children: ReactNode;
  variant?: 'select' | 'menu' | 'dark' | null;
  arrow?: boolean | null;
  autoDismiss?: boolean | 'menu';
  placement?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  initialFocus?: number;
  onOpen?: () => void;
  onClose?: () => void;
  [key: string]: any; // Allow other props
}

function placementFromContextPlacement(placement: string | undefined): string {
  if (!placement) return 'bottom-start';
  return placement.includes('end') ? 'left-start' : 'right-start';
}

const Menu: React.FC<MenuProps> & {
  Overlay: React.FC<MenuOverlayProps>;
  Divider: React.FC<MenuDividerProps>;
  Section: React.FC<MenuSectionProps>;
  List: React.FC<MenuListProps>;
  Item: React.FC<MenuItemProps>;
  Header: React.FC<MenuHeaderProps>;
  Footer: React.FC<MenuFooterProps>;
  useAnchor: (props?: Record<string, any>) => [React.Ref<any>, Record<string, any>];
  Anchor: React.FC<MenuAnchorProps>;
} = ({ children, variant = null, arrow = null, autoDismiss = true, placement, initialFocus = 0, onOpen, onClose, ...restOptions }) => {
  const menuContentsContext = useContext<MenuContentsContextType>(MenuContentsContext);

  const popover = usePopover({ 
    showArrow: arrow || (variant === 'menu' ? true : false), 
    autoDismiss, 
    initialFocus,
    submenu: menuContentsContext.inMenu,
    placement: placement || placementFromContextPlacement(menuContentsContext.placement),
    variant: menuContentsContext.variant,
    ...restOptions
  });

  useEffect(() => {
    if (popover.refs?.reference?.current) {
      if (onOpen && popover.open) onOpen();
      if (onClose && !popover.open) onClose();
    }
  }, [popover.open]);

  const menuContentsOptions: Partial<MenuContentsContextType> = {};
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

interface MenuOverlayProps {
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: any; // Allow other props
}

Menu.Overlay = forwardRef<HTMLDivElement, MenuOverlayProps>(({ children, style, ...props }, forwardedRef) => {
  const theme = useContext<ThemeContextType>(ThemeContext);

  const menuContext = useMenuContext();
  const menuContentsContext = useContext(MenuContentsContext);
  const ref = menuContext.useMergeRefs([menuContext.refs.setFloating, forwardedRef]);

  if (!menuContext.open) return null;

  return (
    <FloatingPortal id={theme.appendRootId}>
      <FloatingFocusManager context={menuContext.context} modal={menuContext.context.modal} initialFocus={menuContext.initialFocus}>
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
              <Button.Context value={{}}>
                {children}
              </Button.Context>
            </MenuContentsContext.Provider>
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
});

Menu.displayName = 'Menu';

Menu.useAnchor = (props = {}) => {
  const menuContext = useMenuContext();
  return [menuContext.refs.setReference, {...menuContext.getReferenceProps(props)}]
}

interface MenuAnchorProps {
  render?: (args: [React.Ref<any>, any]) => ReactNode;
}

Menu.Anchor = ({ render }: MenuAnchorProps) => {
  const [ref, props] = Menu.useAnchor();
  if (render) {
    return render([ref, props]);
  }

  return (<span ref={ref} />)
}

Menu.Anchor.displayName = "Menu.Anchor";

Menu.Overlay.displayName = "Menu.Overlay";

interface MenuDividerProps {
  className?: string;
  [key: string]: any; // Allow other props
}

Menu.Divider = ({ className = '', ...props }: MenuDividerProps) => (
  <hr className={`${classes.Divider} ${className}`} {...props} />
);
Menu.Divider.displayName = "Menu.Divider";

interface MenuSectionProps {
  className?: string;
  children: ReactNode;
  [key: string]: any; // Allow other props
}

Menu.Section = ({ className = '', children, ...props }: MenuSectionProps) => (
  <div className={`${classes.Section} ${className}`} {...props}>
    {children}
  </div>
);
Menu.Section.displayName = "Menu.Section";

interface MenuListProps {
  className?: string;
  [key: string]: any; // Allow other props
}

Menu.List = ({ className = '', ...props }: MenuListProps) => (
  <div className={`${classes.List} ${className}`} {...props} />
);
Menu.List.displayName = "Menu.List";

interface MenuItemProps {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  block?: boolean;
  className?: string;
  [key: string]: any; // Allow other props
}

Menu.Item = ({ as: Tag = 'div', block, className = '', ...props }: MenuItemProps) => {
  return (
    <MenuContentsContext.Provider value={{ inMenu: false }}>
      <MenuContext.Provider value={{ menu: false }}>
        <Tag data-block={block} className={`${classes.Item} ${className}`} {...props} />
      </MenuContext.Provider>
    </MenuContentsContext.Provider>
  );
}
Menu.Item.displayName = "Menu.Item";

interface MenuHeaderProps {
  className?: string;
  [key: string]: any; // Allow other props
}

Menu.Header = ({ className = '', ...props }: MenuHeaderProps) => (
  <Menu.Item as="header" className={`${classes.Header} ${className}`} {...props} />
);
Menu.Header.displayName = "Menu.Header";

interface MenuFooterProps {
  className?: string;
  [key: string]: any; // Allow other props
}

Menu.Footer = ({ className = '', ...props }: MenuFooterProps) => (
  <Menu.Item as="footer" className={`${classes.Footer} ${className}`} {...props} />
);
Menu.Footer.displayName = "Menu.Footer";

export default Menu;

export type { MenuProps, MenuOverlayProps, MenuDividerProps, MenuSectionProps, MenuListProps, MenuItemProps, MenuHeaderProps, MenuFooterProps };