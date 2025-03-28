import React, { useContext, useRef, ReactNode, ComponentType, MouseEvent } from 'react';
import classes from './BaseButton.module.css';
import { Spinner, Tooltip } from '..';
import { useMenuContext } from '../Menu';
import { MenuContentsContext, MenuContentsContextType } from '../Menu/MenuContext';
import { usePress } from '@react-aria/interactions';

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
  onPressStart?: (e: any) => void;
  onPressEnd?: (e: any) => void;
  onPress?: (e: any) => void;
  onClick?: (e: any) => void;
  [key: string]: any; // Allow other props
}

const usePressHandlers = ({ onPress, onClick, ...props}: BaseButtonProps) => {
  let { pressProps, isPressed } = usePress({
    onPressStart: props.onPressStart,
    onPressEnd: props.onPressEnd,
    onPress: onPress || onClick
  });

  return { pressProps: { ...props, ...pressProps }, isPressed };
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

  let onClick = props.onPress || props.onClick;

  if (menuContentsContext.inMenu) {
    const menuDismisableOnClick = (e: MouseEvent<HTMLElement>) => {
      if (onClick) onClick(e);
      if (menuContentsContext.onDismiss) menuContentsContext.onDismiss(e);
    };

    popoverProps = { onPress: menuDismisableOnClick };
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

  const { pressProps, isPressed } = usePressHandlers({ ...props , ...popoverProps });

  if (!state && isPressed) state = 'active';

  return (
    <>
      <Component ref={ref} className={`${classes.ControlButton} ${className || ''}`} disabled={disabled} data-alignment={align} data-size={size} data-block={block} data-state={state} data-component="button" type={Component === 'button' ? 'button' : undefined} {...pressProps}>
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