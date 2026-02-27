import React, { ReactNode } from 'react';
import { BaseInputLabel, BaseInputLabelProps } from '../BaseInput';

const Label: React.FC<BaseInputLabelProps> = ({ children, ...props }) => {
  return (
    <BaseInputLabel {...props} data-component="input-label">
      {children}
    </BaseInputLabel>
  );
}

Label.displayName = 'Input.Label';

export default Label;
export type { BaseInputLabelProps as LabelProps };
