import React from 'react';
import {useDateField, useLocale, useDatePicker} from 'react-aria';
import {useDateFieldState, useDatePickerState} from 'react-stately';
import InputSegment from './InputSegment';
import BaseInput, { useBaseInput } from '../BaseInput';
import Calendar, { createCalendar } from './Calendar'
import Menu from '../Menu';
import Button from '../Button';
import { CalendarIcon } from '@harvest-profit/npk/icons/regular';

const DateInput = (preProps) => {
  const props = useBaseInput(preProps);
  const { locale } = useLocale();

  const ref = React.useRef(null);
  const state = useDateFieldState({
    ...props,
    shouldForceLeadingZeros: true,
    locale,
    createCalendar
  });

  const { fieldProps } = useDateField(props, state, ref);
  

  return (
    <BaseInput {...props} contentsProps={fieldProps} contentsRef={ref} containsSegments>
      {state.segments.map((segment, i) => (
        <InputSegment key={i} segment={segment} state={state} />
      ))}
    </BaseInput>
  );
}

export default ({ picker, ...props }) => {
  if (picker) {
    const ref = React.useRef(null);
    const state = useDatePickerState(props);
    const {
      groupProps,
      fieldProps,
      calendarProps
    } = useDatePicker(props, state, ref);

    const trailingVisual = (
      <Menu autoDismiss={false}>
        <Button invisible icon={CalendarIcon} aria-label="Pick a date" />
        <Menu.Overlay>
          <Calendar {...calendarProps} />
        </Menu.Overlay>
      </Menu>
    )

    return (
      <BaseInput contentsProps={groupProps} contentsRef={ref} trailingVisual={trailingVisual}>
        <DateInput {...fieldProps} />
      </BaseInput>
    );
  }

  return <DateInput {...props} />;
};