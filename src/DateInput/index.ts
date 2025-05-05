import { CalendarDate, DateValue, fromDate, today, ZonedDateTime } from '@internationalized/date';
import DateInputComponent from './DateInput';
import DateRangeInput from './DateRangeInput';
import TimeInput from './TimeInput';
import NewDateInput from './NewDateInput';

type DateInput = typeof DateInputComponent & {
  Range: typeof DateRangeInput;
  Time: typeof TimeInput;
  today: (timeZone: string) => CalendarDate; // Add a method to get today's date
  fromDate: (date: Date, timeZone: string) => ZonedDateTime; // Add a method to convert DateValue to CalendarDate
  New: typeof NewDateInput; // Add a new date input component
};

const DateInput = DateInputComponent as DateInput;
DateInput.Range = DateRangeInput;
DateInput.Time = TimeInput;
DateInput.today = today;
DateInput.fromDate = fromDate;
DateInput.New = NewDateInput;

export default DateInput;

export type { DateInputProps } from './DateInput';
export type { DateRangeInputProps } from './DateRangeInput';
export type { TimeInputProps } from './TimeInput';