import React from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { AriaTextFieldOptions, useTextField } from 'react-aria';

interface InputProps extends BaseInputProps {
  [key: string]: any; // Allow other props
  autoCapitalize?: AriaTextFieldOptions<"input">['autoCapitalize']; // Resolve conflict
  defaultValue?: string | number; // Unified type for defaultValue
  onBlur?: (any?) => void;
  onFocus?: (any?) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string | number;
}

const Input: React.FC<InputProps> = ({ width, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = React.useRef(null);
  const {
    inputProps,
  } = useTextField(props as unknown as AriaTextFieldOptions<"input">, ref);

  const { 
    focusContentsProps, 
    onMouseDown
  } = useFocusableContent(props, ref);

  const styles: any = {};
  if (width) styles.width = width;

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} {...inputProps} ref={ref} style={styles} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };