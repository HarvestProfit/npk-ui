import React, { useEffect, useRef, useState } from 'react';
import BaseInput from '../BaseInput';
import Group from '../Input/Group';
import Calendar from '../Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import InputSegment from './InputSegment';
import { change, dayIsInFrontForCurrentLocale, get as getDatePart, isEqual, monthAbbrevToMonthIndex, monthIndexToAbbrev, monthIndexToMonthNumber, monthNumberToMonthIndex, today } from '../Calendar/utils';
import { isoDateIncludesTime, onChangeType, outputFormatType, useValueFormatter, valueType } from './helpers';

const GranularityInclude = ({ children, active }) => active ? children : null;

// Shifts focus to the next input segment
const useDateGroupFocus = () => {
  const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (document.activeElement === target) return;
    if (!target.ariaHidden && target.dataset.component === 'input-segment') return;

    const rootNode = target?.dataset?.component === 'input-group' ? target : target?.closest('[data-component="input-group"]');
    if (rootNode && rootNode.contains(document.activeElement)) {
      event.preventDefault();
      return;
    }

    const focusNearest = (node: HTMLElement) => {
      if (!node) return;
      if (node.ariaHidden) focusNearest(node.nextElementSibling as HTMLElement);
      if (node.dataset.component === 'input-group') focusNearest(node.firstElementChild as HTMLElement);
      node.focus();
    }

    focusNearest(target);
  }

  return { onMouseDown };
}

// Simple hook to manage state and call a callback when the value changes
const useOnChangeState = (initialValue: any, cb?: (value: any) => void) => {
  const [state, setState] = useState(initialValue);
  return [state, (newValue: any): void => {
    if (newValue === state) return;
    setState(newValue);
    if (cb && newValue) cb(newValue);
  }];
};

// Controls the individual segments of the date input
const DateInputInternal = ({
  onChange = (_value: any) => null,
  value,
  includeYear = true,
  monthAsName = false,
  granularity = 'day',
  excludeGroup = false,
  formatter,
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
  const [monthValue, setMonthValue] = useOnChangeState(monthIndexToMonthValue(parseInt(getDatePart(segmentDateValue, 'monthIndex'))), (month) => onChange(change(updateValue, monthValueToMonthIndex(month), 'monthIndex')));
  const [dayValue, setDayValue] = useOnChangeState(getDatePart(segmentDateValue, 'day'), (day => onChange(change(updateValue, day, 'day'))));
  const [yearValue, setYearValue] = useOnChangeState(getDatePart(segmentDateValue, 'year'), (year => onChange(change(updateValue, year, 'year'))));
  const [minuteValue, setMinuteValue] = useOnChangeState(getDatePart(segmentTimeValue, 'minute'), (minutes => onChange(change(updateValue, minutes, 'minute'))));
  const [todValue, setTODValue] = useOnChangeState(getDatePart(segmentTimeValue, 'TOD'), (tod) => onChange(change(updateValue, tod, 'TOD')));
  const [hourValue, setHourValue] = useOnChangeState(getDatePart(segmentTimeValue, 'hour'), (hour) => {
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
      setDayValue(getDatePart(segmentDateValue, 'day'));
      setYearValue(getDatePart(segmentDateValue, 'year'));
      setHourValue(getDatePart(segmentTimeValue, 'hour'));
      setTODValue(getDatePart(segmentTimeValue, 'TOD'));
      setMinuteValue(getDatePart(segmentDateValue, 'minute'));
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
    dateParts.push(<InputSegment aria-label="month" segment={monthAsName ? 'monthName' : 'month'} setIsFocused={setInputSegmentFocused} value={monthValue} onChange={setMonthValue} dateValue={updateValue} />);
  }
  if (['day', 'minute'].includes(granularity)) {
    const dayPart = (<InputSegment aria-label="day" segment="day" setIsFocused={setInputSegmentFocused} value={dayValue} onChange={setDayValue} dateValue={updateValue} />);
    (dayIsInFrontForCurrentLocale() && !monthAsName) ? dateParts.unshift(dayPart) : dateParts.push(dayPart);
  }
  if (includeYear && ['day', 'month', 'year', 'minute'].includes(granularity)) {
    dateParts.push(<InputSegment aria-label="year" segment="year" setIsFocused={setInputSegmentFocused} value={yearValue} onChange={setYearValue} dateValue={updateValue} />);
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
        <InputSegment aria-label="hour" segment="hour" setIsFocused={setInputSegmentFocused} value={hourValue} onChange={setHourValue} dateValue={updateValue} />
        <span aria-hidden="true" data-component="input-segment">:</span>
        <InputSegment aria-label="minute" segment="minute" setIsFocused={setInputSegmentFocused} value={minuteValue} onChange={setMinuteValue} dateValue={updateValue} />
        <span aria-hidden="true" data-component="input-segment"></span>
        <InputSegment aria-label="time of day" segment="TOD" setIsFocused={setInputSegmentFocused} value={todValue} onChange={setTODValue} dateValue={updateValue} />
      </GranularityInclude>
    </>
  );

  const dateGroupProps = useDateGroupFocus();
  if (excludeGroup) {
    return (
      <BaseInput containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
        {contents}
        <input type="hidden" value={`${formatter.to(updateValue, 'ISO')}`} name={props.name} />
      </BaseInput>
    )
  }

  return (
    <Group containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
      {contents}
      <input type="hidden" value={`${formatter.to(updateValue, 'ISO')}`} name={props.name} />
    </Group>
  )
};

const DateInput: React.FC<DateInputProps> = ({
  visibleMonths = 1,
  autoDismiss = true,
  presets = false,
  picker = false,
  isoType = null,
  output = null,
  includeYear = true,
  monthAsName = false,
  onChange: onExternalChange = (_value) => null,
  value: externalValue,
  granularity = 'day',
  excludeGroup,
  ...props
}) => {
  let includeTime = isoDateIncludesTime(externalValue);
  if (isoType === 'DateTime') includeTime = true;
  if (isoType === 'Date') includeTime = false;
  const formatter = useValueFormatter(output, includeTime);
  const onValueChange = (value: Date) => onExternalChange(formatter.to(value));

  // SYNC formatted external value with value
  const [value, setValue] = useState(formatter.from(externalValue));
  useEffect(() => {
    // Ensure internal value matches external value
    if (value !== formatter.from(externalValue)) setValue(formatter.from(externalValue));
  }, [formatter.from(externalValue)?.toString()]);
  // END SYNC


  useEffect(() => {
    // If internal value is different than the external value based on granularity, update
    // the external value. The granularity ensures that if this is a date picker, changes to
    // minutes do not trigger a change.
    if (!isEqual(value, formatter.from(externalValue), granularity)) onValueChange(value);
  }, [value?.toString()]);


  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" tabIndex={-1} />
        <Menu.Overlay aria-label="Pick a date">
          <Calendar visibleMonths={visibleMonths} presets={presets} value={value} onChange={setValue} output="Date" autoDismiss={autoDismiss} />
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
      formatter={formatter}
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
  value?: valueType;
  includeYear?: boolean;
  monthAsName?: boolean;
  isoType?: 'Date' | 'DateTime';
  output?: outputFormatType;
  onChange?: onChangeType;
  name?: string;
  [key: string]: any; // Allow additional props
}

export default DateInput;
export type { DateInputProps };
