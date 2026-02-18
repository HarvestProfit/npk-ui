import React, { useContext, useRef, ReactNode, ComponentType, MouseEvent, forwardRef, useImperativeHandle } from 'react';
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
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  chip?: ReactNode;
  children?: ReactNode;
  className?: string;
  autoDismiss?: boolean;
  onPressStart?: (e: any) => void;
  onPressEnd?: (e: any) => void;
  onPress?: (e: any) => void;
  onClick?: (e: any) => void;
  [key: string]: any; // Allow other props
}

const BaseButton: React.FC<BaseButtonProps> = forwardRef<HTMLButtonElement, BaseButtonProps>(({
  icon,
  leadingVisual: ProvidedLeadingVisual,
  trailingVisual: ProvidedTrailingVisual,
  trailingAction: TrailingAction,
  block,
  full,
  disabled: providedDisabled,
  loading,
  size = 'md',
  truncate = false,
  align = 'center',
  as: Component = 'button',
  chip,
  children,
  className,
  ...props
}, forwardedRef) => {
  const menuContext = useMenuContext();
  const menuContentsContext = useContext<MenuContentsContextType>(MenuContentsContext);
  const internalRef = useRef<HTMLButtonElement>(null);
  let ref: any = internalRef;

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef, () => ref.current
  );

  let popoverProps = {};

  let onClick = props.onClick || props.onPress;

  if (menuContentsContext.inMenu) {
    const menuDismisableOnClick = (e: MouseEvent<HTMLElement>) => {
      if (onClick) onClick(e);
      if (menuContentsContext.onDismiss && props.autoDismiss !== false) menuContentsContext.onDismiss(e);
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

  const loadingProps = {};

  if (loading) {
    loadingProps['aria-busy'] = true;
    loadingProps['aria-label'] = `Loading${props['aria-label'] ? ` ${props['aria-label']}` : ''}...`;
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
      <Component
        ref={ref}
        className={`${classes.ControlButton} ${className || ''}`}
        disabled={disabled}
        data-alignment={align}
        data-size={size}
        data-block={block}
        data-state={state}
        data-truncate={truncate}
        data-component="button"
        type={Component === 'button' ? 'button' : undefined}
        { ...props }
        {...loadingProps}
        { ...popoverProps }
        >
        <span data-component="contents" data-icon={!!(!children && (TrailingVisual || LeadingVisual))}>
          {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual aria-hidden="true" />}</span>}
          {textLoading}
          {children && <span data-component="text" data-text-contents={`${children}`}>{children}</span>}
          {TrailingVisual && <span data-component="trailingVisual">{React.isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual aria-hidden="true" />}</span>}
        </span>
        {TrailingAction && <span data-component="trailingAction">{React.isValidElement(TrailingAction) ? TrailingAction : <TrailingAction aria-hidden="true" />}</span>}
      </Component>
      {props['aria-label'] && popoverProps['aria-expanded'] !== 'true' && (
        <Tooltip targetRef={internalRef}>
          {loadingProps['aria-label'] || props['aria-label']}
        </Tooltip>
      )}
    </>
  );
});

BaseButton.displayName = 'BaseButton';

export default BaseButton;
export type { BaseButtonProps };
