import React, { ReactNode } from 'react';
import BaseInput, { BaseInputProps } from '../BaseInput';
import Button from '../Button';
import { MenuContentsContext } from '../Menu/MenuContext';

interface ControlProps extends BaseInputProps {
  children?: ReactNode;
  value?: any;
  name?: string;
  [key: string]: any; // Allow other props
}

const Control: React.FC<ControlProps> = ({ children, value = null, name = '', ...props }) => {

  return (
    <MenuContentsContext.Provider value={{ inMenu: false, role: 'listbox' }}>
      <Button.Context value={{
        tabIndex: '0',
        align: 'start',
        block: props.block,
        disabled: props.disabled,
        variant: 'secondary',
        invisible: true,
        truncate: true,
        size: props.size,
      }}>
        <BaseInput {...props} name={name} data-component="input-custom-control">
          {children}
          {(value || name) && <input type="hidden" value={value} name={name} disabled={props.disabled} aria-label={props['aria-label']} aria-labelledby={props['aria-labelledby']} aria-describedby={props['aria-describedby']} aria-required={props['aria-required']} />}
        </BaseInput>
      </Button.Context>
    </MenuContentsContext.Provider>
  );
}

Control.displayName = 'Input.Control';

export default Control;
export type { ControlProps };
