import React from 'react';
import classes from './DateInput.module.css';
import {useDateField, useLocale} from 'react-aria';
import {useDateFieldState} from 'react-stately';
import {GregorianCalendar} from '@internationalized/date';
import InputSegment from './InputSegment';
import BaseInput, { useBaseInput } from '../BaseInput';

function createCalendar(identifier) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

const DateInput = ({ ...preProps }) => {
  const props = useBaseInput(preProps);
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    shouldForceLeadingZeros: true,
    locale,
    createCalendar
  });

  let ref = React.useRef(null);
  let { fieldProps } = useDateField(props, state, ref);

  return (
    <BaseInput className={classes.DateInput} {...props} contentsProps={fieldProps} contentsRef={ref} containsSegments>
      {state.segments.map((segment, i) => (
        <InputSegment key={i} segment={segment} state={state} />
      ))}
    </BaseInput>
  );
}

export default DateInput;