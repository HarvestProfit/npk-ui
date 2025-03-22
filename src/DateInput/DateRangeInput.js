import React from 'react';
import {useDateRangePicker} from 'react-aria';
import {useDateRangePickerState} from 'react-stately';
import DateInput from './DateInput';
import BaseInput, { useBaseInput } from '../BaseInput';
import Calendar from './Calendar'
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';

const DateRangeInput = ({ picker, ...preProps}) => {
  const props = useBaseInput(preProps);
  let state = useDateRangePickerState(props);
  let ref = React.useRef(null);
  let {
    groupProps,
    startFieldProps,
    endFieldProps,
    calendarProps
  } = useDateRangePicker({
    ...props,
  }, state, ref);

  const extraProps = {};

  if (picker) {
    extraProps.trailingVisual = (
      <Menu autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
        <Menu.Overlay>
          <Calendar.Range {...calendarProps} />
        </Menu.Overlay>
      </Menu>
    )
  }

  return (
    <BaseInput {...props} {...extraProps} contentsProps={groupProps} contentsRef={ref} containsSegments>
      <DateInput {...startFieldProps} />
      <span style={{ padding: '0 10px' }}>–</span>
      <DateInput {...endFieldProps} />
    </BaseInput>
  );
}

export default DateRangeInput;