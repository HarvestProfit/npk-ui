export const timeZones = () => Intl.supportedValuesOf('timeZone');
export const today = () => new Date();
// Shortcuts Relative
export const yesterday = () => subtract(today(), 1, 'day');
export const tomorrow = () => add(today(), 1, 'day');
export const nextMonth = () => add(today(), 1, 'month');
export const lastMonth = () => subtract(today(), 1, 'month');
export const nextYear = () => add(today(), 1, 'year');
export const lastYear = () => subtract(today(), 1, 'year');
// Shortcuts Start/End
export const startOfWeek = (date = today()) => change(date, date.getDate() - date.getDay(), 'day');
export const endOfWeek = (date = today()) => change(date, date.getDate() + (6 - date.getDay()), 'day');
export const startOfMonth = (date = today()) => change(date, 1, 'day');
export const endOfMonth = (date = today()) => subtract(add(startOfMonth(date), 1, 'month'), 1, 'day');
export const startOfYear = (date = today()) => change(change(date, 1, 'day'), 1, 'month');
export const endOfYear = (date = today()) => subtract(add(startOfYear(date), 1, 'year'), 1, 'day');
export const startOfDay = (date = today()) => {
  const newValue = new Date(date);
  newValue.setHours(0, 0, 0, 0);
  return newValue;
}
export const endOfDay = (date = today()) => {
  const newValue = new Date(date);
  newValue.setHours(23, 59, 59, 999);
  return newValue;
}

export function change(date: Date, value: number | string, granularity: 'minute' | 'hour' | 'day' | 'month' | 'monthIndex' | 'year'): Date {
  const newValue = new Date(date);
  const numberValue = (Number.isFinite(value)) ? value as number : parseInt(value as string)

  switch (granularity) {
    case "minute":
      newValue.setMinutes(numberValue);
      break;
    case "hour":
      newValue.setHours(numberValue);
      break;
    case "day":
      newValue.setDate(numberValue);
      break;
    case "month":
      newValue.setMonth(numberValue - 1);
      break;
    case "monthIndex":
      newValue.setMonth(numberValue);
      break;
    case "year":
      newValue.setFullYear(numberValue);
      break;
  }

  return newValue;
}

export function add(date: Date, amount: number, granularity: 'minute' | 'hour' | 'day' | 'month' | 'year'): Date {
  switch (granularity) {
    case "minute":
      return change(date, date.getMinutes() + amount, 'minute');
    case "hour":
      return change(date, date.getHours() + amount, 'hour');
    case "day":
      return change(date, date.getDate() + amount, 'day');
    case "month":
      return change(date, date.getMonth() + amount, 'monthIndex');
    case "year":
      return change(date, date.getFullYear() + amount, 'year');
    default:
      return date;
  }
}

export function subtract(date: Date, amount: number, granularity: 'minute' | 'hour' | 'day' | 'month' | 'year'): Date {
  return add(date, amount * -1, granularity);
}

export function dayIsInFrontForCurrentLocale() {
  return (new Date(2020, 11, 31).toLocaleDateString('default').indexOf('31') < 2);
}

export function fromISO(dateString: string | Date) {
  if (!dateString) return null;
  if (dateString instanceof Date) return dateString;
  return new Date(dateString);
}

export function toISO(date: Date) {
  if (!date) return null;
  return date.toISOString();
}

export function fromTimestamp(number: number | string | Date) {
  if (!number) return null;
  return new Date(number);
}

export function toTimestamp(date: Date) {
  if (!date) return null;
  return date.getTime();
}

export function getMonthNames(locale = 'default', format: 'long' | 'short' = 'long') {
  const months = [];
  // Use a fixed year (e.g., 2017) and the 1st day to avoid issues with month rollovers
  // for months that have fewer than 31 days (e.g., February 31st is invalid)
  for (let i = 0; i < 12; i++) {
    const date = new Date(2017, i, 1);
    months.push(date.toLocaleString(locale, { month: format }));
  }
  return months;
}

export function getMonthNamesStartingWith(monthNamePart: string, locale = 'default', format: 'long' | 'short' = 'long'): string[] {
  const monthAbbrevs = getMonthNames(locale, format);
  return monthAbbrevs.filter(abbrev => abbrev.toLowerCase().startsWith(monthNamePart.toLowerCase()))
}

export function monthIndexToMonthNumber(monthIndex) {
  return isFinite(monthIndex) ? monthIndex + 1 : null;
}

export function monthNumberToMonthIndex(monthNumber: string | number) {
  return (`${monthNumber}` || '').length > 0 ? (parseInt(`${monthNumber}`, 10) - 1) : null;
}

export function monthIndexToAbbrev(monthIndex: number) {
  return isFinite(monthIndex) ? getMonthNames('default', 'short')[monthIndex] : null;
}

export function monthAbbrevToMonthIndex(monthAbbrev: string) {
  if (!monthAbbrev) return null;
  const abrevs = getMonthNames('default', 'short');
  for (let i = 0; i < abrevs.length; i++) {
    if (abrevs[i].toLowerCase().startsWith(monthAbbrev.toLowerCase())) return i; // Check if the next value starts with a valid month abbreviation
  }
  return null;
}

export function isEqual(one: Date, two: Date, granularity: 'day' | 'month' | 'year' | 'minute' | 'time' = 'day') {
  if (!one || !two) return false;
  switch (granularity) {
    case "day":
      return isEqual(one, two, 'month') && one.getDate() === two.getDate();
    case "month":
      return isEqual(one, two, 'year') && one.getMonth() === two.getMonth();
    case "year":
      return one.getFullYear() === two.getFullYear();
    case "time":
    case "minute":
      return isEqual(one, two, 'day') && one.getHours() === two.getHours() && one.getMinutes() === two.getMinutes();
    default:
      return false;
  }
}

export function getDatesInWeek(weekIndex: number, visibleDate: Date) {
  const firstDay = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1).getDay();
  const startOfWeek = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), weekIndex * 7 - firstDay + 1);
  return [...Array(7)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });
}

export function getWeeksInMonth(visibleDate: Date) {
  const firstDay = startOfMonth(visibleDate).getDay();
  const totalDays = endOfMonth(visibleDate).getDate();
  return Math.ceil((firstDay + totalDays) / 7);
}

export function nameForVisibleDates(visibleDate: Date, visibleMonths = 1, showYear = true) {
  if (visibleMonths <= 1 || !isFinite(visibleMonths)) {
    return visibleDate.toLocaleString('default', { month: 'long', year: showYear ? 'numeric' : undefined });
  }

  const startMonth = startOfMonth(visibleDate);
  const endMonth = startOfMonth(add(visibleDate, visibleMonths - 1, 'month'));

  return [
    nameForVisibleDates(startMonth, 1, !isEqual(startMonth, endMonth, 'year')),
    nameForVisibleDates(endMonth)
  ].join(' – ');
}
