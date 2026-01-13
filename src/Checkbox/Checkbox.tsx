import React, { FC, useState } from 'react';
import CheckboxCheckedIcon from './assets/checked';
import CheckboxUncheckedIcon from './assets/unchecked';
import CheckboxMixedIcon from './assets/mixed';
import classes from './Checkbox.module.css';
import { nextFocusableElement } from '../utils';

interface CheckboxProps {
  label?: String,
  labelDescription?: String,
  className?: string;
  value: boolean | 'mixed';
  disabled?: boolean;
  toggleOnLabelClick?: boolean;
  [key: string]: any; // Allow other props
}

let incId = 0; // note, replace with useId when we finally get to a later version of react.
const Checkbox: FC<CheckboxProps> & {} = ({
  label,
  labelDescription,
  value = false,
  onChange,
  disabled = false,
  className = '',
  toggleOnLabelClick = true,
  ...props
}) => {
  const [uniqueID] = useState(`npk-checkbox-${incId++}`);
  const onChangeValue = () => {
    if (disabled) return;
    if ((value || false) === false || value === 'mixed') {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  let labellingIds = {}
  if (label) {
    labellingIds['aria-labelledby'] = `${uniqueID}-label`;
    if (labelDescription) labellingIds['aria-describedby'] = `${uniqueID}-description`;
  }

  const input = (
    <div
      role="checkbox"
      aria-checked={value || false}
      onClick={onChangeValue}
      aria-disabled={disabled}
      tabIndex={0}
      onKeyDown={(event) => {
        console.log(event.key);
        if (event.key === ' ' || event.key === 'Enter') {
          // Don't scroll the page if space is pressed
          event.preventDefault();
          onChangeValue();
        }
      }}
      className={classes.Checkbox}
      {...labellingIds}
      {...props}
    >
      <input name={props.name} type="hidden" value={`${value || false}`} />
      {value === true && (<CheckboxCheckedIcon />)}
      {(value || false) === false && (<CheckboxUncheckedIcon />)}
      {value === 'mixed' && (<CheckboxMixedIcon />)}
    </div>
  );

  if (label) {
    return (
      <label className={`${classes.Label} ${className}`} onClick={(e) => {
        if (e.currentTarget.contains(document.activeElement)) {
          e.preventDefault();
          return;
        }

        const nextElem = nextFocusableElement({ parentElem: e.currentTarget });
        nextElem?.focus();
        if (toggleOnLabelClick) onChangeValue();
        e.preventDefault();
      }}>
        {input}
        <span data-component="label">
          <span data-component="label-contents" id={labellingIds['aria-labelledby']}>{label}</span>
          {labelDescription && <span data-component="label-description" id={labellingIds['aria-describedby']}>{labelDescription}</span>}
        </span>
      </label>
    )
  }
};

export default Checkbox;
export type { CheckboxProps };
