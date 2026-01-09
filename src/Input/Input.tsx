import React, { useEffect, useRef, useState } from 'react';
import classes from './Input.module.css';
import BaseInput, { useBaseInput, BaseInputProps } from '../BaseInput';
import useMask, { MaskType } from '../hooks/useMask';
import maskFetch from './masks';

interface InputProps extends BaseInputProps {
  [key: string]: any; // Allow other props
  onBlur?: (any?) => void;
  onFocus?: (any?) => void;
  onChange?: (string) => void;
  value?: string;
  width?: string | number;
  mask?: 'number' | 'calendar-day' | 'calendar-month' | 'calendar-year' | 'time-hour' | 'time-minute' | 'time-tod' | MaskType;
  debounce?: boolean | number;
  loading?: boolean;
  disabled?: boolean;
  formatOptions?: any;
  type?: string;
  name?: string;
  readOnly?: boolean;
  emphasis?: boolean;
}

const Input: React.FC<InputProps> = ({ selectAllOnFocus = true, mask, value: externalValue, onChange: onExternalChange, debounce = false, readOnly = false, emphasis = false, formatOptions = {}, ...props }) => {
  const inputProps = useBaseInput(props);

  const maskFunction = (typeof mask === 'string') ? maskFetch[mask] : (mask || (() => null));

  const inputMask = useMask({
    mask: maskFunction(formatOptions),
    ...props
  });

  const ref = useRef(null);
  const debounceRef = useRef<any>(null);
  const [internalValue, setInternalValue] = useState(inputMask.formatter(externalValue));
  const [isFocused, setIsFocused] = useState(false);

  const onInternalChange = (value) => {
    setInternalValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onExternalChange) onExternalChange(value);
    }, debounce ? (typeof debounce === 'number' ? debounce : 500) : 0);
  };

  useEffect(() => {
    if (!isFocused) setInternalValue(inputMask.formatter(externalValue));
  }, [externalValue]);

  const onFocus = () => {
    setIsFocused(true);
    if (!selectAllOnFocus) return;
    setTimeout(() => {
      if (ref.current) ref.current.select();
    }, 30);
  }

  const onBlur = () => {
    setIsFocused(false);
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

  if (readOnly) {
    const widthStyles = props.width ? { width: props.width } : {};
    return (
      <BaseInput {...props} variant="plain" labelAlign={props.align}>
        <span {...inputProps} style={widthStyles} data-component="readonly-content" data-emphasis={emphasis} className={classes.ReadonlyInput} ref={ref}>{internalValue || ''}</span>
      </BaseInput>
    )
  }

  let InputComponent: keyof React.JSX.IntrinsicElements = 'input';
  if (props.type === 'textarea') InputComponent = 'textarea';

  return (
    <BaseInput {...props}>
      <InputComponent {...inputProps} className={classes.Input} value={internalValue || ''} onChange={handleChangeEvent} onFocus={onFocus} onBlur={onBlur} onKeyDown={inputMask.onKeyDown} ref={ref} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };
