import React, { ReactNode, CSSProperties, FC } from 'react';
import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
  variant?: 'muted' | 'invisible' | 'normal'; // Add other variants as needed
  block?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface CardHeaderProps {
  title?: string;
  children: ReactNode;
  variant?: 'underlined' | 'plain' | 'inset'; // Add other variants as needed
  as?: keyof JSX.IntrinsicElements;
  size?: 'md' | 'lg'; // Add other sizes as needed
}

interface CardItemProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

interface CardHeaderActionsProps {
  children: ReactNode;
}

const Card: FC<CardProps> & {
  Header: FC<CardHeaderProps>;
  Footer: FC<CardItemProps>;
  Divider: FC<CardItemProps>;
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

Card.Footer = ({ children, as: Tag = 'div' }) => (
  <Tag data-component="card-footer">
    {children}
  </Tag>
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

Card.Divider = () => (
  <div data-component="card-divider" />
)
export default Card;
export type { CardProps, CardHeaderProps, CardItemProps, CardHeaderActionsProps };
