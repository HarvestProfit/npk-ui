import React, { useRef } from 'react';
import { today, isPartOfSelection, isSameDay } from './utils';

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
  const isSelectionStart = partOfSelected && state.range ? isSameDay(date, state.value.start) : false; // Only true if the date is the start of a range selection
  const isSelectionEnd = partOfSelected && state.range ? isSameDay(date, state.value.end) : false; // Only true if the date is the end of a range selection
  const dateIsSelected = state.range ? (isSelectionStart || isSelectionEnd) : partOfSelected; // The actual selected dates. Only true if it is the selected date or the selected start or end date.
  const isOutsideVisibleRange = date.getMonth() !== visibleDate.getMonth(); // True if the date is not within the visible month. We just set the opacity lower to show this.
  const isToday = isSameDay(date, today()); // True if the date is today. We can use this to highlight the current date.

  let dateState = '';
  if (dateIsSelected) dateState = 'selected';
  if (isDisabled) dateState = 'disabled';

  return (
    <td aria-selected={partOfSelected} role="gridcell" onMouseEnter={onMouseEnter}>
      <div
        ref={ref}
        hidden={isOutsideVisibleRange}
        data-state={dateState}
        data-selection-start={isSelectionStart}
        data-selection-end={isSelectionEnd}
        data-selection-in={partOfSelected}
        data-today={isToday ? 'true' : undefined}
        onClick={() => {
          if (isDisabled) return;
          const newValue = new Date(state.selectingValue || today());
          newValue.setDate(date.getDate());
          newValue.setMonth(date.getMonth());
          newValue.setFullYear(date.getFullYear());
          state.onChange(newValue);
        }}
      >
        {date.getDate()}
      </div>
    </td>
  );
};

export default Day;
