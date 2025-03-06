import React, { ReactNode } from 'react';
import classes from './Badge.module.css';
import BaseButton, { BaseButtonProps } from '../BaseButton';

interface BadgeProps extends BaseButtonProps {
  children: ReactNode;
  color: 'preview' | 'purple' | 'green' | 'blue' | 'red' | 'brown' | 'orange';
  className?: string;
  as?: any;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  color,
  as,
  ...props
}) => (
  <BaseButton
    className={`${classes.Badge} ${className}`}
    data-color={color}
    data-actionable={props.onClick ? true : false}
    as={as || (props.onClick ? true : false) ? 'button' : 'span'}
    {...props}
  >
    {children}
  </BaseButton>
);

export default Badge;
export type { BadgeProps };