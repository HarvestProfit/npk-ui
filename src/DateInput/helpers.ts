import { fromISO, fromTimestamp, toISO, toTimestamp } from "../Calendar/utils";

export type valueType = Date | string | number;
export type outputFormatType = 'ISO' | 'timestamp' | 'Date';
export type onChangeType = (date: any) => void;

export type useValueFormatterReturnType = {
  to: (value: Date, optionalFormat?: outputFormatType) => valueType;
  from: (value: valueType) => Date;
}

export const isoDateIncludesTime = (value: any) => {
  if (`${value}`.includes('T')) return true;

  return false;
}

export const useValueFormatter = (format: outputFormatType = 'ISO', includeTime = true): useValueFormatterReturnType => {
  let toDateFormatter = (v: any): Date => v;
  let fromDateFormatter = (v: Date): any => v;
  switch (format || 'ISO') {
    case 'ISO':
      // We want to strip the time off of the outputted value if the inputted value did not contain
      // a time. This indicates that the ISO format/attribute we are affecting is date only.
      toDateFormatter = (v) => fromISO(v);
      fromDateFormatter = (newValue) => toISO(newValue, !includeTime);
      break;
    case 'timestamp':
      toDateFormatter = (v) => fromTimestamp(v);
      fromDateFormatter = (newValue) => toTimestamp(newValue);
      break;
    default:
      break;
  }

  const toOutputFormatter = (value?: Date, optionalFormat?: outputFormatType) => {
    if (optionalFormat === 'ISO') return toISO(value, !includeTime);
    if (optionalFormat === 'timestamp') return toTimestamp(value);
    return fromDateFormatter(value);
  }

  return { to: toOutputFormatter, from: toDateFormatter };
}
