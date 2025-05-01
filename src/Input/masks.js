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