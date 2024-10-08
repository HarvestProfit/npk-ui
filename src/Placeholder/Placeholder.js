import React from 'react';
import classes from './Placeholder.module.css';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectWidth(value) {
  if (Number.isFinite(value)) return value;
  if (typeof value === 'string') return value;
  if (!value) return null;
  if (value.length === 0) return null;

  const min = value[0];
  const max = value[1] || min;

  return randomIntFromInterval(min, max);
}

const Placeholder = ({ width = [70, 150] }) => {
  return <span title="loading..." aria-hidden="true" className={classes.Placeholder} style={{ width: selectWidth(width) || 100 }}>&nbsp;</span>
}

export default Placeholder;
