import React from 'react';
import { Alert } from '@harvest-profit/npk';
import { colors } from '../options';

function Example(props) {
  return (
    <>
      {colors.map((color) => (
        <Alert color={color} key={color}>
          This is a primary alert — check it out!
        </Alert>
      ))}
    </>
  );
}

export default Example;
