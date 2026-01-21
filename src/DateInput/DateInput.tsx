import React, { useEffect, useRef, useState } from 'react';
import BaseInput from '../BaseInput';
import Group from '../Input/Group';
import Calendar from '../Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import InputSegment from './InputSegment';
import { change, dayIsInFrontForCurrentLocale, fromISO, fromTimestamp, isEqual, monthAbbrevToMonthIndex, monthIndexToAbbrev, monthIndexToMonthNumber, monthNumberToMonthIndex, today, toISO, toTimestamp } from '../Calendar/utils';

const GranularityInclude = ({ children, active }) => active ? children : null;

const hourAndTODfromDate = (date) => {
  if (!date) return {};
  const hours = date.getHours();
  const tod = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12; // Convert to 12-hour format
  return { hour, tod };
}

// Shifts focus to the next input segment
const useDateGroupFocus = () => {
  const onMouseDown = (e) => {
    if (document.activeElement === e.target) return;
    if (!e.target.ariaHidden && e.target.dataset.component === 'input-segment') return;

    const rootNode = e.target?.dataset?.component === 'input-group' ? e.target : e.target?.closest('[data-component="input-group"]');
    if (rootNode && rootNode.contains(document.activeElement)) {
      e.preventDefault();
      return;
    }

    const focusNearest = (node) => {
      if (!node) return;
      if (node.ariaHidden) focusNearest(node.nextElementSibling);
      if (node.dataset.component === 'input-group') focusNearest(node.firstElementChild);
      node.focus();
    }

    focusNearest(e.target);
  }

  return { onMouseDown };
}

// Simple hook to manage state and call a callback when the value changes
const useOnChangeState = (initialValue, cb) => {
  const [state, setState] = useState(initialValue);
  return [state, (newValue) => {
    if (newValue === state) return;
    setState(newValue);
    if (cb && newValue) cb(newValue);
  }];
};

// Controls the individual segments of the date input
const DateInputInternal = ({
  onChange = (_value) => null,
  value,
  includeYear = true,
  monthAsName = false,
  granularity = 'day',
  excludeGroup = false,
  ...props
}) => {
  let updateValue = today(); // When updating a new date, we build off the current date and then set individual values
  let segmentDateValue = value; // We then use a date segment and a time segment for the values of the segments
  let segmentTimeValue = value; // If "value" is not a complete date, we do not fill out the input. Time will be null if the time is 00:00:00.000
  if (value instanceof Date && !isNaN(value.getTime())) {
    updateValue = value;
    if (value.getHours() === 0 && value.getMinutes() === 0 && value.getMilliseconds() === 0) {
      segmentTimeValue = null;
    }
  } else {
    segmentDateValue = null;
    segmentTimeValue = null;
  }

  const monthIndexToMonthValue = monthAsName ? monthIndexToAbbrev : monthIndexToMonthNumber;
  const monthValueToMonthIndex = monthAsName ? monthAbbrevToMonthIndex : monthNumberToMonthIndex;

  // Specify the rules of getting and setting the values of the segments
  const [monthValue, setMonthValue] = useOnChangeState(monthIndexToMonthValue(segmentDateValue?.getMonth()), (month) => onChange(change(updateValue, monthValueToMonthIndex(month), 'monthIndex')));
  const [dayValue, setDayValue] = useOnChangeState(segmentDateValue?.getDate(), (day => onChange(change(updateValue, day, 'day'))));
  const [yearValue, setYearValue] = useOnChangeState(segmentDateValue?.getFullYear(), (year => onChange(change(updateValue, year, 'year'))));
  const [minuteValue, setMinuteValue] = useOnChangeState(segmentTimeValue?.getMinutes(), (minutes => onChange(change(updateValue, minutes, 'minute'))));
  const [todValue, setTODValue] = useOnChangeState(hourAndTODfromDate(segmentTimeValue).tod, (tod) => {
    const hours = updateValue.getHours();
    if (tod === 'AM' && hours >= 12) {
      onChange(change(updateValue, hours - 12, 'hour'));
    } else if (tod === 'PM' && hours < 12) {
      onChange(change(updateValue, hours + 12, 'hour'));
    }
  });
  const [hourValue, setHourValue] = useOnChangeState(hourAndTODfromDate(segmentTimeValue).hour, (hour) => {
    const intHours = parseInt(hour);
    if (todValue === 'AM' && intHours === 12) { // hours are tricky because of the 12-hour format. Native date objects are 24-hour format
      onChange(change(updateValue, 0, 'hour'));
    } else if (todValue === 'PM' && intHours < 12) {
      onChange(change(updateValue, intHours + 12, 'hour'));
    } else {
      onChange(change(updateValue, hour, 'hour'));
    }
  });

  const ref = useRef<HTMLDivElement>(null);
  const [isInputSegmentInFocus, setInputSegmentFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (!isFocused) { // if the input is out of focus, we will accept updates from outside changes
      setMonthValue(monthIndexToMonthValue(segmentDateValue?.getMonth()));
      setDayValue(segmentDateValue?.getDate());
      setYearValue(segmentDateValue?.getFullYear());
      setHourValue(hourAndTODfromDate(segmentTimeValue).hour);
      setTODValue(hourAndTODfromDate(segmentTimeValue).tod);
      setMinuteValue(segmentDateValue?.getMinutes());
    }
  }, [`${value}`]);

  useEffect(() => { // Calls onFocus and onBlur when any of the input segments are focused or blurred as a group
    setTimeout(() => {
      if (ref.current) {
        if (!isFocused && ref.current.contains(document.activeElement)) {
          setIsFocused(true);
          if (props.onFocus) props.onFocus({ target: ref.current });
        } else if (isFocused && !ref.current.contains(document.activeElement)) {
          setIsFocused(false);
          if (props.onBlur) props.onBlur({ target: ref.current });
        }
      }
    }, 10);
  }, [isInputSegmentInFocus]);

  const dateParts = [];
  if (['day', 'month', 'minute'].includes(granularity)) {
    dateParts.push(<InputSegment aria-label="month, " segment={monthAsName ? 'monthName' : 'month'} setIsFocused={setInputSegmentFocused} value={monthValue} onChange={setMonthValue} />);
  }
  if (['day', 'minute'].includes(granularity)) {
    const dayPart = (<InputSegment aria-label="day, "segment="day" setIsFocused={setInputSegmentFocused} value={dayValue} onChange={setDayValue} onOldChange={(day => onChange(change(updateValue, day, 'day')))} />);
    (dayIsInFrontForCurrentLocale() && !monthAsName) ? dateParts.unshift(dayPart) : dateParts.push(dayPart);
  }
  if (includeYear && ['day', 'month', 'year', 'minute'].includes(granularity)) {
    dateParts.push(<InputSegment aria-label="year, " segment="year" setIsFocused={setInputSegmentFocused} value={yearValue} onChange={setYearValue} onOldChange={(year => onChange(change(updateValue, year, 'year')))} />);
  }

  const contents = (
    <>
      {dateParts.map((part, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && <span aria-hidden="true" data-component="input-segment">{monthAsName ? ' ' : '/'}</span>}
            {part}
          </React.Fragment>
        )
      })}

      <GranularityInclude active={['minute'].includes(granularity)}>
        <span aria-hidden="true" data-component="input-segment">, </span>
        <span aria-hidden="true" data-component="input-segment"></span>
      </GranularityInclude>

      <GranularityInclude active={['minute', 'time'].includes(granularity)}>
        <InputSegment aria-label="hour, " segment="hour" setIsFocused={setInputSegmentFocused} value={hourValue} onChange={setHourValue} />
        <span aria-hidden="true" data-component="input-segment">:</span>
        <InputSegment aria-label="minute, " segment="minute" setIsFocused={setInputSegmentFocused} value={minuteValue} onChange={setMinuteValue} />
        <span aria-hidden="true" data-component="input-segment"></span>
        <InputSegment aria-label="time of day, " segment="TOD" setIsFocused={setInputSegmentFocused} value={todValue} onChange={setTODValue} />
      </GranularityInclude>
    </>
  );

  const dateGroupProps = useDateGroupFocus();
  if (excludeGroup) {
    return (
      <BaseInput containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
        {contents}
        <input type="hidden" value={`${updateValue?.toISOString()}`} />
      </BaseInput>
    )
  }

  return (
    <Group containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
      {contents}
      <input hidden type="text" value={`${updateValue?.toISOString()}`} />
    </Group>
  )
};

