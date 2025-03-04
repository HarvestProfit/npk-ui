import React, { ReactNode, CSSProperties, FC } from 'react';
import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
  variant?: 'normal' | 'otherVariant'; // Add other variants as needed
  block?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface CardHeaderProps {
  title?: string;
  children: ReactNode;
  variant?: 'underlined' | 'otherVariant'; // Add other variants as needed
  as?: keyof JSX.IntrinsicElements;
  size?: 'sm' | 'md' | 'lg'; // Add other sizes as needed
}

interface CardHeaderActionsProps {
  children: ReactNode;
}

const Card: FC<CardProps> & {
  Header: FC<CardHeaderProps>;
  HeaderLeadingActions: FC<CardHeaderActionsProps>;
  HeaderTrailingActions: FC<CardHeaderActionsProps>;
} = ({ children, variant = 'normal', block, className = '', style = {} }) => (
  <div className={`${classes.Card} ${className}`} style={style} data-block={block} data-component="card" data-variant={variant}>
    {children}
  </div>
);

Card.Header = ({ title, children, variant = 'underlined', as: Tag = 'h3', size = 'md' }) => (
  <div data-component="card-header" data-variant={variant} data-size={size}>
    {title && <Tag data-component="card-header-text">{title}</Tag>}
    {children}
  </div>
);

Card.HeaderLeadingActions = ({ children }) => (
  <div data-component="card-header-leadingActions">
    {children}
  </div>
);

Card.HeaderTrailingActions = ({ children }) => (
  <div data-component="card-header-trailingActions">
    {children}
  </div>
);

export default Card;
