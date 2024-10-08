import React from 'react';
import { ListGroup, ListGroupItem } from '@harvest-profit/npk';

function Example(args) {
  return (
    <ListGroup {...args}>
      <ListGroupItem>Cras justo odio</ListGroupItem>
      <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
      <ListGroupItem>Morbi leo risus</ListGroupItem>
      <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
      <ListGroupItem>Vestibulum at eros</ListGroupItem>
    </ListGroup>
  );
}

Example.args = {
  flush: false,
  horizontal: false,
  numbered: false,
};

export default Example;
