import React, { useEffect, useRef, useState } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { AriaTextFieldOptions } from '@react-aria/textfield';
import useMask from '../hooks/useMask';
import maskFetch from './masks';

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

const Input: React.FC<InputProps> = ({ selectAllOnFocus = true, mask, value: externalValue, onChange: onExternalChange, debounce = false, placeholder, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = useRef(null);
  const debounceRef = useRef<any>();
  const [internalValue, setInternalValue] = useState(externalValue);


  const maskFunction = maskFetch[mask] || (() => null);

  const inputMask = useMask({
    mask: maskFunction(props),
    ...props
  });

  const onInternalChange = (value) => {
    setInternalValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onExternalChange) onExternalChange(value);
    }, debounce ? (typeof debounce === 'number' ? debounce : 500) : 0);
  };

  const { 
    focusContentsProps, 
    onMouseDown,
    isFocused,
  } = useFocusableContent(props, ref);

  useEffect(() => {
    if (!isFocused) setInternalValue(externalValue);
  }, [externalValue]);

  const onFocus = () => {
    if (!selectAllOnFocus) return;
    setTimeout(() => {
      if (ref.current) ref.current.select();
    }, 30);
  }

  const onBlur = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onInternalChange(inputMask.formatter(internalValue));
    if (onExternalChange) onExternalChange(inputMask.formatter(internalValue));
  }

  const handleChangeEvent = (e) => {
    if (props.type === 'file') {
      onInternalChange(e.target.files);
      return;
    }
    
    onInternalChange(e.target.value);
  }

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} value={internalValue} onChange={handleChangeEvent} onKeyDown={inputMask.onKeyDown} ref={ref} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };