import React, { useContext, useRef, ReactNode, ComponentType, MouseEvent, MutableRefObject, Ref } from 'react';
import classes from './BaseButton.module.css';
import { Spinner, Tooltip } from '..';
import { useMenuContext } from '../Menu';
import { MenuContentsContext, MenuContentsContextType } from '../Menu/MenuContext';

interface BaseButtonProps {
  icon?: ComponentType;
  leadingVisual?: any;
  trailingVisual?: any;
  trailingAction?: any;
  block?: boolean;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Add other sizes as needed
  align?: 'start' | 'center' | 'end';
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  chip?: ReactNode;
  children?: ReactNode;
  className?: string;
  [key: string]: any; // Allow other props
}

const BaseButton: React.FC<BaseButtonProps> = ({
  icon,
  leadingVisual: ProvidedLeadingVisual,
  trailingVisual: ProvidedTrailingVisual,
  trailingAction: TrailingAction,
  block,
  full,
  disabled: providedDisabled,
  loading,
  size = 'md',
  align = 'center',
  as: Component = 'button',
  chip,
  children,
  className,
  ...props
}) => {
  const menuContext = useMenuContext();
  const menuContentsContext = useContext<MenuContentsContextType>(MenuContentsContext);
  const internalRef = useRef(null);
  let ref: any = internalRef;
  let popoverProps = {};

  if (menuContentsContext.inMenu) {
    const menuDismisableOnClick = (e: MouseEvent<HTMLElement>) => {
      if (props.onClick) props.onClick(e);
      if (menuContentsContext.onDismiss) menuContentsContext.onDismiss(e);
    };

    popoverProps = { onClick: menuDismisableOnClick };
  } else if (menuContext.menu) {
    popoverProps = { ...menuContext.getReferenceProps(props) };
    ref = menuContext.useMergeRefs([menuContext.refs.setReference, internalRef]);
  }

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

    if (!props['aria-label'] && !props['aria-describedby']) console.warn('Please provide a tooltip to this button.');
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
      <Component ref={ref} className={`${classes.ControlButton} ${className || ''}`} disabled={disabled} data-alignment={align} data-size={size} data-block={block} data-state={state} {...props} {...popoverProps}>
        <span data-component="contents" data-icon={!!(!children && (TrailingVisual || LeadingVisual))}>
          {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
          {textLoading}
          {children && <span data-component="text" data-text-contents={`${children}`}>{children}</span>}
          {TrailingVisual && <span data-component="trailingVisual">{React.isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}</span>}
        </span>
        {TrailingAction && <span data-component="trailingAction">{React.isValidElement(TrailingAction) ? TrailingAction : <TrailingAction />}</span>}
      </Component>
      {props['aria-label'] && (
        <Tooltip targetRef={internalRef}>
          {props['aria-label']}
        </Tooltip>
      )}
    </>
  );
};

export default BaseButton;
export type { BaseButtonProps };