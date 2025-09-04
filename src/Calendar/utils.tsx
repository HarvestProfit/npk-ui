export const today = () => new Date();
export const yesterday = () => new Date(new Date().setDate(today().getDate() - 1));
export const tomorrow = () => new Date(new Date().setDate(today().getDate() + 1));
export const nextMonth = () => new Date(new Date().setMonth(today().getMonth() + 1));
export const lastMonth = () => new Date(new Date().setMonth(today().getMonth() - 1));
export const nextYear = () => new Date(new Date().setFullYear(today().getFullYear() + 1));
export const lastYear = () => new Date(new Date().setFullYear(today().getFullYear() - 1));
export const startOfWeek = (date = today()) => new Date(new Date().setDate(date.getDate() - date.getDay()));
export const endOfWeek = (date = today()) => new Date(new Date().setDate(date.getDate() + (6 - date.getDay())));
export const startOfMonth = (date = today()) => new Date(new Date(date).setDate(1));
export const endOfMonth = (date = today()) => new Date(new Date(date).setMonth(date.getMonth() + 1, 0));
export const startOfYear = (date = today()) => new Date(new Date(date).setMonth(0, 1));
export const endOfYear = (date = today()) => new Date(new Date(date).setMonth(11, 31));
export const startOfDay = (date = today()) => new Date(new Date(date).setHours(0, 0, 0, 0));
export const endOfDay = (date = today()) => new Date(new Date(date).setHours(23, 59, 59, 999));
export const addDays = (date, days) => new Date(new Date(date).setDate(date.getDate() + days)); 
export const addMonths = (date, months) => new Date(new Date(date).setMonth(date.getMonth() + months));
export const addYears = (date, years) => new Date(new Date(date).setFullYear(date.getFullYear() + years));

export function dayIsInFrontForCurrentLocale() {
  return (new Date(2020, 11, 31).toLocaleDateString().indexOf('31') < 2);
}

export function fromISO(dateString) {
  if (!dateString) return null;
  if (dateString instanceof Date) return dateString;
  if (dateString.includes('T')) return new Date(dateString);
  const dateParts = dateString.split('-');
  return new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2]);
}

export function toISO(date) {
  if (!date) return null;
  return date.toISOString();
}

export function fromTimestamp(number) {
  if (!number) return null;
  return new Date(number);
}

export function toTimestamp(date) {
  if (!date) return null;
  return date.getTime();
}

export function monthIndexToHuman(monthIndex) {
  return isFinite(monthIndex) ? monthIndex + 1 : null;
}

export function monthHumanToIndex(monthNumber) {
  return (monthNumber || '').length > 0 ? (parseInt(monthNumber, 10) - 1) : null;
}

export const MONTH_ABBREVIATIONS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export function monthIndexToAbbrev(monthIndex) {
  return isFinite(monthIndex) ? MONTH_ABBREVIATIONS[monthIndex] : null;
}

export function monthAbbrevToIndex(monthAbbrev) {
  if (!monthAbbrev) return null;
  for (let i = 0; i < MONTH_ABBREVIATIONS.length; i++) {
    if (MONTH_ABBREVIATIONS[i].startsWith(monthAbbrev.toLowerCase())) return i; // Check if the next value starts with a valid month abbreviation
  }
  return null;
}

export function isSameDay(one, two) {
  if (!one || !two) return false;
  return one.getFullYear() === two.getFullYear() && one.getMonth() === two.getMonth() && one.getDate() === two.getDate();
}

export function isPartOfSelection(state, date) {
  if (state.range) {
    if (isSameDay(date, state.value.start) || isSameDay(date, state.value.end)) return true;
    if (state.value?.start && state.value?.end) {
      if (date >= state.value.start && date <= state.value.end) return true;
      return false;
    }
    return false;
  } else {
    return isSameDay(date, state.selectingValue);
  }
}

export function getDatesInWeek(weekIndex, visibleDate) {
  const firstDay = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1).getDay();
  const startOfWeek = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), weekIndex * 7 - firstDay + 1);
  return [...Array(7)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });
}

export function getWeeksInMonth(visibleDate) {
  const firstDay = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1).getDay();
  const totalDays = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 0).getDate();
  return Math.ceil((firstDay + totalDays) / 7);
}

export function nameForVisibleDates(visibleDate, visibleMonths = 1) {
  if (visibleMonths <= 1 || !isFinite(visibleMonths)) return visibleDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const startMonth = startOfMonth(visibleDate);
  const endMonth = startOfMonth(new Date(new Date(visibleDate).setMonth(visibleDate.getMonth() + visibleMonths)));
  const startMonthName = startMonth.toLocaleString('default', { month: 'long' });
  const endMonthName = endMonth.toLocaleString('default', { month: 'long' });

  if (startMonth.getFullYear() === endMonth.getFullYear()) {
    return `${startMonthName} – ${endMonthName} ${startMonth.getFullYear()}`;
  }

  return `${startMonthName} ${startMonth.getFullYear()} – ${endMonthName} ${endMonth.getFullYear()}`;
}