import React, { useEffect, useRef, useState } from 'react';
import DateInput from './DateInput';
import Calendar from '../Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import Group from '../Input/Group';
import { isoDateIncludesTime, useValueFormatter, valueType } from './helpers';

interface DateRangeInputProps {
  value?: { start: valueType; end: valueType }; // Unified type for defaultValue
  picker?: boolean;
  visibleMonths?: number;
  includeYear?: boolean;
  monthAsName?: boolean;
  isoType?: 'Date' | 'DateTime';
  granularity?: 'day' | 'month' | 'year' | 'minute' | 'time';
  output?: 'ISO' | 'timestamp' | 'Date';
  onChange?: (range: { start: valueType; end: valueType }) => void;
  name?: string;
  [key: string]: any; // Allow additional props
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  picker,
  visibleMonths = 2,
  value: externalValue,
  onChange: onExternalChange,
  granularity = 'day',
  output = 'ISO',
  includeYear = true,
  isoType = null,
  monthAsName = false,
  name,
  ...props
}) => {
  let includeTime = isoDateIncludesTime(externalValue?.start) || isoDateIncludesTime(externalValue?.end);
  if (isoType === 'DateTime') includeTime = true;
  if (isoType === 'Date') includeTime = false;
  const formatter = useValueFormatter(output, includeTime);

  // Ensure the value is in the correct format
  let value = { start: formatter.from(externalValue?.start), end: formatter.from(externalValue?.end) };
  if (!value.start && !value.end) value = null;

  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setTimeout(() => { // groups the onfocus and onblur events of the start and end inputs
      if (ref.current && !isFocused && ref.current.contains(document.activeElement)) {
        setIsFocused(true);
        if (props.onFocus) props.onFocus({ target: ref.current });
      }
    }, 10);
  }

  const onBlur = () => {
    setTimeout(() => { // groups the onfocus and onblur events of the start and end inputs
      if (ref.current && isFocused && !ref.current.contains(document.activeElement)) {
        setIsFocused(false);
        if (props.onFocus) props.onBlur({ target: ref.current });
      }
    }, 10);
  }

  useEffect(() => { // if not focused, swap the start and end dates if they are in the wrong order
    if (!isFocused && value?.start && value?.end && value.start > value.end) {
      if (onExternalChange) onExternalChange({ start: formatter.to(value.end), end: formatter.to(value.start) });
    }
  }, [isFocused, value?.start, value?.end]);

  const onChangeStart = (newValue: Date) => {
    if (onExternalChange) {
      onExternalChange({
        start: formatter.to(newValue),
        end: formatter.to(value?.end),
      });
    }
  };
  const onChangeEnd = (newValue: Date) => {
    if (onExternalChange) {
      onExternalChange({
        start: formatter.to(value?.start),
        end: formatter.to(newValue),
      });
    }
  };

  // If you provide a "picker" prop, we will show a calendar
  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date range" tabIndex={-1} />
        <Menu.Overlay>
          <Calendar visibleMonths={visibleMonths} range value={value} onChange={onExternalChange} output="Date" {...props} />
        </Menu.Overlay>
      </Menu>
    );
  }

  return (
    <Group containsSegments contentsRef={ref} {...props} {...extraProps}>
      <DateInput output="Date" name={`${name}_start`}  excludeGroup onChange={onChangeStart} value={value?.start} granularity={granularity} variant="plain" onFocus={onFocus} onBlur={onBlur} includeYear={includeYear} monthAsName={monthAsName} />
      <span style={{ padding: '0 10px' }}>–</span>
      <DateInput output="Date" name={`${name}_end`} excludeGroup onChange={onChangeEnd} value={value?.end} granularity={granularity} variant="plain" onFocus={onFocus} onBlur={onBlur} includeYear={includeYear} monthAsName={monthAsName} />
    </Group>
  );
};

export default DateRangeInput;
export type { DateRangeInputProps };
