import InputComponent from './Input';
import NumberInput from './NumberInput';
import Group from './Group';
import Control from './Control';
import { BaseInputContext } from '../BaseInput/BaseInput';

type Input = typeof InputComponent & {
  Group: typeof Group;
  Control: typeof Control;
  Number: typeof NumberInput;
  Reset: React.FC<{ children: React.ReactNode }>;
};

const Input = InputComponent as Input;
Input.Group = Group;
Input.Control = Control;
Input.Number = NumberInput;
Input.Reset = ({ children }) => {
  return (
    <BaseInputContext.Provider value={{}}>
      {children}
    </BaseInputContext.Provider>
  )
}

export default Input;

export type { InputProps } from './Input';
export type { GroupProps } from './Group';
export type { ControlProps } from './Control';
export type { NumberInputProps } from './NumberInput';