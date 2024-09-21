import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, NavbarText } from '@harvest-profit/npk';
import Props from '../Props';

function Example() {
  return (
    <Props components={[Navbar, NavbarToggler, NavbarBrand, NavbarText]} />
  );
}

export default Example;
