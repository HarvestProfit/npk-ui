import React from 'react';
import {useCalendar, useCalendarGrid, useCalendarCell, useLocale, useRangeCalendar} from 'react-aria';
import {useCalendarState, useRangeCalendarState} from 'react-stately';
import classes from './Calendar.module.css';
import { endOfMonth, getWeeksInMonth, GregorianCalendar, isSameDay, isSameMonth, now, startOfMonth, startOfYear, today } from '@internationalized/date';
import { BackwardIndicatorIcon, ForwardIndicatorIcon } from '@harvest-profit/npk/icons/regular';

// Reuse the Button from your component library. See below for details.
import Button from '../Button';

export function createCalendar(identifier) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

const CalendarCell = ({ state, startDate, date }) => {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    isUnavailable,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart =
    isSelected && highlightedRange ? isSameDay(date, highlightedRange.start) : false;
  const isSelectionEnd =
    isSelected && highlightedRange ? isSameDay(date, highlightedRange.end) : false;

  const dateIsSelected = highlightedRange ? (isSelectionStart || isSelectionEnd) : isSelected;

  const isOutsideVisibleRange = !isSameMonth(date, startDate);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        data-state={dateIsSelected ? 'selected' : isDisabled ? 'disabled' : isUnavailable ? 'unavailable' : ''}
        data-selection-start={isSelectionStart}
        data-selection-end={isSelectionEnd}
        data-selection-in={isSelected}
      >
        {formattedDate}
      </div>
    </td>
  );
}


const CalendarGrid = ({ state, monthOffset, ...props }) => {
  let { locale } = useLocale();

  let startDate = state.visibleRange.start;
  if (monthOffset) {
    startDate = startDate.add({ months: monthOffset });
  }

  const { gridProps, headerProps, weekDays } = useCalendarGrid({
    ...props,
    startDate,
    endDate: endOfMonth(startDate),
  }, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(
    startDate,
    locale,
    props.firstDayOfWeek
  );

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => <th key={index}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex, startDate).map((date, i) => (
              date
                ? (
                  <CalendarCell
                    key={i}
                    startDate={startDate}
                    state={state}
                    date={date}
                  />
                )
                : <td key={i} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const ariaPropsToButtonProps = (ariaProps) => {
  const { isDisabled, onFocusChange, ...rest } = ariaProps;

  return { 
    disabled: isDisabled,
    ...rest
  };
}

const Calendar = ({ presets, ...props}) => {
  const visibleMonths = props.visibleMonths || 1;
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    visibleDuration: { months: visibleMonths },
    createCalendar
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  const presetOnClick = (date) => {
    state.setFocusedDate(date);
    props.onChange(date)
  }

  const presetButtons = [];
  if (presets === true) {
    presetButtons.push({ label: 'Today', date: today() });
    presetButtons.push({ label: 'Yesterday', date: today().add({ days: -1 }) });
    presetButtons.push({ label: 'Next Month', date: startOfMonth(today().add({ months: 1 })) });
    presetButtons.push({ label: 'Last Month', date: startOfMonth(today().add({ months: -1 })) });
    presetButtons.push({ label: 'Next Year', date: startOfYear(today().add({ years: 1 })) });
    presetButtons.push({ label: 'Last Year', date: startOfYear(today().add({ years: -1 })) });
  } else if (Array.isArray(presets)) {
    presetButtons = presets
  }

  return (
    <div {...calendarProps} className={classes.Calendar}>
      <header>
        <h4 data-component="calendar-title">{title}</h4>
        <span data-component="calendar-backwards"><Button {...ariaPropsToButtonProps(prevButtonProps)} icon={BackwardIndicatorIcon} /></span>
        <span data-component="calendar-forwards"><Button {...ariaPropsToButtonProps(nextButtonProps)} icon={ForwardIndicatorIcon} /></span>
        {presetButtons.length > 0 && (
        <span data-component="calendar-actions">
          {presetButtons.map((preset) => (
            <Button key={preset.label} invisible={false} size="sm" onClick={() => presetOnClick(preset.date)}>{preset.label}</Button>
          ))}
        </span>
        )}
      </header>
      {visibleMonths > 1 ? (
        <span>
          {[...Array(visibleMonths)].map((_, i) => (
            <CalendarGrid key={i} state={state} firstDayOfWeek={props.firstDayOfWeek} monthOffset={i} />
          ))}
        </span>
      ) : 
        <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
      }
    </div>
  );
}

Calendar.Range = (props) => {
  const visibleMonths = props.visibleMonths || 2;
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    visibleDuration: { months: visibleMonths },
    createCalendar
  });

  const ref = React.useRef(null);
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref} className={classes.Calendar}>
      <header>
        <h4 data-component="calendar-title">{title}</h4>
        <span data-component="calendar-backwards"><Button {...ariaPropsToButtonProps(prevButtonProps)} icon={BackwardIndicatorIcon} /></span>
        <span data-component="calendar-forwards"><Button {...ariaPropsToButtonProps(nextButtonProps)} icon={ForwardIndicatorIcon} /></span>
      </header>
      {visibleMonths > 1 ? (
        <span>
          {[...Array(visibleMonths)].map((_, i) => (
            <CalendarGrid key={i} state={state} firstDayOfWeek={props.firstDayOfWeek} monthOffset={i} />
          ))}
        </span>
      ) : 
        <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
      }
    </div>
  );
}

export default Calendar;