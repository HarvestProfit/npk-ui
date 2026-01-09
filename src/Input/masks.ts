import { MONTH_ABBREVIATIONS } from '../Calendar/utils';
import { rule, MaskType } from '../hooks/useMask';

interface NumericMaskProps {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  minValue?: number;
  maxValue?: number;
  separator?: string | false;
}

export const numericMask: MaskType = (props: NumericMaskProps = {}) => {
  const { maximumFractionDigits, minimumFractionDigits, minValue, maxValue, separator } = props;

  return {
    mask: [
      rule('-', ({ nextValue, cursorIndex, target }) => {
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
        if (previousValue[cursorIndex - 1] === (separator || ',')) return false;
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
      if (!value || value.length === 0) return value;
      const numberValue = parseFloat(value.replace(/,/g, ''));
      const numberString = isFinite(maximumFractionDigits) ? numberValue.toFixed(maximumFractionDigits) : numberValue.toString();
      const parts = numberString.split('.');
      if (separator !== false) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, (separator || ','));
      }

      if (isFinite(minimumFractionDigits)) {
        const decimalNumber = parseFloat(`0.${parts[1] || '0'}`);
        parts[1] = isNaN(decimalNumber) ? '0' : (`${decimalNumber}`.split('.')[1] || '0');
        parts[1] = parts[1].padEnd(minimumFractionDigits, '0')
      } else if (parseInt(parts[1]) === 0) {
        parts.pop();
      }

      return parts.join('.');
    }
  }
}

export const calendarDayMask: MaskType = ({ dateValue = new Date() } = {}) => {
  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for day

    const nextDateValue = new Date(dateValue.getFullYear(), dateValue.getMonth(), nextInputValue);
    if (dateValue.getMonth() !== nextDateValue.getMonth()) return false;
    if (dateValue.getFullYear() !== nextDateValue.getFullYear()) return false;
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
      rule(/^[0-9]$/, ({ nextValue }) => {
        return performRule(nextValue)
      }),
    ],
    formatter: (value) => {
      if (!value || value.length === 0) return value;
      if (value === '0') return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    },
    aria: {
      'aria-valuemin': 1,
      'aria-valuemax': 31
    }
  }
}

export const calendarMonthMask: MaskType = ({ dateValue = new Date() } = {}) => {

  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for month
    const monthNumber = parseInt(nextInputValue, 10) - 1; // Convert to zero-based month index
    const nextDateValue = new Date(dateValue.getFullYear(), monthNumber, dateValue.getDate());
    if (nextDateValue.getMonth() !== monthNumber) return false;
    if (dateValue.getFullYear() !== nextDateValue.getFullYear()) return false;
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
      if (!value || value.length === 0) return value;
      if (value === '0') return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    },
    aria: {
      'aria-valuemin': 1,
      'aria-valuemax': 12
    }
  }
}

export const calendarYearMask: MaskType = (props = {}) => {
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
    },
    aria: {
      'aria-valuemin': 1,
      'aria-valuemax': 9999
    }
  }
}

export const calendarHourMask: MaskType = ({ militaryTime = false } = {}) => {
  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for hour
    const numberValue = parseInt(nextInputValue, 10);
    if (militaryTime) {
      if (numberValue >= 0 && numberValue <= 23) return true; // 00-23 for military time
    } else {
      if (numberValue >= 1 && numberValue <= 12) return true; // 01-12 for standard time
    }

    return false;
  }
  return {
    shiftFocusIf: (nextValue, key) => {
      if (key == ':') return true;
      if (nextValue === '0') return false;
      return (performRule(nextValue) && !performRule(`${nextValue}0`))
    },
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value || value.length === 0) return value;
      if (value === '0' && !militaryTime) return '01'; // Special case for zero
      return `${value}`.padStart(2, '0');
    },
    aria: {
      'aria-valuemin': 1,
      'aria-valuemax': 23
    }
  }
}

export const calendarMinuteMask: MaskType = (props = {}) => {
  const performRule = (nextInputValue) => {
    if (nextInputValue === '0') return true;
    if (nextInputValue.length > 2) return false; // max of 2 digits for minute
    const numberValue = parseInt(nextInputValue, 10);
    if (numberValue >= 0 && numberValue <= 59) return true;
    return false;
  }
  return {
    shiftFocusIf: (nextValue, key) => {
      if (key == ':') return true;
      if (nextValue === '0') return false;
      return (performRule(nextValue) && !performRule(`${nextValue}0`))
    },
    mask: [
      rule(/^[0-9]$/, ({ nextValue }) => performRule(nextValue)),
    ],
    formatter: (value) => {
      if (!value || value.length === 0) return value;
      return `${value}`.padStart(2, '0');
    },
    aria: {
      'aria-valuemin': 0,
      'aria-valuemax': 59
    }
  }
}

export const calendarTimeOfDayMask: MaskType = (props = {}) => {
  return {
    shiftFocusIf: (_nextValue, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey == 'a' || lowerKey == 'p') return true;
      return false;
    },
    mask: [
      rule(/^[aApP]$/)
    ],
    autoComplete: (value, key) => {
      if (key.toLowerCase() === 'a') return 'AM';
      if (key.toLowerCase() === 'p') return 'PM';
      return value;
    },
    formatter: (value) => {
      if (!value || value.length === 0) return value;
      if (value.toLowerCase().startsWith('a')) return 'AM';
      if (value.toLowerCase().startsWith('p')) return 'PM';
      return value;
    },
    aria: {
      'aria-valuemin': 0,
      'aria-valuemax': 1
    }
  }
}

export const calendarMonthNameMask: MaskType = (props = {}) => {
  const autoComplete = (value, _key) => {
    if (value.startsWith('f')) return 'Feb';
    if (value.startsWith('n')) return 'Nov';
    if (value.startsWith('d')) return 'Dec';
    if (value.startsWith('s')) return 'Sep';
    if (value.startsWith('o')) return 'Oct';
    if (value.startsWith('ja')) return 'Jan';
    if (value.startsWith('au')) return 'Aug';
    if (value.startsWith('ap')) return 'Apr';
    return value;
  }
  return {
    shiftFocusIf: (nextValue, key) => {
      if (autoComplete(nextValue, key) !== nextValue) return true;
      if (nextValue.length >= 3) return true;
      return false;
    },
    mask: [
      rule(/^[a-zA-Z]$/, ({ nextValue }) => {
        if (nextValue.length > 3) return false; // max of 3 letters for month name
        for (let i = 0; i < MONTH_ABBREVIATIONS.length; i++) {
          if (MONTH_ABBREVIATIONS[i].startsWith(nextValue.toLowerCase())) return true; // Check if the next value starts with a valid month abbreviation
        }
        return false; // If it doesn't match any month abbreviation, return false
      })
    ],
    autoComplete,
    formatter: (value) => {
      if (!value || value.length === 0) return value;
      for (let i = 0; i < MONTH_ABBREVIATIONS.length; i++) {
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        if (MONTH_ABBREVIATIONS[i].startsWith(value.toLowerCase())) return capitalize(MONTH_ABBREVIATIONS[i]); // Check if the next value starts with a valid month abbreviation
      }
      return value;
    },
    aria: {
      'aria-valuemin': 1,
      'aria-valuemax': 12
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
