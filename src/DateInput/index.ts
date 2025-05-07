import DateInputComponent from './DateInput';
import Calendar from '../Calendar';
import DateRangeInput from './DateRangeInput';

type DateInput = typeof DateInputComponent & {
  Range: typeof DateRangeInput;
  Calendar: typeof Calendar;
};

const DateInput = DateInputComponent as DateInput;
DateInput.Range = DateRangeInput;
DateInput.Calendar = Calendar;

export default DateInput;
export * as dateUtils from '../Calendar/utils';

export type { DateInputProps } from './DateInput';
export type { CalendarProps } from '../Calendar';
export type { DateRangeInputProps } from './DateRangeInput';