import React, { useContext, ReactNode } from 'react';
import classes from '../SegmentedControl.module.css';
import { SegmentedControlContext } from '../SegmentedControl';
import BaseButton, { BaseButtonProps } from '../../BaseButton';

interface ButtonProps extends BaseButtonProps {
  leadingVisual?: any;
  icon?: any;
  loading?: boolean;
  children: ReactNode;
  chip?: ReactNode;
  'aria-label'?: string;
  [key: string]: any; // Allow other props
}

const Button: React.FC<ButtonProps> = ({
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
      >
        {children}
      </BaseButton>
    </li>
  );
}

export default Button;
export type { ButtonProps };