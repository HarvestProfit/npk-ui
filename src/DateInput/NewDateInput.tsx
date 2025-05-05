import React, { useEffect, useMemo, useRef, useState } from 'react';
import BaseInput, { BaseInputProps, useBaseInput, useFocusableContent } from '../BaseInput';
import Group from '../Input/Group';
import Calendar, { calendarDateToISOValueString, createCalendar, stringISOToCalendarDate } from './Calendar';
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';
import useMask from '../hooks/useMask';
import { calendarYearMask, calendarMonthMask, calendarDayMask, calendarHourMask, calendarMinuteMask, calendarTimeOfDayMask } from '../Input/masks';

const InputSegment = ({ segment, ...props }) => {
  const [value, setValue] = useState('');
  const valueRef = useRef(value);
  const segmentRef = useRef<HTMLSpanElement>(null);

  let mask = null;
  let placeholder = '';
  switch (segment) {
    case 'year':
      mask = calendarYearMask;
      placeholder = 'yyyy';
      break;
    case 'month':
      mask = calendarMonthMask;
      placeholder = 'mm';
      break;
    case 'day':
      mask = calendarDayMask;
      placeholder = 'dd';
      break;
    case 'hour':
      mask = calendarHourMask;
      placeholder = '––';
      break;
    case 'minute':
      mask = calendarMinuteMask;
      placeholder = '––';
      break;
    case 'TOD':
      mask = calendarTimeOfDayMask;
      placeholder = 'AM';
      break;
  }

  const inputMask = useMask({
    mask: mask(props),
    ...props,
    onChange: setValue,
    onKeyDown: (e, specialKey) => {
      let newValue = valueRef.current;
      if (!specialKey) {
        newValue = newValue + e.key;
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (segment === 'TOD') newValue = '';
        newValue = newValue.slice(0, newValue.length - 1);
      }

      if (segment === 'TOD') {
        if (e.key.toLowerCase() === 'a') newValue = 'AM';
        if (e.key.toLowerCase() === 'p') newValue = 'PM';
        setValue(calendarTimeOfDayMask().formatter(newValue));
      } else {
        setValue(newValue);
      }

      e.preventDefault();
    },
    valueRef: valueRef,
  });
  useEffect(() => {
    if (['month', 'day', 'hour', 'minute'].includes(segment) && value.length === 2) {
      valueRef.current = '';
    } else if (['year'].includes(segment) && value.length === 4) {
      valueRef.current = '';
    } else {
      valueRef.current = value;
    }
    // if (props.onChange) props.onChange(value);
  }, [value]);

  const onBlur = (e) => {
    if (props.onBlur) props.onBlur(e);
    setValue(inputMask.formatter(value));
  }

  const valueIsEmpty = value === '' || value === undefined || value === null;

  return (
    <span ref={segmentRef} tabIndex={0} data-component="input-segment" onKeyDown={inputMask.onKeyDown} onBlur={onBlur} enterKeyHint="next" inputMode="numeric" contentEditable suppressContentEditableWarning role="spinbutton" style={{ minWidth: segment === 'year' ? '2.35em' : '1.35em', caretColor: 'transparent' }} data-placeholder={valueIsEmpty}>{valueIsEmpty ? placeholder : value}</span>
  )
}

const DateInput = ({
  onChange,
  value,
  ...props
}) => {

  // if (picker) {
  //   const ref = React.useRef<HTMLDivElement>(null);
  //   const state = useDatePickerState(inputProps);
  //   const { groupProps, fieldProps, calendarProps } = useDatePicker(inputProps, state, ref);

  //   const trailingVisual = (
  //     <Menu arrow placement="bottom" autoDismiss={false}>
  //       <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
  //       <Menu.Overlay>
  //         <Calendar {...calendarProps} visibleMonths={visibleMonths} presets={presets} />
  //       </Menu.Overlay>
  //     </Menu>
  //   );

  //   return (
  //     <BaseInput contentsProps={groupProps} contentsRef={ref} trailingVisual={trailingVisual}>
  //       <DateInputInternal {...fieldProps} onExternalChange={onExternalChange} externalValue={externalValue} setInternalValue={setInternalValue} inputFormat={inputFormat} />
  //     </BaseInput>
  //   );
  // }

  return (
    <Group containsSegments>
      <InputSegment segment="month" value={value?.getMonth()} onChange={(month => onChange(new Date(value).setMonth(month)))} />
      <span aria-hidden="true" data-component="input-segment">/</span>
      <InputSegment segment="day" value={value?.getDate()} onChange={(day => onChange(new Date(value).setDate(day)))} />
      <span aria-hidden="true" data-component="input-segment">/</span>
      <InputSegment segment="year" value={value?.getFullYear()} onChange={(year => onChange(new Date(value).setFullYear(year)))} />
      <span aria-hidden="true" data-component="input-segment">, </span>
      <span aria-hidden="true" data-component="input-segment"></span>
      <InputSegment segment="hour" value={value?.getHours()} onChange={(hours => onChange(new Date(value).setHours(hours)))} />
      <span aria-hidden="true" data-component="input-segment">:</span>
      <InputSegment segment="minute" value={value?.getMinutes()} onChange={(minutes => onChange(new Date(value).setMinutes(minutes)))} />
      <span aria-hidden="true" data-component="input-segment"></span>
      <InputSegment segment="TOD" value={value?.getMonth()} onChange={(month => onChange(new Date(value).setMonth(month)))} />
    </Group>
  )
};

export default DateInput;