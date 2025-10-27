import InputComponent from './Input';
import NumberInput from './NumberInput';
import Group from './Group';
import Control from './Control';

type Input = typeof InputComponent & {
  Group: typeof Group;
  Control: typeof Control;
  Number: typeof NumberInput;
};

const Input = InputComponent as Input;
Input.Group = Group;
Input.Control = Control;
Input.Number = NumberInput;

export default Input;

export type { InputProps } from './Input';
export type { GroupProps } from './Group';
export type { ControlProps } from './Control';
export type { NumberInputProps } from './NumberInput';