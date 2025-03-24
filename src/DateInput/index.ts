import DateInputComponent from './DateInput';
import DateRangeInput from './DateRangeInput';
import TimeInput from './TimeInput';

type DateInput = typeof DateInputComponent & {
  Range: typeof DateRangeInput;
  Time: typeof TimeInput;
};

const DateInput = DateInputComponent as DateInput;
DateInput.Range = DateRangeInput;
DateInput.Time = TimeInput;

export default DateInput;

export type { DateInputProps } from './DateInput';
export type { DateRangeInputProps } from './DateRangeInput';
export type { TimeInputProps } from './TimeInput';