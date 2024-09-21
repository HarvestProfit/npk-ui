import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from '@harvest-profit/npk';
import Props from '../Props';

function Example() {
  return (
    <Props
      components={[
        ListGroup,
        ListGroupItem,
        ListGroupItemHeading,
        ListGroupItemText,
      ]}
    />
  );
}

export default Example;
