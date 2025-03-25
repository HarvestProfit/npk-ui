import React from 'react';
import { useLocale } from '@react-aria/i18n';
import { TimeValue, useTimeField } from '@react-aria/datepicker';
import { useTimeFieldState, TimeFieldState, TimeFieldStateOptions } from '@react-stately/datepicker';
import InputSegment from './InputSegment';
import BaseInput, { BaseInputProps, useBaseInput } from '../BaseInput';

interface TimeInputProps {
  disabled?: boolean;
  locale?: string;
  shouldForceLeadingZeros?: boolean;
  [key: string]: any; // Allow additional props
}

const TimeInput: React.FC<TimeInputProps> = ({ disabled, ...preProps }) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const { locale } = useLocale();

  const state: TimeFieldState = useTimeFieldState({
    ...props as unknown as TimeFieldStateOptions<TimeValue>,
    shouldForceLeadingZeros: true,
    locale,
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { fieldProps } = useTimeField(props as unknown as TimeFieldStateOptions<TimeValue>, state, ref);

  return (
    <BaseInput {...props} contentsProps={fieldProps} contentsRef={ref} containsSegments>
      {state.segments.map((segment, i) => (
        <InputSegment key={i} segment={segment} state={state} />
      ))}
    </BaseInput>
  );
};

export default TimeInput;
export type { TimeInputProps };