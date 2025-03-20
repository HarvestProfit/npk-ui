import React from 'react';
import classes from './DateInput.module.css';
import {useDateField, useLocale} from 'react-aria';
import {useDateFieldState} from 'react-stately';
import {GregorianCalendar} from '@internationalized/date';
import InputSegment from './InputSegment';

function createCalendar(identifier) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

const DateInput = ({ variant = 'default', as: Tag = 'div', disabled = false, size, align = "start", leadingVisual: LeadingVisual, trailingVisual: TrailingVisual, ...props }) => {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    shouldForceLeadingZeros: true,
    isDisabled: disabled,
    locale,
    createCalendar
  });

  let ref = React.useRef(null);
  let { fieldProps } = useDateField(props, state, ref);

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

export default DateInput;