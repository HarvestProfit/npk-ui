import React from 'react';
import classes from './Switch.module.css';

const CheckboxWrapper = ({ labelChildren, children }) => {
  if (!labelChildren) return children;
  return <label>{children}<span>{labelChildren}</span></label>;
};

const Switch = ({ className, id, onClick, value, children, variant="default", size="md", position="leading", ...props }) => {
  return (
    <div {...props} data-variant={variant} data-size={size} data-position={position} className={`${classes.Switch} ${className}`} onClick={onClick}>
      <CheckboxWrapper labelChildren={children}>
        <input id={id} type="checkbox" checked={value} readOnly aria-readonly="true" />
      </CheckboxWrapper>
      <span data-active={value} className={classes.Slider} />
    </div>
  );
}

export default Switch;