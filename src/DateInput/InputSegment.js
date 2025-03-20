import React from 'react';
import classes from './DateInput.module.css';
import { useDateSegment } from 'react-aria';

const InputSegment = ({ segment, state }) => {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);
  console.log(segment)

  return (
    <span
      {...segmentProps}
      ref={ref}
      className={`${classes.InputSegment} ${segment.isPlaceholder ? 'placeholder' : ''}`}
    >
      {segment.text}
    </span>
  );
}

export default InputSegment;