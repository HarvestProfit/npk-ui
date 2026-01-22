import React, { useContext, useState } from 'react';
import classes from './Calendar.module.css';
import { BackwardIndicatorIcon, ForwardIndicatorIcon } from '@harvest-profit/npk/icons/regular';
import Button from '../Button';
import Month from './Month';
import {
  lastMonth,
  lastYear,
  nameForVisibleDates,
  nextMonth,
  nextYear,
  today,
  toISO,
  toTimestamp,
  add,
  subtract
} from './utils';
import { MenuContext } from '../Menu';
import { isoDateIncludesTime, onChangeType, outputFormatType, useValueFormatter, valueType } from '../DateInput/helpers';

type rangeValueType = { start: valueType; end: valueType };

interface CalendarProps {
  presets?: boolean | Array<{ label: string; date: Date }>;
  value?: valueType | rangeValueType;
  autoDismiss?: boolean;
  output?: outputFormatType;
  onChange?: onChangeType;
  range?: boolean;
  visibleMonths?: number;
}

const defaultPresets = [
  { label: 'Today', date: today() },
  { label: 'Last Month', date: lastMonth() },
  { label: 'Next Month', date: nextMonth() },
  { label: 'Last Year', date: lastYear() },
  { label: 'Next Year', date: nextYear() },
]

const Calendar: React.FC<CalendarProps> = ({
  presets = true,
  value: externalValue,
  output = 'ISO',
  autoDismiss = true,
  onChange: onExternalChange,
  range = false,
  visibleMonths = 1
}) => {
  let includeTime = true;

  if (range) {
    const externalRangeValue = externalValue as rangeValueType;
    includeTime = isoDateIncludesTime(externalRangeValue.start) || isoDateIncludesTime(externalRangeValue.start);
  } else {
    includeTime = isoDateIncludesTime(externalValue)
  }

  const formatter = useValueFormatter(output, includeTime);

  let value: Date | { start?: Date, end?: Date };

  if (range) {
    const externalRangeValue = externalValue as rangeValueType;
    value = { start: formatter.from(externalRangeValue?.start), end: formatter.from(externalRangeValue?.end) };
  } else {
    value = formatter.from(externalValue as valueType);
  }

  const rangeValue = value as { start?: Date, end?: Date };

  const [selectingStart, setSelectingStart] = useState(true); // For range selection, true if we are selecting the start date
  const [hoveredDate, setHoveredDate] = useState(); // For range selection, the date that is currently hovered to show the potential range the user is selecting when setting the end date.

  const menuContext = useContext(MenuContext);

  const onChange = (newValue: Date) => {
    if (!range) {
      onExternalChange(formatter.to(newValue));
      if (autoDismiss && menuContext) menuContext.setOpen(false);
      return;
    }

    setHoveredDate(null); // We are no longer hovering if we've made a selection
    if (selectingStart) {
      setSelectingStart(false); // We are now selecting the end date
      onExternalChange({ start: formatter.to(newValue), end: null });
    } else {
      setSelectingStart(true); // The next click will select the start date
      if (newValue < rangeValue?.start) { // Swap the start and end dates if the new value is before the start date
        onExternalChange({ start: formatter.to(newValue), end: formatter.to(rangeValue?.start) });
      } else {
        onExternalChange({ start: formatter.to(rangeValue?.start), end: formatter.to(newValue) });
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
    value: range ? { start: rangeValue?.start, end: rangeValue?.end } : value,
    selectingValue: range ? (selectingStart ? rangeValue?.start : rangeValue?.end) : value,
  }

  const initialVisibleDate = range ? (rangeValue.start || rangeValue.end) : value as Date;
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
          <Button autoDismiss={false} onClick={() => setVisibleDate(subtract(visibleDate, 1, 'month'))} icon={BackwardIndicatorIcon} aria-label="Previous month" />
        </span>
        <span data-component="calendar-forwards">
          <Button autoDismiss={false} onClick={() => setVisibleDate(add(visibleDate, 1, 'month'))} icon={ForwardIndicatorIcon} aria-label="Next month"/>
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
                  autoDismiss={false}
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
