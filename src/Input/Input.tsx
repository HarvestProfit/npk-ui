import React from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { useTextField, AriaTextFieldOptions } from '@react-aria/textfield';

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

const Input: React.FC<InputProps> = ({ width, selectAllOnFocus = true, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = React.useRef(null);
  const { inputProps } = useTextField(props as unknown as AriaTextFieldOptions<"input">, ref);

  const { 
    focusContentsProps, 
    onMouseDown
  } = useFocusableContent(props, ref);

  const styles: any = {};
  if (width) styles.width = width;

  const onFocus = (e) => {
    if (inputProps.onFocus) inputProps.onFocus(e);

    if (!selectAllOnFocus) return;
    setTimeout(() => {
      ref.current.select();
    }, 30);
  }

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} {...inputProps} ref={ref} style={styles} onFocus={onFocus} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };