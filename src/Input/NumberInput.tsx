import React, { useContext } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput, BaseInputProps } from '../BaseInput';
import { AriaNumberFieldProps, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState, NumberFieldState, NumberFieldStateOptions } from 'react-stately';
import ThemeContext from '../ThemeContext';

interface NumberInputProps extends Omit<BaseInputProps, 'onChange'> {
  width?: string | number;
  onChange?: (value?: number) => void;
  value?: number;
  type?: 'currency' | 'number';
  formatOptions?: Intl.NumberFormatOptions;
  [key: string]: any; // Allow additional props
}

const NumberInput: React.FC<NumberInputProps> = ({ width, ...preProps }) => {
  const props = useBaseInput(preProps as unknown as BaseInputProps);
  const ref = React.useRef<HTMLInputElement>(null);

  const { locale } = useLocale();
  const state: NumberFieldState = useNumberFieldState({ ...props as unknown as NumberFieldStateOptions, locale });

  const { inputProps } = useNumberField(props as unknown as AriaNumberFieldProps, state, ref);

  const { focusContentsProps, onMouseDown } = useFocusableContent(props, ref);

  const styles: any = {};
  if (width) styles.width = width;

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      <input className={classes.Input} {...inputProps} ref={ref} style={styles} />
    </BaseInput>
  );
};

const NumberInputWrapper: React.FC<NumberInputProps> = (props) => {
  const theme = useContext(ThemeContext);
  let suggestedProps: Partial<NumberInputProps> = {};
  let suggestedFormatOptions: Intl.NumberFormatOptions = {};

  if (props.type === 'currency') {
    suggestedProps.leadingVisual = theme.currencySymbol || '$';
    suggestedFormatOptions.minimumFractionDigits = 2;
    suggestedFormatOptions.maximumFractionDigits = 4;
  }

  const formatOptions = { ...suggestedFormatOptions, ...(props.formatOptions || {}) };

  return <NumberInput {...suggestedProps} {...props} formatOptions={formatOptions} />;
};

export default NumberInputWrapper;
export type { NumberInputProps };