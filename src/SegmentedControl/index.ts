import SegmentedControlComponent from './SegmentedControl';
import Button from './Button/Button';
import IconButton from './IconButton/IconButton';

type SegmentedControl = typeof SegmentedControlComponent & {
  Button: typeof Button;
  IconButton: typeof IconButton;
};

const SegmentedControl = SegmentedControlComponent as SegmentedControl;
SegmentedControl.Button = Button;
SegmentedControl.IconButton = IconButton;

export default SegmentedControl;
export type { ButtonProps } from './Button/Button';
export type { IconButtonProps } from './IconButton/IconButton';
export type { SegmentedControlProps } from './SegmentedControl';