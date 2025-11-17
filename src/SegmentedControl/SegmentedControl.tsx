import React, { createContext, ReactNode, ComponentType } from 'react';
import classes from './SegmentedControl.module.css';

interface SegmentedControlContextType {
  index: number;
  onChange: (index: number) => void;
  selected: boolean;
}

export const SegmentedControlContext = createContext<SegmentedControlContextType>({ index: -1, onChange: () => null, selected: false });

interface SegmentedControlProps {
  block?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Add other sizes as needed
  as?: keyof React.JSX.IntrinsicElements | ComponentType<any>;
  children: ReactNode;
  selected?: number;
  onChange?: (index: number) => void;
  [key: string]: any; // Allow other props
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  block,
  disabled,
  size = 'md',
  as: Component = 'ul',
  children,
  selected = 0,
  onChange = () => null,
  ...props
}) => {

  let controlOptions = React.Children.toArray(children);

  return (
    <Component className={classes.SegmentedControl} data-disabled={disabled} data-size={size} data-block={block} {...props}>
      {controlOptions.map((option, index) => (
        <SegmentedControlContext.Provider key={index} value={{ index, onChange, selected: index === selected }}>
          {option}
        </SegmentedControlContext.Provider>
      ))}
    </Component>
  );
}

export default SegmentedControl;
export type { SegmentedControlProps, SegmentedControlContextType };