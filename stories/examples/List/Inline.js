import React from 'react';
import { List, ListInlineItem } from '@harvest-profit/npk';

function Example(props) {
  return (
    <List type="inline">
      <ListInlineItem>Lorem ipsum</ListInlineItem>
      <ListInlineItem>Phasellus iaculis</ListInlineItem>
      <ListInlineItem>Nulla volutpat</ListInlineItem>
    </List>
  );
}

export default Example;

Example.parameters = {
  docs: {
    description: {
      story: 'Remove a list’s bullets and apply some light margin',
    },
  },
};
