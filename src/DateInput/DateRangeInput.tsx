import React, { useEffect, useRef, useState } from 'react';
import DateInput from './DateInput';
import Calendar from './Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import Group from '../Input/Group';

interface DateRangeInputProps {
  value?: { start: Date; end: Date }; // Unified type for defaultValue
  picker?: boolean;
  visibleMonths?: number;
  includeYear?: boolean;
  monthAsName?: boolean;
  onChange?: (range: { start: Date; end: Date }) => void;
  [key: string]: any; // Allow additional props
}

const DateRangeInput = ({
  picker,
  visibleMonths = 2,
  value: externalValue,
  onChange: onExternalChange,
  granularity = 'day',
  includeYear = true,
  monthAsName = false,
  ...props
}) => {
  // Ensure the value is in the correct format
  let value = { start: externalValue?.start, end: externalValue?.end };
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
      if (onExternalChange) onExternalChange({ start: value.end, end: value.start });
    }
  }, [isFocused, value?.start, value?.end]);

  const onChangeStart = (newValue) => {
    if (onExternalChange) {
      onExternalChange({
        start: newValue,
        end: value?.end,
      });
    }
  };
  const onChangeEnd = (newValue) => {
    if (onExternalChange) {
      onExternalChange({
        start: value?.start,
        end: newValue,
      });
    }
  };

  // If you provide a "picker" prop, we will show a calendar
  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date range" />
        <Menu.Overlay>
          <Calendar visibleMonths={visibleMonths} range value={value} onChange={onExternalChange} {...props} />
        </Menu.Overlay>
      </Menu>
    );
  }

  return (
    <Group containsSegments contentsRef={ref} {...extraProps} {...props}>
      <DateInput excludeGroup onChange={onChangeStart} value={value?.start} granularity={granularity} variant="plain" onFocus={onFocus} onBlur={onBlur} includeYear={includeYear} monthAsName={monthAsName} />
      <span style={{ padding: '0 10px' }}>–</span>
      <DateInput excludeGroup onChange={onChangeEnd} value={value?.end} granularity={granularity} variant="plain" onFocus={onFocus} onBlur={onBlur} includeYear={includeYear} monthAsName={monthAsName} />
    </Group>
  );
};

export default DateRangeInput;
export type { DateRangeInputProps };