import React, { ReactNode, ComponentType, Ref, HTMLAttributes, useContext, useState } from 'react';
import classes from './BaseInput.module.css';
import { useFocusWithin } from '@react-aria/interactions';

const BaseInputContext = React.createContext<BaseInputContextType>({});

export const useBaseInput = (preProps: BaseInputProps): BaseInputProps => {
  const inheritedContext = useContext(BaseInputContext);
  const props = { ...preProps };
  props['aria-label'] = preProps['aria-label'] || inheritedContext['aria-label'];
  props['aria-labelledby'] = preProps['aria-labelledby'] || inheritedContext['aria-labelledby'];
  props.disabled = preProps.disabled || inheritedContext.disabled;
  return props;
};

export const useFocusableContent = (
  props: UseFocusableContentProps,
  ref: Ref<HTMLElement> | null = null
) => {
  const [isFocused, setFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    ...props,
    onFocusWithin(e) {
      setFocused(true);
      if (props.onFocus) props.onFocus(e);
    },
    onBlurWithin(e) {
      setFocused(false);
      if (props.onBlur) props.onBlur(e);
    },
    onFocusWithinChange: props.onFocusChange,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const focusableElement =
      (ref as React.RefObject<HTMLElement>)?.current ||
      e.currentTarget.querySelector("[tabindex='0']") ||
      e.currentTarget.parentElement?.querySelector("[tabindex='0']") ||
      e.currentTarget.parentElement?.parentElement?.querySelector("[tabindex='0']");

    if (props.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!focusableElement || e.target === focusableElement) return;
    if ((e.target as Element).matches('[contentEditable="true"],[tabindex]:not([tabindex^="-"])')) return;
    if (!isFocused) {
      setTimeout(() => {
        (focusableElement as HTMLElement).focus();
      }, 0);
    } else {
      e.preventDefault();
    }
  };

  return { focusContentsProps: focusWithinProps, onMouseDown, isFocused };
};

const isPlainContents = (element: any): boolean => {
  return typeof element === 'string' || typeof element === 'number';
};

const isValidElement = (element: any): boolean => {
  return typeof element === 'string' || React.isValidElement(element);
};


const BaseInput: React.FC<BaseInputProps> = ({
  className = '',
  variant,
  as: Tag = 'span',
  disabled,
  size,
  align,
  leadingVisual: LeadingVisual,
  trailingVisual: TrailingVisual,
  children,
  contentsProps = {},
  contentsRef = () => null,
  containsSegments,
  onClick,
  onMouseDown,
  style,
  ...props
}) => {
  const inheritedContext = useContext(BaseInputContext);
  variant = variant || inheritedContext.variant;
  size = size || inheritedContext.size;
  align = align || inheritedContext.align;
  disabled = disabled || inheritedContext.disabled;
  props['aria-label'] = props['aria-label'] || inheritedContext['aria-label'];
  props['aria-labelledby'] = props['aria-labelledby'] || inheritedContext['aria-labelledby'];

  return (
    <Tag
      className={`${classes.BaseInput} ${containsSegments ? classes.SegmentedInput : ''} ${className}`}
      data-variant={variant}
      data-size={size}
      data-align={align}
      aria-disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={style}
    >
      {LeadingVisual && (
        <span
          data-component="leadingVisual"
          data-visual={isPlainContents(LeadingVisual) ? 'text' : 'visual'}
        >
          {isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}
        </span>
      )}
      <div {...contentsProps} ref={contentsRef} data-component="contents">
        <BaseInputContext.Provider
          value={{
            disabled,
            variant: 'plain',
            size,
            align,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
          }}
        >
          {children}
        </BaseInputContext.Provider>
      </div>
      {TrailingVisual && (
        <span
          data-component="trailingVisual"
          data-visual={isPlainContents(TrailingVisual) ? 'text' : 'visual'}
        >
          {isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}
        </span>
      )}
    </Tag>
  );
};

export default BaseInput;

interface BaseInputContextType {
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface UseFocusableContentProps extends HTMLAttributes<HTMLElement> {
  onFocusChange?: (any?) => void;
  onFocus?: (any?) => void;
  onBlur?: (any?) => void;
  disabled?: boolean;
}

export interface BaseInputProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  variant?: string;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  leadingVisual?: ReactNode | any;
  trailingVisual?: ReactNode | any;
  children?: ReactNode;
  contentsProps?: HTMLAttributes<HTMLDivElement>;
  contentsRef?: Ref<HTMLDivElement>;
  containsSegments?: boolean;
}