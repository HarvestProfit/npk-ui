import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useDateField, useDatePicker, AriaDateFieldProps } from '@react-aria/datepicker';
import { useDateFieldState, useDatePickerState } from '@react-stately/datepicker';
import { DateValue, fromDate, getLocalTimeZone } from '@internationalized/date';
import InputSegment from './InputSegment';
import BaseInput, { BaseInputProps, useBaseInput, useFocusableContent } from '../BaseInput';
import Calendar, { calendarDateToISOValueString, createCalendar, stringISOToCalendarDate } from './Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';

interface DateInputInternalProps extends Omit<BaseInputProps, 'defaultValue'>, AriaDateFieldProps<DateValue> {
  defaultValue?: DateValue; // Unified type for defaultValue
  shouldForceLeadingZeros?: boolean;
  locale?: string;
  onBlur?: (any?) => void;
  onChange?: (DateValue?) => void;
  onFocus?: (any?) => void;
  onKeyDown?: (any?) => void;
  onKeyUp?: (any?) => void;
  [key: string]: any; // Allow additional props
}

export const DateInputInternal: React.FC<DateInputInternalProps> = ({ onExternalChange, setInternalValue, externalValue, inputFormat = 'DateValue', ...preProps}) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const { locale } = useLocale();

  const ref = useRef(null);

  const state = useDateFieldState({
    ...props as unknown as AriaDateFieldProps<DateValue>,
    shouldForceLeadingZeros: true,
    locale,
    createCalendar,
  });

  const { focusContentsProps, isFocused } = useFocusableContent(props as unknown);
  const { fieldProps } = useDateField(focusContentsProps, state, ref);

  if (onExternalChange) {
    useEffect(() => {
      if (isFocused && !state.value) {
        if (inputFormat === 'string') {
          if (state.dateValue) {
            const dateTimeObject = fromDate(state.dateValue, 'UTC');
            const dateValue = new Date(dateTimeObject.year, dateTimeObject.month - 1, dateTimeObject.day, dateTimeObject.hour, dateTimeObject.minute, dateTimeObject.second);
            onExternalChange(calendarDateToISOValueString(fromDate(dateValue, getLocalTimeZone())));
          } else {
            onExternalChange(null);
          }
        } else if (state.value) {
          onExternalChange(state.value);
        }
      }
    }, [state.dateValue]);
  }
  
  if (setInternalValue) {
    useEffect(() => {
      if (!isFocused) {
        if (inputFormat === 'string') {
          setInternalValue(stringISOToCalendarDate(externalValue, preProps.granularity));
        } else if (state.value) {
          setInternalValue(externalValue);
        }
      } 
    }, [externalValue]);
  }
  

  return (
    <BaseInput {...props} contentsProps={fieldProps} contentsRef={ref} containsSegments>
      {state.segments.map((segment, i) => (
        <InputSegment key={i} segment={segment} state={state} />
      ))}
    </BaseInput>
  );
};

interface DateInputProps {
  picker?: boolean;
  visibleMonths?: number;
  presets?: boolean | Array<{ label: string; date: DateValue }>;
  [key: string]: any; // Allow additional props
}

const DateInput: React.FC<DateInputProps> = ({
  picker,
  visibleMonths = 1,
  presets = false,
  onChange: onExternalChange,
  value: externalValue,
  inputFormat: defaultInputFormat = 'string',
  ...props
}) => {

  const inputFormat = defaultInputFormat || (typeof externalValue === 'string') ? 'string' : 'DateValue';
  const [internalValue, setInternalValue] = useState(inputFormat === 'string' ? stringISOToCalendarDate(externalValue, props.granularity) : externalValue);
  const onInternalChange = (newValue?: DateValue) => {
    if (onExternalChange) {
      onExternalChange(inputFormat === 'string' ? calendarDateToISOValueString(newValue) : newValue);
    }
    setInternalValue(newValue);
  }

  const inputProps = useMemo(() => ({
    ...props,
    onChange: onInternalChange,
    value: internalValue
  }), [internalValue]);

  if (picker) {
    const ref = React.useRef<HTMLDivElement>(null);
    const state = useDatePickerState(inputProps);
    const { groupProps, fieldProps, calendarProps } = useDatePicker(inputProps, state, ref);

    const trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
        <Menu.Overlay>
          <Calendar {...calendarProps} visibleMonths={visibleMonths} presets={presets} />
        </Menu.Overlay>
      </Menu>
    );

    return (
      <BaseInput contentsProps={groupProps} contentsRef={ref} trailingVisual={trailingVisual}>
        <DateInputInternal {...fieldProps} onExternalChange={onExternalChange} externalValue={externalValue} setInternalValue={setInternalValue} inputFormat={inputFormat} />
      </BaseInput>
    );
  }

  return <DateInputInternal {...inputProps} onExternalChange={onExternalChange} externalValue={externalValue} setInternalValue={setInternalValue} inputFormat={inputFormat} />;
};

export default DateInput;
export type { DateInputProps };