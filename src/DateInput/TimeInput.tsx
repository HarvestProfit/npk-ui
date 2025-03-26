import React, { useMemo, useState } from 'react';
import { useLocale } from '@react-aria/i18n';
import { TimeValue, useTimeField } from '@react-aria/datepicker';
import { useTimeFieldState, TimeFieldState, TimeFieldStateOptions } from '@react-stately/datepicker';
import InputSegment from './InputSegment';
import BaseInput, { BaseInputProps, useBaseInput } from '../BaseInput';
import { toTime, ZonedDateTime } from '@internationalized/date';
import { parseISOFormats } from './Calendar';

interface TimeInputProps {
  disabled?: boolean;
  locale?: string;
  shouldForceLeadingZeros?: boolean;
  [key: string]: any; // Allow additional props
}

function parseISOTime(value: string): TimeValue | null {
  if (!value) return null;
  const parseValue = parseISOFormats(value);
  if (!parseValue) return null;
  return toTime(parseValue as ZonedDateTime);
}

const TimeInput: React.FC<TimeInputProps> = ({ disabled, value: externalValue, onChange: onExternalChange, granularity, ...preProps }) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const { locale } = useLocale();

  const inputFormat = (typeof externalValue === 'string') ? 'string' : 'TimeValue';
  const [internalValue, setInternalValue] = useState(inputFormat === 'string' ? parseISOTime(externalValue) : externalValue);
  const onInternalChange = (newValue?: TimeValue) => {
    if (onExternalChange) onExternalChange(inputFormat === 'string' ? newValue?.toString() : newValue);
    setInternalValue(newValue);
  }

  const inputProps = useMemo(() => ({
    ...props,
    onChange: onInternalChange,
    value: internalValue
  }), [internalValue]);

  const state: TimeFieldState = useTimeFieldState({
    ...inputProps as unknown as TimeFieldStateOptions<TimeValue>,
    shouldForceLeadingZeros: true,
    locale,
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { fieldProps } = useTimeField(inputProps as unknown as TimeFieldStateOptions<TimeValue>, state, ref);

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