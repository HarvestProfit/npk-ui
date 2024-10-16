import React, { useRef } from 'react';
import classes from './Button.module.css';
import { Spinner, Tooltip } from '../';

const Button = ({
  variant = 'default',
  icon,
  leadingVisual: ProvidedLeadingVisual,
  trailingVisual: ProvidedTrailingVisual,
  trailingAction: TrailingAction,
  block,
  elevated,
  invisible,
  disabled: providedDisabled,
  loading,
  size = 'md',
  align = 'center',
  as: Component = 'button',
  chip,
  children,
  ...props
}) => {

  const ref = useRef();
  let LeadingVisual = ProvidedLeadingVisual;
  let TrailingVisual = ProvidedTrailingVisual;
  let textLoading;
  let disabled = providedDisabled;

  let state = '';

  if (disabled) state = 'disabled';

  if (chip) {
    TrailingVisual = <span aria-hidden="true" data-component="ButtonChip">{chip}</span>;
  }

  if (icon) {
    LeadingVisual = icon;

    if (!props['aria-label'] && !props['aria-describedby']) console.warn('Please provide a tooltip to this button.')
  }

  if (loading) {
    state = 'loading';
    disabled = true;
    if (LeadingVisual) {
      LeadingVisual = <span data-component="loading"><Spinner size="sm" /></span>;
    } else if (TrailingVisual) {
      TrailingVisual = <span data-component="loading"><Spinner size="sm" /></span>;
    } else {
      textLoading = <span data-component="loading"><Spinner size="sm" /></span>;
    }
  }

  return (
    <>
      <Component ref={ref} className={classes.Button} disabled={disabled} data-alignment={align} data-size={size} data-block={block} data-elevated={elevated} data-invisible={invisible} data-state={state} data-variant={variant} {...props}>
        <span data-component="contents" data-icon={!!(!children && (TrailingVisual || LeadingVisual))}>
          {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
          {textLoading}
          {children && <span data-component="text">{children}</span>}
          {TrailingVisual && <span data-component="trailingVisual">{React.isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}</span>}
        </span>
        {TrailingAction && <span data-component="trailingAction">{React.isValidElement(TrailingAction) ? TrailingAction : <TrailingAction />}</span>}
      </Component>
      {props['aria-label'] && (
        <Tooltip targetRef={ref}>
          {props['aria-label']}
        </Tooltip>
      )}
    </>
  )
}

export default Button;
