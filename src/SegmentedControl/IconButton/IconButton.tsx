import React, { useContext } from 'react';
import classes from '../SegmentedControl.module.css';
import { SegmentedControlContext } from '../SegmentedControl';
import BaseButton, { BaseButtonProps } from '../../BaseButton';

interface IconButtonProps extends BaseButtonProps {
  icon: any;
  loading?: boolean;
  'aria-label': string;
  [key: string]: any; // Allow other props
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  loading,
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
        {...props}
      />
    </li>
  );
}

export default IconButton;
export type { IconButtonProps };