import React from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput } from '../BaseInput';
import { useTextField } from 'react-aria';

const Input = ({ width, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = React.useRef(null);
  const {
    inputProps,
  } = useTextField(props, ref);

  const { 
    focusContentsProps, 
    onMouseDown
  } = useFocusableContent(props, ref);

  const styles = {};
  if (width) styles.width = width;

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} {...inputProps} ref={ref} style={styles} />
    </BaseInput>
  );
}

export default Input;