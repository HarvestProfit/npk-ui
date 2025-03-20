import React from 'react';
import classes from './DateInput.module.css';
import { useLocale, useTimeField} from 'react-aria';
import {useTimeFieldState} from 'react-stately';
import InputSegment from './InputSegment';

const TimeInput = ({ variant = 'default', as: Tag = 'div', disabled = false, size, align = "start", leadingVisual: LeadingVisual, trailingVisual: TrailingVisual, ...props }) => {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    shouldForceLeadingZeros: true,
    isDisabled: disabled,
    locale
  });

  let ref = React.useRef(null);
  let { fieldProps } = useTimeField(props, state, ref);

  return (
    <Tag className={classes.DateInput} data-variant={variant} data-size={size} data-align={align} aria-disabled={disabled}>
      {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
      <div {...fieldProps} ref={ref}>
        {state.segments.map((segment, i) => (
          <InputSegment key={i} segment={segment} state={state} />
        ))}
      </div>
      {TrailingVisual && <span data-component="trailingVisual">{React.isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}</span>}
    </Tag>
  );
}

export default TimeInput;