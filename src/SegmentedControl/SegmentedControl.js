import React, { createContext } from 'react';
import classes from './SegmentedControl.module.css';

export const SegmentedControlContext = createContext({ index: -1, onChange: () => null });

const SegmentedControl = ({
  block,
  disabled,
  size = 'md',
  as: Component = 'ul',
  children,
  selected = 0,
  onChange = () => null,
  ...props
}) => {

  let controlOptions = children;

  if (!(controlOptions instanceof Array)) {
    controlOptions = [controlOptions];
  }
  return (
    <>
      <Component className={classes.SegmentedControl} disabled={disabled} data-size={size} data-block={block} {...props}>
        {controlOptions.map((option, index) => (
          <SegmentedControlContext.Provider key={index} value={{ index, onChange, selected: index === selected }}>
            {option}
          </SegmentedControlContext.Provider>
        ))}
      </Component>
    </>
  )
}

export default SegmentedControl;
