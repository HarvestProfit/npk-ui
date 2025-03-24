import React from 'react';
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria';
import { useDateRangePickerState, DateRangePickerState } from 'react-stately';
import { DateValue } from '@internationalized/date';
import DateInput from './DateInput';
import BaseInput, { BaseInputProps, useBaseInput } from '../BaseInput';
import Calendar from './Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';

interface DateRangeInputProps extends Omit<BaseInputProps, 'defaultValue' | 'onChange'>, Omit<AriaDateRangePickerProps<DateValue>, 'onChange'> {
  defaultValue?: { start: DateValue; end: DateValue }; // Unified type for defaultValue
  picker?: boolean;
  visibleMonths?: number;
  onChange?: (range: { start: DateValue; end: DateValue }) => void;
  onBlur?: (any?) => void;
  onFocus?: (any?) => void;
  onKeyDown?: (any?) => void;
  onKeyUp?: (any?) => void;
  [key: string]: any; // Allow additional props
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  picker,
  visibleMonths = 2,
  ...preProps
}) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const state: DateRangePickerState = useDateRangePickerState(props as unknown as AriaDateRangePickerProps<DateValue>);
  const ref = React.useRef<HTMLDivElement>(null);

  const {
    groupProps,
    startFieldProps,
    endFieldProps,
    calendarProps,
  } = useDateRangePicker(
    props as unknown as AriaDateRangePickerProps<DateValue>,
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
      <DateInput {...startFieldProps} />
      <span style={{ padding: '0 10px' }}>–</span>
      <DateInput {...endFieldProps} />
    </BaseInput>
  );
};

export default DateRangeInput;
export type { DateRangeInputProps };