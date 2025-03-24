import InputComponent from './Input';
import NumberInput from './NumberInput';
import Group from './Group';

type Input = typeof InputComponent & {
  Group: typeof Group;
  Number: typeof NumberInput;
};

const Input = InputComponent as Input;
Input.Group = Group;
Input.Number = NumberInput;

export default Input;

export type { InputProps } from './Input';
export type { GroupProps } from './Group';
export type { NumberInputProps } from './NumberInput';