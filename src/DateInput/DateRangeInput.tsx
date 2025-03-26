import React, { useMemo } from 'react';
import { AriaDateRangePickerProps, useDateRangePicker } from '@react-aria/datepicker';
import { useDateRangePickerState, DateRangePickerState } from '@react-stately/datepicker';
import { DateValue } from '@internationalized/date';
import DateInput, { DateInputInternal } from './DateInput';
import BaseInput, { BaseInputProps, useBaseInput } from '../BaseInput';
import Calendar, { calendarDateToISOValueString, stringISOToCalendarDate } from './Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';

interface DateRangeInputProps extends Omit<BaseInputProps, 'defaultValue' | 'onChange'>, Omit<AriaDateRangePickerProps<DateValue>, 'onChange'| 'value'> {
  value?: { start: string; end: string }; // Unified type for defaultValue
  picker?: boolean;
  visibleMonths?: number;
  onChange?: (range: { start: string; end: string }) => void;
  onBlur?: (any?) => void;
  onFocus?: (any?) => void;
  onKeyDown?: (any?) => void;
  onKeyUp?: (any?) => void;
  [key: string]: any; // Allow additional props
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  picker,
  visibleMonths = 2,
  value: externalValue,
  onChange: onExternalChange,
  granularity,
  ...preProps
}) => {
  
  let value = {
    start: stringISOToCalendarDate(externalValue?.start, granularity),
    end: stringISOToCalendarDate(externalValue?.end, granularity)
  };

  console.log(value);

  if (!value.start && !value.end) value = null;

  const onChange = onExternalChange ? (newValues?: { start: DateValue; end: DateValue }) => {
    onExternalChange({
      start: calendarDateToISOValueString(newValues?.start),
      end: calendarDateToISOValueString(newValues?.end),
    });
  } : null;

  const props = useBaseInput(preProps as unknown as BaseInputProps);

  const inputProps = useMemo(() => ({
    ...props,
    onChange,
    value
  }), [value?.start, value?.end]);


  const state: DateRangePickerState = useDateRangePickerState(inputProps as unknown as AriaDateRangePickerProps<DateValue>);
  const ref = React.useRef(null);

  const {
    groupProps,
    startFieldProps,
    endFieldProps,
    calendarProps,
  } = useDateRangePicker(
    inputProps as unknown as AriaDateRangePickerProps<DateValue>,
    state,
    ref
  );

  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
        <Menu.Overlay>
          <Calendar.Range {...calendarProps} visibleMonths={visibleMonths} />
        </Menu.Overlay>
      </Menu>
    );
  }

  return (
    <BaseInput
      {...props}
      {...extraProps}
      contentsProps={groupProps}
      contentsRef={ref}
      containsSegments
    >
      <DateInputInternal {...startFieldProps} inputFormat="DateValue" />
      <span style={{ padding: '0 10px' }}>–</span>
      <DateInputInternal {...endFieldProps} inputFormat="DateValue" />
    </BaseInput>
  );
};

export default DateRangeInput;
export type { DateRangeInputProps };