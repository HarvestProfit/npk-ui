import React, { useRef } from 'react';
import { today, isEqual } from './utils';

function isPartOfSelection(state, date) {
  if (state.range) {
    if (isEqual(date, state.value.start, 'day') || isEqual(date, state.value.end, 'day')) return true;
    if (state.value?.start && state.value?.end) {
      if (date >= state.value.start && date <= state.value.end) return true;
      return false;
    }
    return false;
  } else {
    return isEqual(date, state.selectingValue, 'day');
  }
}

// Represents a single day in the calendar
// It can be in a selected, hovered, and disabled state
const Day = ({ visibleDate, date, state }) => {
  const ref = useRef<HTMLDivElement>(null);

  // With range selection, when selecting the end range we show a hovered selection of all dates between the start and the currently hovered date.
  let isHoveredRangeSelected = false;
  if (state.range && state.hoveredDate && date <= state.hoveredDate && date > state.value.start) isHoveredRangeSelected = true;
  const onMouseEnter = () => { if (state.range && !state.selectingStart) state.setHoveredDate(date); }

  const isDisabled = false; // Placeholder for disabled state. We can add logic to disable selecting certain dates in the future if the use case arises
  const partOfSelected = isPartOfSelection(state, date) || isHoveredRangeSelected; // If the date is selected or between the start and end date of a range selection
  const isSelectionStart = partOfSelected && state.range ? isEqual(date, state.value.start, 'day') : false; // Only true if the date is the start of a range selection
  const isSelectionEnd = partOfSelected && state.range ? isEqual(date, state.value.end, 'day') : false; // Only true if the date is the end of a range selection
  const dateIsSelected = state.range ? (isSelectionStart || isSelectionEnd) : partOfSelected; // The actual selected dates. Only true if it is the selected date or the selected start or end date.
  const isOutsideVisibleRange = date.getMonth() !== visibleDate.getMonth(); // True if the date is not within the visible month. We just set the opacity lower to show this.
  const isToday = isEqual(date, today(), 'day'); // True if the date is today. We can use this to highlight the current date.

  let dateState = '';
  if (dateIsSelected) dateState = 'selected';
  if (isDisabled) dateState = 'disabled';

  const onClickChange = () => {
    if (isDisabled) return;
    const newValue = new Date(state.selectingValue || today());
    newValue.setDate(date.getDate());
    newValue.setMonth(date.getMonth());
    newValue.setFullYear(date.getFullYear());

    console.log('clicked!', date, newValue);
    state.onChange(newValue);
  }

  return (
    <td
      onClick={onClickChange}
      onKeyDown={(event) => {
          if (event.key === ' ' || event.key === 'Enter') {
            // Don't scroll the page if space is pressed
            event.preventDefault();
            onClickChange();
          }
      }}
      tabIndex={0}
      aria-selected={partOfSelected}
      role="gridcell"
      onMouseEnter={onMouseEnter}
      aria-label={date.toLocaleDateString('default', { month: 'long', year: 'numeric', day: 'numeric' })}
    >
      <div
        ref={ref}
        hidden={isOutsideVisibleRange}
        data-state={dateState}
        data-selection-start={isSelectionStart}
        data-selection-end={isSelectionEnd}
        data-selection-in={partOfSelected}
        data-today={isToday ? 'true' : undefined}
      >
        {date.getDate()}
      </div>
    </td>
  );
};

export default Day;
