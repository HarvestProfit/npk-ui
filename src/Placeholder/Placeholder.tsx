import React from 'react';
import classes from './Placeholder.module.css';

function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectWidth(value: number | string | Array<number> | null | undefined): number | string | null {
  if (Number.isFinite(value)) return value as number;
  if (typeof value === 'string') return value;
  if (!value) return null;
  if (Array.isArray(value) && value.length === 0) return null;

  const min = Array.isArray(value) ? value[0] : 0;
  const max = Array.isArray(value) ? value[1] || min : 0;

  return randomIntFromInterval(min, max);
}

interface PlaceholderProps {
  width?: number | string | Array<number>;
}

const Placeholder: React.FC<PlaceholderProps> = ({ width = [70, 150] }) => {
  return (
    <span
      title="loading..."
      aria-hidden="true"
      className={classes.Placeholder}
      style={{ width: selectWidth(width) || 100 }}
    >
      &nbsp;
    </span>
  );
}

export default Placeholder;
export type { PlaceholderProps };