import React from 'react';
import { useDateSegment } from '@react-aria/datepicker';
import { DateFieldState, DateSegment } from '@react-stately/datepicker';

interface InputSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
}

const InputSegment: React.FC<InputSegmentProps> = ({ segment, state }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <span
      {...segmentProps}
      ref={ref}
      data-component="input-segment"
      data-placeholder={segment.isPlaceholder}
    >
      {segment.text}
    </span>
  );
};

export default InputSegment;