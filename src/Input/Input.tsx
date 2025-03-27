import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { useTextField, AriaTextFieldOptions } from '@react-aria/textfield';

interface InputProps extends BaseInputProps {
  [key: string]: any; // Allow other props
  autoCapitalize?: AriaTextFieldOptions<"input">['autoCapitalize']; // Resolve conflict
  defaultValue?: string | number; // Unified type for defaultValue
  onBlur?: (any?) => void;
  onFocus?: (any?) => void;
  onChange?: (string) => void;
  value?: string;
  width?: string | number;
  debounce?: boolean | number;
  loading?: boolean;
}

const Input: React.FC<InputProps> = ({ selectAllOnFocus = true, value: externalValue, onChange: onExternalChange, debounce = false, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = useRef(null);
  const debounceRef = useRef<any>();
  const [internalValue, setInternalValue] = useState(externalValue);

  const onInternalChange = (value) => {
    setInternalValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onExternalChange) onExternalChange(value);
    }, debounce ? (typeof debounce === 'number' ? debounce : 500) : 0);
  };

  const inputFieldProps = useMemo(() => ({
    ...props,
    onChange: onInternalChange,
    value: internalValue
  }), [internalValue]);

  const { inputProps } = useTextField(inputFieldProps as unknown as AriaTextFieldOptions<"input">, ref);

  const { 
    focusContentsProps, 
    onMouseDown,
    isFocused,
  } = useFocusableContent(props, ref);

  useEffect(() => {
    if (!isFocused) setInternalValue(externalValue);
  }, [externalValue]);

  const onFocus = (e) => {
    if (inputProps.onFocus) inputProps.onFocus(e);

    if (!selectAllOnFocus) return;
    setTimeout(() => {
      ref.current.select();
    }, 30);
  }

  const onBlur = (e) => {
    if (inputProps.onBlur) inputProps.onBlur(e);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (onExternalChange) onExternalChange(internalValue);
  }

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} {...inputProps} ref={ref} onFocus={onFocus} onBlur={onBlur} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };