import React, { useContext, useState } from 'react';
import classes from './Calendar.module.css';
import { BackwardIndicatorIcon, ForwardIndicatorIcon } from '@harvest-profit/npk/icons/regular';
import Button from '../Button';
import Month from './Month';
import { fromISO, fromTimestamp, lastMonth, lastYear, nameForVisibleDates, nextMonth, nextYear, today, toISO, toTimestamp, yesterday } from './utils';
import { MenuContext } from '../Menu';

interface CalendarProps {
  presets?: boolean | Array<{ label: string; date: Date }>;
  value?: Date | { start: Date; end: Date };
  autoDismiss?: boolean;
  output?: 'ISO' | 'timestamp' | 'Date';
  onChange?: (date: Date | { start: Date; end: Date }) => void;
  range?: boolean;
  visibleMonths?: number;
}

const defaultPresets = [
  { label: 'Today', date: today() },
  { label: 'Yesterday', date: yesterday() },
  { label: 'Next Month', date: nextMonth() },
  { label: 'Last Month', date: lastMonth() },
  { label: 'Last Year', date: lastYear() },
  { label: 'Next Year', date: nextYear() },
]

const Calendar = ({
  presets = true,
  value: externalValue,
  output = 'ISO',
  autoDismiss = true,
  onChange: onExternalChange,
  range = false,
  visibleMonths = 1
}) => {
  let fromFormat = v => v;
  let toFormat = v => v;
  switch (output) {
    case 'ISO':
      fromFormat = fromISO;
      toFormat = toISO;
      break;
    case 'timestamp':
      fromFormat = fromTimestamp;
      toFormat = toTimestamp;
      break;
    default:
      break;
  }

  let value = externalValue;
  if (range) {
    value = { start: fromFormat(value?.start), end: fromFormat(value?.end) };
  } else {
    value = fromFormat(value);
  }

  const [selectingStart, setSelectingStart] = useState(true); // For range selection, true if we are selecting the start date
  const [hoveredDate, setHoveredDate] = useState(); // For range selection, the date that is currently hovered to show the potential range the user is selecting when setting the end date.

  const menuContext = useContext(MenuContext);

  const onChange = (newValue) => {
    if (!range) {
      onExternalChange(toFormat(newValue));
      if (autoDismiss && menuContext) menuContext.setOpen(false);
      return;
    }

    setHoveredDate(null); // We are no longer hovering if we've made a selection
    if (selectingStart) {
      setSelectingStart(false); // We are now selecting the end date
      onExternalChange({ start: toFormat(newValue), end: null });
    } else {
      setSelectingStart(true); // The next click will select the start date
      if (newValue < value?.start) { // Swap the start and end dates if the new value is before the start date
        onExternalChange({ start: toFormat(newValue), end: toFormat(value?.start) });
      } else {
        onExternalChange({ start: toFormat(value?.start), end: toFormat(newValue) });
      }

      if (autoDismiss && menuContext) menuContext.setOpen(false);
    }
  }

  const state = {
    onChange,
    range,
    selectingStart,
    hoveredDate,
    setHoveredDate,
    value: range ? { start: value?.start, end: value?.end } : value,
    selectingValue: range ? (selectingStart ? value?.start : value?.end) : value,
  }

  const initialVisibleDate = range ? (value.start || value.end) : value;
  const [visibleDate, setVisibleDate] = useState(initialVisibleDate || new Date());
  
  let presetButtons: Array<{ label: string; date: Date }> = [];
  if (presets === true) {
    presetButtons = defaultPresets;
  } else if (Array.isArray(presets)) {
    presetButtons.push(...presets);
  }

  return (
    <div className={classes.Calendar}>
      <header>
        <h4 data-component="calendar-title">{nameForVisibleDates(visibleDate, visibleMonths)}</h4>
        <span data-component="calendar-backwards">
          <Button onClick={() => setVisibleDate(new Date(new Date(visibleDate).setMonth(visibleDate.getMonth() - 1)))} icon={BackwardIndicatorIcon} aria-label="Previous month" />
        </span>
        <span data-component="calendar-forwards">
          <Button onClick={() => setVisibleDate(new Date(new Date(visibleDate).setMonth(visibleDate.getMonth() + 1)))} icon={ForwardIndicatorIcon} aria-label="Next month"/>
        </span>
        {presetButtons.length > 0 && (
          <span data-component="calendar-actions">
            <span>
              {presetButtons.map((preset) => (
                <Button
                  key={preset.label}
                  invisible
                  variant="primary"
                  size="sm"
                  onClick={() => setVisibleDate(preset.date)}
                >
                  {preset.label}
                </Button>
              ))}
            </span>
          </span>
        )}
      </header>
      {visibleMonths > 1 ? (
        <span>
          {[...Array(visibleMonths)].map((_, i) => (
            <Month
              key={i}
              visibleDate={visibleDate}
              monthOffset={i}
              state={state}
            />
          ))}
        </span>
      ) : (
        <Month visibleDate={visibleDate} state={state} />
      )}
    </div>
  );
};

export default Calendar;
export type { CalendarProps };
