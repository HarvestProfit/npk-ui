import React from 'react';
import { useLocale, useTimeField} from 'react-aria';
import {useTimeFieldState} from 'react-stately';
import InputSegment from './InputSegment';
import BaseInput, { useBaseInput } from '../BaseInput';

const TimeInput = ({ disabled, ...preProps }) => {
  const props = useBaseInput(preProps);
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    shouldForceLeadingZeros: true,
    locale
  });

  let ref = React.useRef(null);
  let { fieldProps } = useTimeField(props, state, ref);

  return (
    <BaseInput {...props} contentsProps={fieldProps} contentsRef={ref} containsSegments>
      {state.segments.map((segment, i) => (
        <InputSegment key={i} segment={segment} state={state} />
      ))}
    </BaseInput>
  );
}

export default TimeInput;