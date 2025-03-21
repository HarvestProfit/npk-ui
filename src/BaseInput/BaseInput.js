import React from 'react';
import classes from './BaseInput.module.css';
import { useFocusWithin } from 'react-aria';

export const useBaseInput = (preProps) => {
  const inheritedContext = React.useContext(BaseInputContext);
  const props = { ...preProps };
  props['aria-label'] = preProps['aria-label'] || inheritedContext['aria-label'];
  props['aria-labelledby'] = preProps['aria-labelledby'] || inheritedContext['aria-labelledby'];
  props.isDisabled = preProps.isDisabled || preProps.disabled || inheritedContext.disabled;
  return props;
}

export const useFocusableContent = (props, ref = null) => {
  const [isFocused, setFocused] = React.useState(false);
  let {focusWithinProps} = useFocusWithin({
    ...props,
    onFocusWithin(e) {
      setFocused(true);
      props.onFocus?.(e);
    },
    onBlurWithin: (e) => {
      setFocused(false);
      props.onBlur?.(e);
    },
    onFocusWithinChange: props.onFocusChange
  });

  const onMouseDown = (e) => {
    const focusableElement = ref?.current || e.target.querySelector("[tabindex='0']") || e.target.parentNode.querySelector("[tabindex='0']")  || e.target.parentNode.parentNode.querySelector("[tabindex='0']");

    if (!focusableElement || e.target === focusableElement) return;
    if (!isFocused) {
      setTimeout(() => {
        focusableElement.focus();
      }, 0);
    } else {
      e.preventDefault();
    }
  }

  return { focusContentsProps: focusWithinProps, onMouseDown, isFocused };
}

const isPlainContents = (element) => {
  if (typeof element === 'string') return true;
  if (typeof element === 'number') return true;
  return false;
}

const isValidElement = (element) => {
  if (typeof element === 'string') return true;
  return React.isValidElement(element);
}

const BaseInputContext = React.createContext({});

const BaseInput = ({ className = '', variant, as: Tag = 'span', disabled, size, align, leadingVisual: LeadingVisual, trailingVisual: TrailingVisual, children, contentsProps = {}, contentsRef = () => null, containsSegments, onClick, onMouseDown, ...props }) => {
  const inheritedContext = React.useContext(BaseInputContext);
  variant = variant || inheritedContext.variant;
  size = size || inheritedContext.size;
  align = align || inheritedContext.align;
  disabled = disabled || inheritedContext.disabled;
  props['aria-label'] = props['aria-label'] || inheritedContext['aria-label'];
  props['aria-labelledby'] = props['aria-labelledby'] || inheritedContext['aria-labelledby'];

  return (
    <Tag className={`${classes.BaseInput} ${containsSegments ? classes.SegmentedInput : ''} ${className}`} data-variant={variant} data-size={size} data-align={align} aria-disabled={disabled} onClick={onClick} onMouseDown={onMouseDown}>
      {LeadingVisual && <span data-component="leadingVisual" data-visual={isPlainContents(LeadingVisual) ? 'text' : 'visual'}>{isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
      <div {...contentsProps} ref={contentsRef} data-component="contents">
        <BaseInputContext.Provider value={{ disabled, variant: 'plain', size, align, ["aria-label"]: props["aria-label"], ["aria-labelledby"]: props["aria-labelledby"] }}>
          {children}
        </BaseInputContext.Provider>
      </div>
      {TrailingVisual && <span data-component="trailingVisual" data-visual={isPlainContents(TrailingVisual) ? 'text' : 'visual'}>{isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}</span>}
    </Tag>
  );
}

export default BaseInput;