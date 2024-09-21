import React from 'react';
import { CloseButton } from '@harvest-profit/npk';

function Example(args) {
  return <CloseButton {...args} />;
}

Example.args = {
  disabled: false,
};

export default Example;