const DateInput: React.FC<DateInputProps> = ({
  visibleMonths = 1,
  autoDismiss = true,
  presets = false,
  picker = false,
  output = 'ISO',
  includeYear = true,
  monthAsName = false,
  onChange: onExternalChange = (_value: string | Date | number) => null,
  value: externalValue,
  granularity = 'day',
  excludeGroup,
  ...props
}) => {
  let onValueChange = onExternalChange;
  let toDateFormatter = (v: Date): Date => v;
  switch (output) {
    case 'ISO':
      onValueChange = (newValue: Date) => onExternalChange(toISO(newValue));
      toDateFormatter = (v) => fromISO(v);
      break;
    case 'timestamp':
      onValueChange = (newValue: Date) => onExternalChange(toTimestamp(newValue));
      toDateFormatter = (v) => fromTimestamp(v);
      break;
    default:
      break;
  }

  const formattedExternalValue = toDateFormatter(externalValue);
  const [value, setValue] = useState(formattedExternalValue);

  useEffect(() => {
    // If internal value is different than the external value based on granularity, update
    // the external value. The granularity ensures that if this is a date picker, changes to
    // minutes do not trigger a change.
    if (!isEqual(value, formattedExternalValue, granularity)) onValueChange(value);
  }, [value?.toString()]);

  useEffect(() => {
    // Ensure internal value matches external value
    if (value !== formattedExternalValue) setValue(formattedExternalValue);
  }, [formattedExternalValue?.toString()]);

  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" tabIndex={-1} />
        <Menu.Overlay>
          <Calendar visibleMonths={visibleMonths} presets={presets} value={value} onChange={setValue} output="date" autoDismiss={autoDismiss} />
        </Menu.Overlay>
      </Menu>
    );
  }

  return (
    <DateInputInternal
      onChange={setValue}
      value={value}
      granularity={granularity}
      excludeGroup={excludeGroup}
      includeYear={includeYear}
      monthAsName={monthAsName}
      {...props}
      {...extraProps}
    />
  );
}

interface DateInputProps {
  picker?: boolean;
  autoDismiss?: boolean;
  visibleMonths?: number;
  granularity?: 'day' | 'month' | 'year' | 'minute' | 'time';
  value?: Date;
  includeYear?: boolean;
  monthAsName?: boolean;
  output?: 'ISO' | 'timestamp' | 'Date';
  onChange?: (date: Date | string | number) => void;
  [key: string]: any; // Allow additional props
}

export default DateInput;
export type { DateInputProps };
