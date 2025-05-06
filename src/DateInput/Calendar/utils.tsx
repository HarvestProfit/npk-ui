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