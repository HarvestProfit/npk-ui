import React, { useContext, useEffect, useRef, useState } from 'react';
import useMask from '../hooks/useMask';
import { calendarDayMask, calendarHourMask, calendarMinuteMask, calendarMonthMask, calendarMonthNameMask, calendarTimeOfDayMask, calendarYearMask } from '../Input/masks';
import { BaseInputContext } from '../BaseInput/BaseInput';

interface InputSegmentProps {
  [key: string]: any; // Allow other props
  onChange?: (value: string) => void;
  setIsFocused?: (isFocused: boolean) => void;
  value: string;
  segment: 'year' | 'month' | 'monthName' | 'day' | 'hour' | 'minute' | 'TOD';
  dateValue: Date;
}

// Handles the individual segments of the date/time input
const InputSegment: React.FC<InputSegmentProps> = ({ segment, setIsFocused: externalSetIsFocused, value: externalValue, onChange: externalOnChange, dateValue, ...props }) => {
  let mask = null;
  let placeholder = '';
  let defaultAriaValueNow = undefined;
  const today = new Date();
  const maskProps = { dateValue };
  switch (segment) {
    case 'year':
      mask = calendarYearMask;
      placeholder = 'yyyy';
      defaultAriaValueNow = today.getFullYear();
      break;
    case 'month':
      mask = calendarMonthMask;
      placeholder = 'mm';
      defaultAriaValueNow = today.getMonth() + 1;
      break;
    case 'monthName':
      mask = calendarMonthNameMask;
      placeholder = 'mmm';
      defaultAriaValueNow = today.getMonth() + 1;
      break;
    case 'day':
      mask = calendarDayMask;
      placeholder = 'dd';
      defaultAriaValueNow = today.getDate();
      break;
    case 'hour':
      mask = calendarHourMask;
      placeholder = '––';
      defaultAriaValueNow = today.getHours();
      break;
    case 'minute':
      mask = calendarMinuteMask;
      placeholder = '––';
      defaultAriaValueNow = today.getMinutes();
      break;
    case 'TOD':
      mask = calendarTimeOfDayMask;
      defaultAriaValueNow = today.getHours() > 11 ? '1' : '0';
      placeholder = 'AM';
      break;
  }

  const formatValue = (inputValue: string | Date) => {
    if (inputValue === '0' && segment !== 'minute') return '';

    let strValue = `${inputValue}`;
    if (inputValue instanceof Date) strValue = inputValue.toISOString();
    if (strValue === 'null' || strValue === 'undefined') strValue = '';

    return mask(maskProps).formatter(`${strValue || ''}`)
  }

  const inputContext = useContext(BaseInputContext) || {};

  const [value, setValue] = useState(formatValue(externalValue) || '');
  const validatingValueRef = useRef(value);
  const [isFocused, setIsFocused] = useState(false);

  const inputMask = useMask({
    mask: mask(maskProps),
    // Since we are using a span[contentEditable] as the input, we need to use the valueRef to get the current value instead of relying on event.target.value.
    valueRef: validatingValueRef,
    navigateWithArrows: true,
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
    const emptyIfZero = (val) => val === '0' ? '' : val;
    if (externalOnChange && formatValue(externalValue) !== formatValue(value)) externalOnChange(emptyIfZero(value));
  }, [value]);

  useEffect(() => { // if out of focus, update the internal value to the external value
    if (!isFocused && formatValue(externalValue) !== formatValue(value)) setValue(formatValue(externalValue));
  }, [externalValue]);

  const onBlur = (e) => {
    setIsFocused(false);
    if (externalSetIsFocused) externalSetIsFocused(false);
    setValue(inputMask.formatter(value));
  }

  const onFocus = (e) => {
    setTimeout(() => { // Add a delay to allow setting the value before focusing when selecting from a date picker
      setIsFocused(true);
      if (externalSetIsFocused) externalSetIsFocused(true);
    }, 100);
  }

  // Use a placeholder if the value is empty
  const valueIsEmpty = value === '' || value === undefined || value === null;

  const passthroughprops = [...Object.keys(props).filter(key => key.startsWith('aria'))];
  const filteredProps = {
    ...passthroughprops.reduce((agg, key) => ({ ...agg, [key]: props[key] }), {})
  }

  return (
    <span
      tabIndex={0}
      data-component="input-segment"
      onKeyDown={inputMask.onKeyDown}
      onClick={e => e.preventDefault()} // Prevents refocus when input is wrapped in a label
      onBlur={onBlur}
      onFocus={onFocus}
      enterKeyHint="next"
      inputMode="numeric"
      contentEditable
      suppressContentEditableWarning
      role="spinbutton"
      style={{ minWidth: segment === 'year' ? '2.35em' : '1.35em', caretColor: 'transparent' }}
      data-placeholder={valueIsEmpty}
      aria-labelledby={`${inputContext['aria-labelledby'] || `${inputContext.labelingIds.label || ''} ${inputContext.labelingIds.additional || ''}`} ${inputContext.labelingIds.uuid}-${segment}`}
      aria-valuenow={defaultAriaValueNow}
      aria-valuetext={valueIsEmpty ? 'Empty' : value}
      {...inputMask.aria || {}}
      {...filteredProps}
    >
      <span aria-hidden id={`${inputContext.labelingIds.uuid}-${segment}`} aria-label={props['aria-label']}></span>
      {valueIsEmpty ? placeholder : value}
    </span>
  )
}

export default InputSegment;
