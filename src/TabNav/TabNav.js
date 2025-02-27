import React, { createContext, useContext, useRef } from 'react';
import styles from './TabNav.module.css';
import { Tooltip } from '..';

const TabNavContext = createContext({ active: null });

const TabNav = ({ children, className = '', block = false, active = null, onChange= () => null }) => (
  <nav className={`${styles.TabNav} ${className}`} data-component="tabnav" data-block={block}>
    <TabNavContext.Provider value={{ active: active?.toLowerCase(), onChange }}>
      <ul className={styles.TabNavList}>
        {children}
      </ul>
    </TabNavContext.Provider>
  </nav>
)

TabNav.NavItem = ({ children, value = null, leadingVisual: LeadingVisual = null, active = null, ...props }) => {
  const ctx = useContext(TabNavContext);
  const navRef = useRef();

  const name = children.toString().toLowerCase().replaceAll('[object object]', '');

  const isActive = (active || ctx.active === (value || name));

  return (
    <>
      <li ref={navRef} data-active={isActive} onClick={() => ctx.onChange(value || name)} aria-label={props['aria-label'] || name}>
        {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
        <span data-component="text">{children}</span>
      </li>
      {props['aria-label'] && <Tooltip targetRef={navRef}>{props['aria-label']}</Tooltip>}
    </>
  );
}

export default TabNav;
