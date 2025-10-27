import React, { ReactNode } from 'react';
import BaseInput, { BaseInputProps } from '../BaseInput';

interface GroupProps extends BaseInputProps {
  children?: ReactNode;
  [key: string]: any; // Allow other props
}

const Group: React.FC<GroupProps> = ({ children, ...props }) => {
  return (
    <BaseInput {...props} data-component="input-group">
      {children}
    </BaseInput>
  );
}

Group.displayName = 'Input.Group';

export default Group;
export type { GroupProps };