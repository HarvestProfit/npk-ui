import React, { useEffect, useRef, useState } from 'react';
import useMask from '../hooks/useMask';
import { calendarDayMask, calendarHourMask, calendarMinuteMask, calendarMonthMask, calendarMonthNameMask, calendarTimeOfDayMask, calendarYearMask } from '../Input/masks';

// Handles the individual segments of the date/time input
const InputSegment = ({ segment, ...props }) => {
  let mask = null;
  let placeholder = '';
  switch (segment) {
    case 'year':
      mask = calendarYearMask;
      placeholder = 'yyyy';
      break;
    case 'month':
      mask = calendarMonthMask;
      placeholder = 'mm';
      break;
    case 'monthName':
      mask = calendarMonthNameMask;
      placeholder = 'mmm';
      break;
    case 'day':
      mask = calendarDayMask;
      placeholder = 'dd';
      break;
    case 'hour':
      mask = calendarHourMask;
      placeholder = '––';
      break;
    case 'minute':
      mask = calendarMinuteMask;
      placeholder = '––';
      break;
    case 'TOD':
      mask = calendarTimeOfDayMask;
      placeholder = 'AM';
      break;
  }

  const formatValue = (inputValue) => {
    if (inputValue === '0') return '';
    return mask(props).formatter(`${inputValue || ''}`)
  }

  const [value, setValue] = useState(formatValue(props.value) || '');
  const validatingValueRef = useRef(value);
  const [isFocused, setIsFocused] = useState(false);

  const inputMask = useMask({
    ...props,
    mask: mask(props),
    // Since we are using a span[contentEditable] as the input, we need to use the valueRef to get the current value instead of relying on event.target.value.
    valueRef: validatingValueRef,
    // On top of input validation, we also need to process the key strokes to update the value since we are using a span[contentEditable] as the input.
    // This allows us to autocomplete certain values (e.g. a = AM, p = PM) and also handle backspace/delete.
    onKeyDown: (e, specialKey) => {
      let newValue = validatingValueRef.current;
      if (!specialKey) {
        newValue = newValue + e.key;
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (segment === 'TOD') newValue = '';
        newValue = newValue.slice(0, newValue.length - 1);
      } else {
        if (e.key !== 'Tab') e.preventDefault();
        return;
      }

      if (segment === 'TOD') {
        setValue(calendarTimeOfDayMask().autoComplete(newValue, e.key));
      } else if (segment === 'monthName') {
        setValue(calendarMonthNameMask().autoComplete(newValue, e.key));
      } else {
        setValue(newValue);
      }

      e.preventDefault();
    }
  });

  useEffect(() => {
    // if the value is a complete value (2 digits for month, day, hour, minute, 4 digits for year)
    // We want to set the validatingValueRef to an empty string so that when the input is focused again,
    // the user can type in a complete new value instead of having to delete the old value
    if (['month', 'day', 'hour', 'minute'].includes(segment) && value.length === 2) {
      validatingValueRef.current = '';
    } else if (['year'].includes(segment) && value.length === 4) {
      validatingValueRef.current = '';
    } else if (['monthName'].includes(segment) && value.length >= 3) {
      validatingValueRef.current = '';
    } else {
      validatingValueRef.current = value;
    }

    // Publish the change to the parent component if the value is different
    if (props.onChange && formatValue(props.value) !== formatValue(value)) props.onChange(value);
  }, [value]);

  useEffect(() => { // if out of focus, update the internal value to the external value
    if (!isFocused && formatValue(props.value) !== formatValue(value)) setValue(formatValue(props.value));
  }, [props.value]);

  const onBlur = (e) => {
    setIsFocused(false);
    if (props.setIsFocused) props.setIsFocused(false);
    setValue(inputMask.formatter(value));
  }

  const onFocus = (e) => {
    setIsFocused(true);
    if (props.setIsFocused) props.setIsFocused(true);
  }

  // Use a placeholder if the value is empty
  const valueIsEmpty = value === '' || value === undefined || value === null;

  return (
    <span
      tabIndex={0} 
      data-component="input-segment" 
      onKeyDown={inputMask.onKeyDown} 
      onBlur={onBlur} 
      onFocus={onFocus}
      enterKeyHint="next" 
      inputMode="numeric" 
      contentEditable 
      suppressContentEditableWarning 
      role="spinbutton" 
      style={{ minWidth: segment === 'year' ? '2.35em' : '1.35em', caretColor: 'transparent' }} 
      data-placeholder={valueIsEmpty}
    >
      {valueIsEmpty ? placeholder : value}
    </span>
  )
}

export default InputSegment;