import React, { ReactNode } from 'react';
import BaseInput, { BaseInputProps, useFocusableContent } from '../BaseInput';

interface GroupProps extends BaseInputProps {
  children?: ReactNode;
  [key: string]: any; // Allow other props
}

const Group: React.FC<GroupProps> = ({ children, ...props }) => {
  const { 
    focusContentsProps, 
    onMouseDown 
  } = useFocusableContent(props);

  return (
    <BaseInput {...props} onMouseDown={onMouseDown} contentsProps={focusContentsProps}>
      {children}
    </BaseInput>
  );
}

export default Group;
export type { GroupProps };