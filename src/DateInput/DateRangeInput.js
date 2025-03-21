import React from 'react';
import classes from './DateInput.module.css';
import {useDateRangePicker} from 'react-aria';
import {useDateRangePickerState} from 'react-stately';
import DateInput from './DateInput';
import BaseInput, { useBaseInput } from '../BaseInput';

const DateRangeInput = ({ ...preProps}) => {
  const props = useBaseInput(preProps);
  let state = useDateRangePickerState(props);
  let ref = React.useRef(null);
  let {
    groupProps,
    startFieldProps,
    endFieldProps
  } = useDateRangePicker({
    ...props,
  }, state, ref);

  return (
    <BaseInput className={classes.DateRangeInput} {...props} contentsProps={groupProps} contentsRef={ref} containsSegments>
      <DateInput {...startFieldProps} />
      <span className={classes.DateRangeInputSeparator}>–</span>
      <DateInput {...endFieldProps} />
    </BaseInput>
  );
}

export default DateRangeInput;