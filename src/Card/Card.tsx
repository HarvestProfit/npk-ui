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
  sticky?: boolean; // Stick the header to the top of the screen when scrolling
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
} = ({ children, variant = 'normal', block, className = '', style = {}, ...props }) => (
  <div className={`${classes.Card} ${className}`} {...props} style={style} data-block={block} data-component="card" data-variant={variant}>
    {children}
  </div>
);

Card.displayName = 'Card';

Card.Header = ({ title, children, variant = 'underlined', as: Tag = 'h3', size = 'md', sticky = false }) => (
  <div data-component="card-header" data-variant={variant} data-size={size} data-sticky={sticky}>
    {title && <Tag data-component="card-header-text">{title}</Tag>}
    {children}
  </div>
);

Card.Header.displayName = 'Card.Header';

Card.Footer = ({ children, as: Tag = 'div' }) => (
  <Tag data-component="card-footer">
    {children}
  </Tag>
);

Card.Footer.displayName = 'Card.Footer';

Card.HeaderLeadingActions = ({ children }) => (
  <div data-component="card-header-leadingActions">
    {children}
  </div>
);

Card.HeaderLeadingActions.displayName = 'Card.HeaderLeadingActions';

Card.HeaderTrailingActions = ({ children }) => (
  <div data-component="card-header-trailingActions">
    {children}
  </div>
);

Card.HeaderTrailingActions.displayName = 'Card.HeaderTrailingActions';

Card.Divider = () => (
  <div data-component="card-divider" />
)

Card.Divider.displayName = 'Card.Divider';
export default Card;
export type { CardProps, CardHeaderProps, CardItemProps, CardHeaderActionsProps };
