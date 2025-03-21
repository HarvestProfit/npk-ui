import React from 'react';
import BaseInput, { useFocusableContent } from '../BaseInput';

const Group = ({ children, ...props }) => {
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