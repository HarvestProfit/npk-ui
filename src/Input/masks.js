import { rule } from '../hooks/useMask';

export const numericMask = (props = {}) => {
  const { maximumFractionDigits, minValue, maxValue } = props;

  return {
    mask: [
      rule('-', ({ nextValue, cursorIndex }) => {
        if (Number.isFinite(minValue) && minValue >= 0) return false;
        if (nextValue.match(/-/g).length > 1 || cursorIndex !== 0) return false;
        return true;
      }),
      rule('.', ({ nextValue, cursorIndex }) => {
        if (nextValue[cursorIndex] === '-') return false;
        if (Number.isInteger(maximumFractionDigits) && maximumFractionDigits <= 0) return false;
        return nextValue.match(/\./g).length <= 1;
      }),
      rule(',', ({ nextValue, previousValue, cursorIndex }) => {
        if (nextValue[cursorIndex] === '-') return false;
        if (previousValue[cursorIndex - 1] === ',') return false;
        if (previousValue.slice(0, cursorIndex).split('.')[1]) return false;
        return true;
      }),
      rule(/^[0-9]$/, ({ cursorIndex, nextValue }) => {
        if (nextValue[cursorIndex] === '-') return false;
        const numberValue = parseFloat(nextValue.replace(/,/g, ''));
        if (Number.isFinite(maxValue) && numberValue > maxValue) return false;
        if (Number.isFinite(minValue) && numberValue < minValue) return false;
        if (Number.isInteger(maximumFractionDigits) && (nextValue.split('.')[1]?.length || 0) > maximumFractionDigits) return false;
        return true;
      }),
    ],
    formatter: (value) => {
      if (!value) return value;
      const numberValue = parseFloat(value.replace(/,/g, ''));
      const parts = numberValue.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
  }
}

export const calendarDayMask = (props = {}) => {
  const dateValue = props.dateValue || new Date();

  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for day

    const nextDateValue = new Date(dateValue.getFullYear(), dateValue.getMonth(), nextInputValue);
    if (dateValue.getMonth() !== nextDateValue.getMonth()) return false;
    if (dateValue.getYear() !== nextDateValue.getYear()) return false;
    if (nextDateValue.getDate() !== parseInt(nextInputValue, 10)) return false;
    return true;
  }

  return {
    shiftFocusIf: (nextValue, key) => {
      if (key == '/') return true;
      if (nextValue === '0') return false;
      return performRule(nextValue) && !performRule(`${nextValue}0`);
    },
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value) return value;
      if (value === '0') return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    }
  }
}

export const calendarMonthMask = (props = {}) => {
  const dateValue = props.dateValue || new Date();

  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for month
    const monthNumber = parseInt(nextInputValue, 10) - 1; // Convert to zero-based month index
    const nextDateValue = new Date(dateValue.getFullYear(), monthNumber, dateValue.getDate());
    if (nextDateValue.getMonth() !== monthNumber) return false;
    if (dateValue.getYear() !== nextDateValue.getYear()) return false;
    if (dateValue.getDate() !== nextDateValue.getDate()) return false;
    return true;
  }

  return {
    shiftFocusIf: (nextValue, key) => {
      if (key == '/') return true;
      if (nextValue === '0') return false;
      return performRule(nextValue) && !performRule(`${nextValue}0`);
    },
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value) return value;
      if (value === '0') return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    }
  }
}

export const calendarYearMask = (props = {}) => {
  const performRule = (nextInputValue) => {
    if (nextInputValue.length <= 4) return true; // needs at least 4 digits for year

    return false;
  }
  return {
    shiftFocusIf: (nextValue, key) => key == '/' || (performRule(nextValue) && !performRule(`${nextValue}0`)),
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value) return value;
      return `${value}`.padStart(3, '0').padStart(4, '2');;
    }
  }
}

export const calendarHourMask = (props = {}) => {
  const militaryTime = props.militaryTime || false;
  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    const numberValue = parseInt(nextInputValue, 10);
    if (militaryTime) {
      if (numberValue >= 0 && numberValue <= 23) return true; // 00-23 for military time
    } else {
      if (numberValue >= 1 && numberValue <= 12) return true; // 01-12 for standard time
    }

    return false;
  }
  return {
    shiftFocusIf: (nextValue, key) => key == ':' || (performRule(nextValue) && !performRule(`${nextValue}0`)),
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value) return value;
      if (value === '0' && !militaryTime) return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    }
  }
}

export const calendarMinuteMask = (props = {}) => {
  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    const numberValue = parseInt(nextInputValue, 10);
    if (numberValue >= 0 && numberValue <= 59) return true;
    return false;
  }
  return {
    shiftFocusIf: (nextValue, key) => key == ':' || (performRule(nextValue) && !performRule(`${nextValue}0`)),
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value) return value;
      return `${value}`.padStart(2, '0');
    }
  }
}

export const calendarTimeOfDayMask = (props = {}) => {
  return {
    shiftFocusIf: (_nextValue, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey == 'a' || lowerKey == 'p') return true;
      return false;
    },
    mask: [
      rule(/^[apAPmM]$/)
    ],
    formatter: (value) => {
      if (!value) return value;
      if (value.toLowerCase().startsWith('a')) return 'AM';
      if (value.toLowerCase().startsWith('p')) return 'PM';
      return value;
    }
  }
}

export default {
  'number': numericMask,
  'calendar-day': calendarDayMask,
  'calendar-month': calendarMonthMask,
  'calendar-year': calendarYearMask,
  'time-hour': calendarHourMask,
  'time-minute': calendarMinuteMask,
  'time-tod': calendarTimeOfDayMask
}