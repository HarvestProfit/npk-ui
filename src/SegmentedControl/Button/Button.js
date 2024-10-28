import React, { useContext } from 'react';
import classes from '../SegmentedControl.module.css';
import { SegmentedControlContext } from '../SegmentedControl';
import { BaseButton } from '../..';

const Button = ({
  leadingVisual,
  icon,
  loading,
  children,
  chip,
  ...props
}) => {
  const ctrContext = useContext(SegmentedControlContext);
  return (
    <li data-selected={ctrContext.selected}>
      <BaseButton
        className={classes.SegmentedControlButton}
        icon={icon}
        leadingVisual={leadingVisual}
        onClick={() => ctrContext.onChange(ctrContext.index)}
        loading={loading}
        chip={chip}
        aria-label={props['aria-label']}
      >{children}</BaseButton>
    </li>
  )
}

export default Button;
