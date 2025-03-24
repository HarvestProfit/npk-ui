import React, { ReactNode, useRef } from 'react';
import {
  useCalendar,
  useCalendarGrid,
  useCalendarCell,
  useLocale,
  useRangeCalendar,
  AriaCalendarProps,
  AriaRangeCalendarProps,
} from 'react-aria';
import {
  useCalendarState,
  useRangeCalendarState,
  CalendarState,
  RangeCalendarState,
} from 'react-stately';
import classes from './Calendar.module.css';
import {
  endOfMonth,
  getWeeksInMonth,
  GregorianCalendar,
  isSameDay,
  isSameMonth,
  now,
  startOfMonth,
  startOfYear,
  today,
  DateValue,
  CalendarDate,
  DayOfWeek,
  getLocalTimeZone,
} from '@internationalized/date';
import { BackwardIndicatorIcon, ForwardIndicatorIcon } from '@harvest-profit/npk/icons/regular';
import Button from '../Button';

export function createCalendar(identifier: string) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  startDate: DateValue;
  date: DateValue;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ state, startDate, date }) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date: date as CalendarDate }, state, ref);

  const highlightedRange = 'highlightedRange' in state && state.highlightedRange;
  const isSelectionStart =
    isSelected && highlightedRange ? isSameDay(date, highlightedRange.start) : false;
  const isSelectionEnd =
    isSelected && highlightedRange ? isSameDay(date, highlightedRange.end) : false;

  const dateIsSelected = highlightedRange ? isSelectionStart || isSelectionEnd : isSelected;

  const isOutsideVisibleRange = !isSameMonth(date, startDate);

  const isToday = isSameDay(date, now(getLocalTimeZone()));

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        data-state={
          dateIsSelected
            ? 'selected'
            : isDisabled
            ? 'disabled'
            : isUnavailable
            ? 'unavailable'
            : ''
        }
        data-selection-start={isSelectionStart}
        data-selection-end={isSelectionEnd}
        data-selection-in={isSelected}
        data-today={isToday ? 'true' : undefined}
      >
        {formattedDate}
      </div>
    </td>
  );
};

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
  monthOffset?: number;
  firstDayOfWeek?: DayOfWeek;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ state, monthOffset, ...props }) => {
  const { locale } = useLocale();

  let startDate = state.visibleRange.start;
  if (monthOffset) {
    startDate = startDate.add({ months: monthOffset });
  }

  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      ...props as unknown as AriaCalendarProps<DateValue>,
      startDate,
      endDate: endOfMonth(startDate),
    },
    state
  );

  const weeksInMonth = getWeeksInMonth(startDate, locale, props.firstDayOfWeek);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex, startDate).map((date, i) =>
              date ? (
                <CalendarCell key={i} startDate={startDate} state={state} date={date} />
              ) : (
                <td key={i} />
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ariaPropsToButtonProps = (ariaProps: any) => {
  const { isDisabled, onFocusChange, ...rest } = ariaProps;

  return {
    disabled: isDisabled,
    ...rest,
  };
};

interface CalendarProps extends AriaCalendarProps<DateValue> {
  presets?: boolean | Array<{ label: string; date: DateValue }>;
  visibleMonths?: number;
}

interface CalendarRangeProps extends AriaRangeCalendarProps<DateValue> {
  visibleMonths?: number;
}

const Calendar: React.FC<CalendarProps> & { 
  Range: React.FC<CalendarRangeProps> 
} = ({
  presets,
  ...props
}) => {
  const visibleMonths = props.visibleMonths || 1;
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    visibleDuration: { months: visibleMonths },
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

  const presetOnClick = (date: DateValue) => {
    state.setFocusedDate(date as CalendarDate);
    props.onChange?.(date);
  };

  const presetButtons: Array<{ label: string; date: DateValue }> = [];
  if (presets === true) {
    const dateToday = today(getLocalTimeZone());
    presetButtons.push({ label: 'Today', date: dateToday });
    presetButtons.push({ label: 'Yesterday', date: dateToday.add({ days: -1 }) });
    presetButtons.push({ label: 'Next Month', date: startOfMonth(dateToday.add({ months: 1 })) });
    presetButtons.push({ label: 'Last Month', date: startOfMonth(dateToday.add({ months: -1 })) });
    presetButtons.push({ label: 'Next Year', date: startOfYear(dateToday.add({ years: 1 })) });
    presetButtons.push({ label: 'Last Year', date: startOfYear(dateToday.add({ years: -1 })) });
  } else if (Array.isArray(presets)) {
    presetButtons.push(...presets);
  }

  return (
    <div {...calendarProps} className={classes.Calendar}>
      <header>
        <h4 data-component="calendar-title">{title}</h4>
        <span data-component="calendar-backwards">
          <Button {...ariaPropsToButtonProps(prevButtonProps)} icon={BackwardIndicatorIcon} />
        </span>
        <span data-component="calendar-forwards">
          <Button {...ariaPropsToButtonProps(nextButtonProps)} icon={ForwardIndicatorIcon} />
        </span>
        {presetButtons.length > 0 && (
          <span data-component="calendar-actions">
            {presetButtons.map((preset) => (
              <Button
                key={preset.label}
                invisible
                variant="primary"
                size="sm"
                onClick={() => presetOnClick(preset.date)}
              >
                {preset.label}
              </Button>
            ))}
          </span>
        )}
      </header>
      {visibleMonths > 1 ? (
        <span>
          {[...Array(visibleMonths)].map((_, i) => (
            <CalendarGrid
              key={i}
              state={state}
              firstDayOfWeek={props.firstDayOfWeek}
              monthOffset={i}
            />
          ))}
        </span>
      ) : (
        <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
      )}
    </div>
  );
};

Calendar.Range = (props) => {
  const visibleMonths = props.visibleMonths || 2;
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props as unknown as AriaRangeCalendarProps<DateValue>,
    locale,
    visibleDuration: { months: visibleMonths },
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props as unknown as AriaRangeCalendarProps<DateValue>, state, ref);

  return (
    <div {...calendarProps} ref={ref} className={classes.Calendar}>
      <header>
        <h4 data-component="calendar-title">{title}</h4>
        <span data-component="calendar-backwards">
          <Button {...ariaPropsToButtonProps(prevButtonProps)} icon={BackwardIndicatorIcon} />
        </span>
        <span data-component="calendar-forwards">
          <Button {...ariaPropsToButtonProps(nextButtonProps)} icon={ForwardIndicatorIcon} />
        </span>
      </header>
      {visibleMonths > 1 ? (
        <span>
          {[...Array(visibleMonths)].map((_, i) => (
            <CalendarGrid
              key={i}
              state={state}
              firstDayOfWeek={props.firstDayOfWeek}
              monthOffset={i}
            />
          ))}
        </span>
      ) : (
        <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
      )}
    </div>
  );
};

export default Calendar;
export type { CalendarProps };