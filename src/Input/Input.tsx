import React, { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { useTextField, AriaTextFieldOptions } from '@react-aria/textfield';
import useMask from '../hooks/useMask';
import { numericMask } from './masks';

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

function focusNextElement( reverse, activeElem = null ) {
  /*check if an element is defined or use activeElement*/
  activeElem = activeElem instanceof HTMLElement ? activeElem : document.activeElement;

  let queryString = [
      'a:not([disabled]):not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([disabled]):not([tabindex="-1"])'
      /* add custom queries here */
    ].join(','),
    queryResult = Array.prototype.filter.call(document.querySelectorAll(queryString), elem => {
      /*check for visibility while always include the current activeElement*/
      return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem === activeElem;
    }),
    indexedList = queryResult.slice().filter(elem => {
      /* filter out all indexes not greater than 0 */
      return elem.tabIndex == 0 || elem.tabIndex == -1 ? false : true;
    }).sort((a, b) => {
      /* sort the array by index from smallest to largest */
      return a.tabIndex != 0 && b.tabIndex != 0 
        ? (a.tabIndex < b.tabIndex ? -1 : b.tabIndex < a.tabIndex ? 1 : 0) 
        : a.tabIndex != 0 ? -1 : b.tabIndex != 0 ? 1 : 0;
    }),
    focusable = [].concat(indexedList, queryResult.filter(elem => {
      /* filter out all indexes above 0 */
      return elem.tabIndex == 0 || elem.tabIndex == -1 ? true : false;
    }));

  /* if reverse is true return the previous focusable element
     if reverse is false return the next focusable element */
  return reverse ? (focusable[focusable.indexOf(activeElem) - 1] || focusable[focusable.length - 1]) 
    : (focusable[focusable.indexOf(activeElem) + 1] || focusable[0]);
}

const Input: React.FC<InputProps> = ({ selectAllOnFocus = true, value: externalValue, onChange: onExternalChange, debounce = false, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = useRef(null);
  const debounceRef = useRef<any>();
  const [internalValue, setInternalValue] = useState(externalValue);

  const mask = useMask({
    mask: numericMask({ maximumFractionDigits: 2, minimumFractionDigits: 2 }),
    ...props
  });

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

  const onFocus = () => {
    if (!selectAllOnFocus) return;
    setTimeout(() => {
      if (ref.current) ref.current.select();
    }, 30);
  }

  const onBlur = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onInternalChange(mask.formatter(internalValue));
    if (onExternalChange) onExternalChange(mask.formatter(internalValue));
  }

  const handleChangeEvent = (e) => {
    if (props.type === 'file') {
      onInternalChange(e.target.files);
      return;
    }

    // if (e.target.value.length > 5) {
    //   focusNextElement(false).focus();
    // }
    
    onInternalChange(e.target.value);
  }

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} value={internalValue} onChange={handleChangeEvent} onKeyDown={mask.onKeyDown} ref={ref} onFocus={onFocus} onBlur={onBlur} />
    </BaseInput>
  );
}

export default Input;
export type { InputProps };