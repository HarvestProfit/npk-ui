import React from 'react';
import classes from './DateInput.module.css';
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
      className={`${classes.InputSegment}`}
    >
      {segment.text}
    </span>
  );
}

export default InputSegment;