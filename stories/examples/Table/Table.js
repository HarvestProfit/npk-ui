import React from 'react';
import { Table } from '@harvest-profit/npk';

function Example(args) {
  return (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

Example.args = {
  bordered: false,
  borderless: false,
  dark: false,
  hover: false,
  responsive: false,
  striped: false,
};

Example.argTypes = {
  size: {
    control: { type: 'select' },
    options: ['', 'sm'],
  },
};

export default Example;
