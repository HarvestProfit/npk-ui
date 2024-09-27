import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from '../ThemeContext';
import classes from './ApplicationAlert.module.css';

const ApplicationAlert = ({ variant = 'default', icon: Icon, as: Component = 'div', children, ...props }) => {
  const theme = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.getElementById(theme.prependRootId)) {
      setMounted(true);
    }
  }, [theme.prependRootId])


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
    document.getElementById(theme.prependRootId),
  );
}

export default ApplicationAlert;
