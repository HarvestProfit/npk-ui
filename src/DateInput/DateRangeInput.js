import React from 'react';
import classes from './DateInput.module.css';
import {useDateRangePicker} from 'react-aria';
import {useDateRangePickerState} from 'react-stately';
import DateInput from './DateInput';

const DateRangeInput = ({ variant = 'default', as: Tag = 'div', disabled, size, align = "start", leadingVisual: LeadingVisual, trailingVisual: TrailingVisual, ...props}) => {
  let state = useDateRangePickerState(props);
  let ref = React.useRef(null);
  let {
    groupProps,
    startFieldProps,
    endFieldProps
  } = useDateRangePicker({
    ...props,
    isDisabled: disabled
  }, state, ref);

  return (
    <Tag className={classes.DateRangeInput} data-variant={variant} data-size={size} data-align={align} aria-disabled={disabled}>
      {LeadingVisual && <span data-component="leadingVisual">{React.isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}</span>}
      <div {...groupProps} ref={ref}>
        <DateInput {...startFieldProps} variant="plain" size={size} align={align} />
        <span className={classes.DateRangeInputSeparator}>–</span>
        <DateInput {...endFieldProps} variant="plain" size={size} align={align} />
      </div>
      {TrailingVisual && <span data-component="trailingVisual">{React.isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}</span>}
    </Tag>
  );
}

export default DateRangeInput;