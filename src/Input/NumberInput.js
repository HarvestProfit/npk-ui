import React, { useContext } from 'react';
import classes from './Input.module.css';
import BaseInput, { useFocusableContent, useBaseInput } from '../BaseInput';
import { useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import ThemeContext from '../ThemeContext';

const NumberInput = ({ width, ...preProps }) => {
  const props = useBaseInput(preProps);
  const ref = React.useRef(null);

  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });

  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps
  } = useNumberField(props, state, ref);


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

export default (props) => {
  const theme = useContext(ThemeContext);
  let suggestedProps = {};
  let suggestedFormatOptions = {};
  if (props.type === 'currency') {
    suggestedProps.leadingVisual = theme.currencySymbol || '$';
    suggestedFormatOptions.minimumFractionDigits = 2;
    suggestedFormatOptions.maximumFractionDigits = 4;
  }

  const formatOptions = { ...suggestedFormatOptions, ...props.formatOptions || {} };
  return <NumberInput {...suggestedProps} {...props} formatOptions={formatOptions} />
}