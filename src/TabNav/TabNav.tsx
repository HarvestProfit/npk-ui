import React, { createContext, useContext, useRef, ReactNode } from 'react';
import classes from './TabNav.module.css';
import { Tooltip } from '..';

interface TabNavContextType {
  active: string | null;
  onChange: (value: string) => void;
}

const TabNavContext = createContext<TabNavContextType>({ active: null, onChange: () => null });

interface TabNavProps {
  children: ReactNode;
  className?: string;
  block?: boolean;
  active?: string | null;
  onChange?: (value: string) => void;
}

const TabNav: React.FC<TabNavProps> & { 
  NavItem: React.FC<NavItemProps> 
} = ({ children, className = '', block = false, active = null, onChange = () => null }) => (
  <nav className={`${classes.TabNav} ${className}`} data-component="tabnav" data-block={block}>
    <TabNavContext.Provider value={{ active: active?.toLowerCase() || null, onChange }}>
      <ul className={classes.TabNavList}>
        {children}
      </ul>
    </TabNavContext.Provider>
  </nav>
);

interface NavItemProps {
  children: ReactNode;
  value?: string | null;
  leadingVisual?: any;
  active?: boolean;
  'aria-label'?: string;
  [key: string]: any; // Allow other props
}

TabNav.NavItem = ({ children, value = null, leadingVisual: LeadingVisual = null, active = null, ...props }: NavItemProps) => {
  const ctx = useContext(TabNavContext);
  const navRef = useRef<HTMLLIElement>(null);

  const name = children.toString().toLowerCase().replaceAll('[object object]', '');

  const isActive = active || ctx.active === (value || name);

  return (
    <>
      <li ref={navRef} data-active={isActive} onClick={() => ctx.onChange(value || name)} aria-label={props['aria-label'] || name}>
        {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
        <span data-component="text">{children}</span>
      </li>
      {props['aria-label'] && <Tooltip targetRef={navRef}>{props['aria-label']}</Tooltip>}
    </>
  );
};

export default TabNav;
export type { TabNavProps, NavItemProps };