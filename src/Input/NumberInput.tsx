import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import Input, { InputProps } from '.';

interface NumberInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  onChange?: (value?: number) => void;
  value?: number;
  type?: 'currency' | 'number' | 'percentage';
}

const NumberInput: React.FC<NumberInputProps> = ({ onChange = (_v) => null, value, ...props }) => {
  
  return (
    <Input
      mask="number"
      value={`${value || ''}`}
      onChange={(v) => {
        const parsedValue = parseFloat(v);
        onChange(isNaN(parsedValue) ? null : parsedValue);
      }}
      {...props}
    />
  )
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

  if (props.type === 'percentage') {
    suggestedProps.trailingVisual = '%';
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