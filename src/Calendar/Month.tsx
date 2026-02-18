import React from 'react';
import { getDatesInWeek, getWeeksInMonth, nameForVisibleDates } from './utils';
import Day from './Day';

const Month = ({ visibleDate: initialVisibleDate, monthOffset = null, state }) => {
  // Adjust the visible date based on the month offset
  // Allows for showing multiple months in the calendar.
  let visibleDate = initialVisibleDate;
  if (monthOffset) {
    visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + monthOffset, 1);
  }

  return (
    <table aria-label={`${visibleDate.toLocaleString('default', { month: 'long', year: 'numeric' })} calendar`} role="grid" aria-multiselectable={state.range}>
      <thead aria-hidden>
        <tr>
          <th aria-label="Sunday">S</th>
          <th aria-label="Monday">M</th>
          <th aria-label="Tuesday">T</th>
          <th aria-label="Wednesday">W</th>
          <th aria-label="Thursday">T</th>
          <th aria-label="Friday">F</th>
          <th aria-label="Saturday">S</th>
        </tr>
      </thead>
      <tbody>
        {[...new Array(getWeeksInMonth(visibleDate)).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {getDatesInWeek(weekIndex, visibleDate).map((date, i) =>
              date ? (
                <Day key={i} visibleDate={visibleDate} date={date} state={state} />
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

export default Month;
