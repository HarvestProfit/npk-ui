import React, { ReactNode } from 'react';
import BaseInput, { BaseInputProps } from '../BaseInput';
import Button from '../Button';
import { MenuContentsContext } from '../Menu/MenuContext';

interface ControlProps extends BaseInputProps {
  children?: ReactNode;
  [key: string]: any; // Allow other props
}

const Control: React.FC<ControlProps> = ({ children, ...props }) => {

  return (
    <MenuContentsContext.Provider value={{ variant: 'select', inMenu: false }}>
      <Button.Context value={{ 
        tabIndex: '0', 
        align: 'start', 
        block: props.block, 
        disabled: props.disabled, 
        variant: 'secondary', 
        invisible: true,
        truncate: true,
        size: props.size
      }}>
        <BaseInput {...props} data-component="input-custom-control">
          {children}
        </BaseInput>
      </Button.Context>
    </MenuContentsContext.Provider>
  );
}

Control.displayName = 'Input.Control';

export default Control;
export type { ControlProps };