import React, { useContext, useEffect, useMemo } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { useLocale } from '@react-aria/i18n';
import { useNumberField, AriaNumberFieldProps} from '@react-aria/numberfield';
import { useNumberFieldState, NumberFieldState, NumberFieldStateOptions} from '@react-stately/numberfield';
import ThemeContext from '../ThemeContext';

interface NumberInputProps extends Omit<BaseInputProps, 'onChange'> {
  width?: string | number;
  onChange?: (value?: number) => void;
  value?: number;
  type?: 'currency' | 'number';
  formatOptions?: Intl.NumberFormatOptions;
  [key: string]: any; // Allow additional props
}

const NumberInput: React.FC<NumberInputProps> = ({ width, onChange: onExternalChange, value: externalValue, selectAllOnFocus = true, ...preProps }) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const ref = React.useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = React.useState<number | undefined>(externalValue);

  const numberNaNtoNull = (value?: number) => {
    return (value === undefined || Number.isNaN(value)) ? null : value;
  }

  const onInternalChange = (newValue?: number) => {
    if (onExternalChange) onExternalChange(numberNaNtoNull(newValue));
    setInternalValue(newValue);
  }

  const inputFieldProps = useMemo(() => ({
    ...props,
    onChange: onInternalChange,
    value: internalValue
  }), [internalValue]);

  const { locale } = useLocale();
  const state: NumberFieldState = useNumberFieldState({ ...inputFieldProps as unknown as NumberFieldStateOptions, locale });
  const { inputProps } = useNumberField(inputFieldProps as unknown as AriaNumberFieldProps, state, ref);
  const { focusContentsProps, onMouseDown, isFocused } = useFocusableContent(props, ref);

  useEffect(() => {
    if (isFocused && onExternalChange) onExternalChange(numberNaNtoNull(state.numberValue));
  }, [state.numberValue]);

  useEffect(() => {
    if (!isFocused) setInternalValue(externalValue);
  }, [externalValue]);

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
};

const NumberInputWrapper: React.FC<NumberInputProps> = ({ ...props}) => {
  const theme = useContext(ThemeContext);
  let suggestedProps: Partial<NumberInputProps> = {};
  let suggestedFormatOptions: Intl.NumberFormatOptions = {};


  if (props.type === 'currency') {
    suggestedProps.leadingVisual = theme.currencySymbol || '$';
    suggestedFormatOptions.minimumFractionDigits = 2;
    suggestedFormatOptions.maximumFractionDigits = 4;
  }

  const formatOptions = { ...suggestedFormatOptions, ...(props.formatOptions || {}) };

  return (
  <NumberInput 
    {...suggestedProps} 
    {...props}
    formatOptions={formatOptions}
  />);
};

export default NumberInputWrapper;
export type { NumberInputProps };