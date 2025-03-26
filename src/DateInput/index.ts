import { CalendarDate, DateValue, fromDate, today, ZonedDateTime } from '@internationalized/date';
import DateInputComponent from './DateInput';
import DateRangeInput from './DateRangeInput';
import TimeInput from './TimeInput';

type DateInput = typeof DateInputComponent & {
  Range: typeof DateRangeInput;
  Time: typeof TimeInput;
  today: (timeZone: string) => CalendarDate; // Add a method to get today's date
  fromDate: (date: Date, timeZone: string) => ZonedDateTime; // Add a method to convert DateValue to CalendarDate
};

const DateInput = DateInputComponent as DateInput;
DateInput.Range = DateRangeInput;
DateInput.Time = TimeInput;
DateInput.today = today;
DateInput.fromDate = fromDate;

export default DateInput;

export type { DateInputProps } from './DateInput';
export type { DateRangeInputProps } from './DateRangeInput';
export type { TimeInputProps } from './TimeInput';