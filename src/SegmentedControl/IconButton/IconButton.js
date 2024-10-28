import React, { useContext } from 'react';
import classes from '../SegmentedControl.module.css';
import { SegmentedControlContext } from '../SegmentedControl';
import { BaseButton } from '../..';

const IconButton = ({
  icon,
  loading,
  children,
  ...props
}) => {
  const ctrContext = useContext(SegmentedControlContext);
  if (!props['aria-label']) {
    console.error('aria-label was not provided to IconButton');
  }

  return (
    <li data-selected={ctrContext.selected}>
      <BaseButton
        className={classes.SegmentedControlButton}
        icon={icon}
        onClick={() => ctrContext.onChange(ctrContext.index)}
        loading={loading}
        aria-label={props['aria-label']}
      />
    </li>
  )
}


export default IconButton;
