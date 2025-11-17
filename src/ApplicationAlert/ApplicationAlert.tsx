import React, { useContext, useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from '../ThemeContext';
import classes from './ApplicationAlert.module.css';

interface ApplicationAlertProps {
  variant?: 'default' | 'primary'; // Add other variants as needed
  icon?: any;
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  children: ReactNode;
  [key: string]: any; // Allow other props
}

const ApplicationAlert: React.FC<ApplicationAlertProps> = ({
  variant = 'default',
  icon: Icon,
  as: Component = 'div',
  children,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.getElementById(theme.prependRootId)) {
      setMounted(true);
    }
  }, [theme.prependRootId]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    (
      <Component className={classes.ApplicationAlert} data-variant={variant} {...props}>
        {Icon && <div className={classes.ApplicationAlertIcon}>{React.isValidElement(Icon) ? Icon : <Icon />}</div>}
        <p className={classes.ApplicationAlertText}>
          {children}
        </p>
      </Component>
    ),
    document.getElementById(theme.prependRootId) as HTMLElement,
  );
}

export default ApplicationAlert;
export type { ApplicationAlertProps };