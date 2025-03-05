import ButtonComponent from './Button';
import ButtonGroup from './ButtonGroup';

type Button = typeof ButtonComponent & {
  Group: typeof ButtonGroup;
};

const Button = ButtonComponent as Button;
Button.Group = ButtonGroup;

export default Button;

export type { ButtonProps } from './Button';
export type { ButtonGroupProps } from './ButtonGroup';