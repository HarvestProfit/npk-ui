import React, { HTMLAttributes, ReactNode, useContext } from 'react';
import BaseInput, { BaseInputProps } from '../BaseInput';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import ThemeContext from '../ThemeContext';
import { attemptFilledIconForIcon } from '../icons';
import classes from './Nav.module.css';
import Button from '../Button';
import NavigationContext, { defaultNavigationConfig } from './NavigationContext';

interface NavProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'underline';
  [key: string]: any; // Allow other props
}

interface NavButtonProps extends BaseButtonProps {
  ignore?: RegExp | 'string' | Function,
}

interface NavGroupProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  [key: string]: any; // Allow other props
}

const Nav: React.FC<NavProps> & {
  Button: React.FC<NavButtonProps>;
  Group: React.FC<NavGroupProps>;
} = ({ children, variant = 'underline', ...props }) => {

  return (
    <nav {...props} className={`${classes.Nav} ${props.className || ''}`} data-variant={variant} data-component="navigation">
      {variant === 'underline' ? (
        <ul data-component="nav-list">
          {children}
        </ul>
      ) : (
        <Button.Context value={{ block: true, align: 'start' }}>
          {children}
        </Button.Context>
      )}
    </nav>
  );
}

Nav.Group = ({ title = null, children, ...props }) => {
  const sectionProps = { ...props };
  let generatedId = null;
  if (title) {
    generatedId = `${props.id || ''}nav-group-${title}`.replaceAll(' ', '-').toLowerCase();
    sectionProps['aria-labelledby'] = generatedId;
  } else {
    if (!sectionProps['aria-label']) console.warn('Please provide an aria-label for this nav group.');
  }
  return (
    <section {...sectionProps}>
      {title && <h3 id={generatedId}>{title}</h3>}
      <ul data-component="nav-list">
        {children}
      </ul>
    </section>
  )
}

Nav.Button = ({ ignore, ...props }) => {
  let navigation = useContext(NavigationContext) || defaultNavigationConfig;
  navigation = { ...defaultNavigationConfig, ...navigation };

  const href = props[navigation.hrefProp];
  let isActive = navigation.matchWith(href, window.location.pathname, props);
  if (isActive && ignore) {
    if (ignore instanceof RegExp) {
      isActive = !ignore.test(href);
    } else if (typeof ignore === 'string') {
      isActive = !href.includes(ignore);
    } else if (typeof ignore === 'function') {
      isActive = !ignore(href);
    }
  }

  const buttonProps = { ...props };
  buttonProps[navigation.hrefProp] = navigation.transformPath(buttonProps[navigation.hrefProp], window.location.pathname, props);

  if (isActive) {
    buttonProps['aria-current'] = 'page';
    if (buttonProps.leadingVisual) {
      buttonProps.leadingVisual = attemptFilledIconForIcon(buttonProps.leadingVisual) || buttonProps.leadingVisual;
    }
  }

  if (typeof buttonProps.leadingVisual === 'function' && (buttonProps.leadingVisual.name === 'leadingVisual')) {
    buttonProps.leadingVisual = buttonProps.leadingVisual({ active: isActive })
  }

  return (
    <li><Button as={navigation.as} {...buttonProps} /></li>
  )
};

Nav.displayName = 'Nav';

export default Nav;
export type { NavProps };
