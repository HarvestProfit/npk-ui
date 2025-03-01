import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, variant="normal", block, className = '', style = {} }) => (
  <div className={`${classes.Card} ${className}`} style={style} data-block={block} data-component="card" data-variant={variant}>
    {children}
  </div>
)

Card.Header = ({ title, children, variant="underlined", as: Tag = 'h3', size = 'md' }) => (
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
