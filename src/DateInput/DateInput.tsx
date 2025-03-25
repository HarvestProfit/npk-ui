import React from 'react';
import { useLocale } from '@react-aria/i18n';
import { useDateField, useDatePicker, AriaDateFieldProps } from '@react-aria/datepicker';
import { useDateFieldState, useDatePickerState } from '@react-stately/datepicker';
import { DateValue } from '@internationalized/date';
import InputSegment from './InputSegment';
import BaseInput, { BaseInputProps, useBaseInput } from '../BaseInput';
import Calendar, { createCalendar } from './Calendar';
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

const DateInputInternal: React.FC<DateInputInternalProps> = (preProps) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const { locale } = useLocale();

  const ref = React.useRef<HTMLDivElement>(null);
  const state = useDateFieldState({
    ...props as unknown as AriaDateFieldProps<DateValue>,
    shouldForceLeadingZeros: true,
    locale,
    createCalendar,
  });

  const { fieldProps } = useDateField(props, state, ref);

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
  ...props
}) => {
  if (picker) {
    const ref = React.useRef<HTMLDivElement>(null);
    const state = useDatePickerState(props);
    const { groupProps, fieldProps, calendarProps } = useDatePicker(props, state, ref);

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
        <DateInputInternal {...fieldProps} />
      </BaseInput>
    );
  }

  return <DateInputInternal {...props} />;
};

export default DateInput;
export type { DateInputProps };