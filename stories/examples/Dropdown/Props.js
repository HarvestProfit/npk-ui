import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@harvest-profit/npk';
import Props from '../Props';

function Example() {
  return (
    <Props
      components={[Dropdown, DropdownToggle, DropdownMenu, DropdownItem]}
    />
  );
}

export default Example;
