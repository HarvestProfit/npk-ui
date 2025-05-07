import React, { useEffect, useRef, useState } from 'react';
import BaseInput from '../BaseInput';
import Group from '../Input/Group';
import Calendar from '../Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import InputSegment from './InputSegment';
import { fromISO, fromTimestamp, monthAbbrevToIndex, monthHumanToIndex, monthIndexToAbbrev, monthIndexToHuman, toISO, toTimestamp } from '../Calendar/utils';

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

    const rootNode = e.target.dataset.component === 'input-group' ? e.target : e.target.closest('[data-component="input-group"]');
    if (rootNode.contains(document.activeElement)) {
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
  let updateValue = new Date(); // When updating a new date, we build off the current date and then set individual values
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

  const toMonthValue = monthAsName ? monthIndexToAbbrev : monthIndexToHuman;
  const fromMonthValue = monthAsName ? monthAbbrevToIndex : monthHumanToIndex;

  // Specify the rules of getting and setting the values of the segments
  const [monthValue, setMonthValue] = useOnChangeState(toMonthValue(segmentDateValue?.getMonth()), (month) => onChange(new Date(new Date(updateValue).setMonth(fromMonthValue(month)))));
  const [dayValue, setDayValue] = useOnChangeState(segmentDateValue?.getDate(), (day => onChange(new Date(new Date(updateValue).setDate(day)))));
  const [yearValue, setYearValue] = useOnChangeState(segmentDateValue?.getFullYear(), (year => onChange(new Date(new Date(updateValue).setFullYear(year)))));
  const [minuteValue, setMinuteValue] = useOnChangeState(segmentTimeValue?.getMinutes(), (minutes => onChange(new Date(new Date(updateValue).setMinutes(minutes)))));
  const [todValue, setTODValue] = useOnChangeState(hourAndTODfromDate(segmentTimeValue).tod, (tod) => {
    const hours = new Date(updateValue).getHours();
    if (tod === 'AM' && hours >= 12) {
      onChange(new Date(new Date(updateValue).setHours(hours - 12)))
    } else if (tod === 'PM' && hours < 12) {
      onChange(new Date(new Date(updateValue).setHours(hours + 12)))
    }
  });
  const [hourValue, setHourValue] = useOnChangeState(hourAndTODfromDate(segmentTimeValue).hour, (hour) => {
    const intHours = parseInt(hour);
    if (todValue === 'AM' && intHours === 12) { // hours are tricky because of the 12-hour format. Native date objects are 24-hour format
      onChange(new Date(new Date(updateValue).setHours(0)))
    } else if (todValue === 'PM' && intHours < 12) {
      onChange(new Date(new Date(updateValue).setHours(intHours + 12)))
    } else {
      onChange(new Date(new Date(updateValue).setHours(hour)))
    }
  });

  const ref = useRef<HTMLDivElement>(null);
  const [isInputSegmentInFocus, setInputSegmentFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (!isFocused) { // if the input is out of focus, we will accept updates from outside changes
      setMonthValue(toMonthValue(segmentDateValue?.getMonth()));
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
    dateParts.push(<InputSegment segment={monthAsName ? 'monthName' : 'month'} setIsFocused={setInputSegmentFocused} value={monthValue} onChange={setMonthValue} />);
  }
  if (['day', 'minute'].includes(granularity)) {
    dateParts.push(<InputSegment segment="day" setIsFocused={setInputSegmentFocused} value={dayValue} onChange={setDayValue} onOldChange={(day => onChange(new Date(new Date(updateValue).setDate(day))))} />);
  }
  if (includeYear && ['day', 'month', 'year', 'minute'].includes(granularity)) {
    dateParts.push(<InputSegment segment="year" setIsFocused={setInputSegmentFocused} value={yearValue} onChange={setYearValue} onOldChange={(year => onChange(new Date(new Date(updateValue).setFullYear(year))))} />);
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
        <InputSegment segment="hour" setIsFocused={setInputSegmentFocused} value={hourValue} onChange={setHourValue} />
        <span aria-hidden="true" data-component="input-segment">:</span>
        <InputSegment segment="minute" setIsFocused={setInputSegmentFocused} value={minuteValue} onChange={setMinuteValue} />
        <span aria-hidden="true" data-component="input-segment"></span>
        <InputSegment segment="TOD" setIsFocused={setInputSegmentFocused} value={todValue} onChange={setTODValue} />
      </GranularityInclude>
    </>
  );

  const dateGroupProps = useDateGroupFocus();
  if (excludeGroup) {
    return (
      <BaseInput containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
        {contents}
      </BaseInput>
    )
  }

  return (
    <Group containsSegments contentsRef={ref} {...dateGroupProps} {...props}>
      {contents}
    </Group>
  )
};

const DateInput = ({
  visibleMonths = 1,
  autoDismiss = true,
  presets = false,
  picker = false,
  output = 'ISO',
  includeYear = true,
  monthAsName = false,
  onChange: onExternalChange = (_value) => null,
  value: externalValue,
  granularity = 'day',
  excludeGroup,
  ...props
}) => {
  let value = externalValue;
  let onChange = onExternalChange;
  switch (output) {
    case 'ISO':
      value = fromISO(value);
      onChange = (newValue) => onExternalChange(toISO(newValue));
      break;
    case 'timestamp':
      value = fromTimestamp(value);
      onChange = (newValue) => onExternalChange(toTimestamp(newValue));
      break;
    default:
      break;
  }

  const extraProps: { trailingVisual?: React.ReactNode } = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu arrow placement="bottom" autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
        <Menu.Overlay>
          <Calendar visibleMonths={visibleMonths} presets={presets} value={value} onChange={onChange} output="date" autoDismiss={autoDismiss} />
        </Menu.Overlay>
      </Menu>
    );
  }

  return (
    <DateInputInternal 
      onChange={onChange} 
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
  onChange?: (date: Date) => void;
  [key: string]: any; // Allow additional props
}

export default DateInput;
export type { DateInputProps };