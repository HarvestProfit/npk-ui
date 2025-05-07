import React from 'react';
import { getDatesInWeek, getWeeksInMonth } from './utils';
import Day from './Day';

const Month = ({ visibleDate: initialVisibleDate, monthOffset = null, state }) => {
  // Adjust the visible date based on the month offset
  // Allows for showing multiple months in the calendar.
  let visibleDate = initialVisibleDate;
  if (monthOffset) {
    visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + monthOffset, 1);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
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
