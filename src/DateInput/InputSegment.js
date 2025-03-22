import React from 'react';
import { useDateSegment } from 'react-aria';

const InputSegment = ({ segment, state }) => {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

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
}

export default InputSegment;