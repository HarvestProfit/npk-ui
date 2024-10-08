import React from 'react';
import classes from './Spinner.module.css';

const sizeMap = {
  sm: 16,
  md: 32,
  lg: 64,
}

const Spinner = ({
  size: sizeKey = 'md',
  ...props
}) => {

  const size = sizeMap[sizeKey];

  return (
    /* inline-flex removes the extra line height */
    <span style={{ display: 'inline-flex' }}>
      <svg
        className={classes.Spinner}
        height={size}
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        {...props}
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

export default Spinner;
