import React from 'react'
import Card from '@harvest-profit/npk/Card';
import Placeholder from '@harvest-profit/npk/Placeholder';
import Table from '@harvest-profit/npk/Table';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    role: {
      control: {
        type: 'radio',
      },
      options: ['default', 'treegrid'],
      table: { defaultValue: { summary: "default" } }
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['zebra', 'plain'],
      table: { defaultValue: { summary: "zebra" } }
    }
  },
  args: {
    role: 'default',
  }
}

const data = [
  { firstName: 'John', lastName: 'Smith', age: 25 },
  { firstName: 'Jane', lastName: 'Doe', age: 31 },
  { firstName: 'Alice', lastName: 'Johnson', age: 28 },
  { firstName: 'Bob', lastName: 'Williams', age: 34 },
  { firstName: 'Carol', lastName: 'Brown', age: 22 },
  { firstName: 'David', lastName: 'Jones', age: 40 },
  { firstName: 'Emily', lastName: 'Garcia', age: 27 },
  { firstName: 'Frank', lastName: 'Martinez', age: 36 },
  { firstName: 'Grace', lastName: 'Lee', age: 29 },
  { firstName: 'Henry', lastName: 'Walker', age: 33 },
  { firstName: 'Ivy', lastName: 'Hall', age: 24 },
  { firstName: 'Jack', lastName: 'Allen', age: 38 },
  { firstName: 'Karen', lastName: 'Young', age: 26 },
  { firstName: 'Leo', lastName: 'Hernandez', age: 32 },
  { firstName: 'Mona', lastName: 'King', age: 30 },
  { firstName: 'Nate', lastName: 'Wright', age: 35 },
  { firstName: 'Olivia', lastName: 'Lopez', age: 23 },
  { firstName: 'Paul', lastName: 'Hill', age: 37 },
  { firstName: 'Quinn', lastName: 'Scott', age: 21 },
  { firstName: 'Rita', lastName: 'Green', age: 39 },
];

export const Default = () => (
  <Table maxHeight={400}>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th data-type="number">Age</th>
      </tr>
    </thead>
    <tbody>
      {data.map((person, index) => (
        <tr key={index}>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td data-type="number">{person.age}</td>
        </tr>
      ))}
      <tr>
        <th scope="row" colSpan="3">Section 2</th>
      </tr>
      {data.map((person, index) => (
        <tr key={index}>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td data-type="number">{person.age}</td>
        </tr>
      ))}
    </tbody>
    <tfoot data-sticky="false">
      <tr>
        <td colSpan="3">This is the table footer but it is not sticky because `data-sticky="false"`</td>
      </tr>
    </tfoot>
  </Table>
);

export const WithCounterMetrics = () => (
  <div>
    <Table.Metrics>Total 4</Table.Metrics>
    <Table maxHeight={400}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th data-type="number">Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={index}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td data-type="number">{person.age}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export const ClickableAndExpandable = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  return (
  <Table role="treegrid">
    <thead>
      <tr>
        <th>Level</th>
        <th data-type="number">Data</th>
      </tr>
    </thead>
    <tbody>
      <tr aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <td>#1 Expand Me</td>
        <td data-type="number">25</td>
      </tr>
      {expanded && (
        <>
          <tr aria-level="2">
            <td style={{ paddingLeft: 20 }}>#2 I'm not clickable cuz I don't have the aria-expanded prop AND I'm level 2.</td>
            <td data-type="number">31</td>
          </tr>
          <tr aria-level="2" aria-expanded={expanded2} onClick={() => setExpanded2(!expanded2)}>
            <td style={{ paddingLeft: 20 }}>#2 Expand Me Again</td>
            <td data-type="number">31</td>
          </tr>
        </>
      )}
      {expanded2 && (
      <tr aria-level="3">
        <td style={{ paddingLeft: 40 }}>#3 I'm not clickable</td>
        <td data-type="number">25</td>
      </tr>
      )}
      <tr aria-level="1">
        <td>I'm still clickable because I'm level 1.</td>
        <td data-type="number">25</td>
      </tr>
      <tr aria-disabled="true">
        <td>I can't be clicked because I have aria-disabled="true"</td>
        <td data-type="number">25</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="3">This is the table footer</td>
      </tr>
    </tfoot>
  </Table>
);
}



export const InsideCard = () => (
  <Card>
    <Card.Header title="Card Title" />
      <Table maxHeight={300}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th data-type="number">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" colSpan="3">Section 2</th>
          </tr>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">This is the table footer</td>
          </tr>
        </tfoot>
      </Table>
  </Card>
);

export const InvisibleAndMutedCards = () => (
  <>
  <Card variant="invisible">
    <Card.Header title="Card Title" />
      <Table maxHeight={300}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th data-type="number">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" colSpan="3">Section 2</th>
          </tr>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">This is the table footer</td>
          </tr>
        </tfoot>
      </Table>
  </Card>
  <Card variant="muted">
    <Card.Header title="Card Title" />
      <Table maxHeight={300}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th data-type="number">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" colSpan="3">Section 2</th>
          </tr>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td data-type="number">{person.age}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">This is the table footer</td>
          </tr>
        </tfoot>
      </Table>
  </Card>
  </>
);


export const InsideCardWithoutHeader = () => (
  <Card>
    <Table maxHeight={300}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th data-type="number">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Smith</td>
          <td data-type="number">25</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-type="number">31</td>
        </tr>
        <tr>
          <td>John</td>
          <td>Smith</td>
          <td data-type="number">25</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-type="number">31</td>
        </tr>
      </tbody>
    </Table>
  </Card>
);

export const TruncatedValues = () => (
  <Card>
    <h4>Individual columns are truncated</h4>
    <Table layout="fixed">
      <thead>
        <tr>
          <th>First Name</th>
          <th style={{ width: 200 }} >Last Name</th>
          <th data-type="number">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <Table.Td truncate>Smith With a Very Very Very Very loooooooooong namme</Table.Td>
          <Table.Td type="number">25</Table.Td>
        </tr>
        <tr>
          <td>Jane</td>
          <td data-truncate="true">Smith With a Very Very Very Very loooooooooong namme</td>
          <td data-type="number">31</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith With a Very Very Very Very loooooooooong namme</td>
          <td data-type="number">31</td>
        </tr>
      </tbody>
    </Table>
    <Card.Divider />
    <h4>Whole table is truncated</h4>
    <Table layout="fixed" truncate>
      <thead>
        <tr>
          <th>First Name</th>
          <th style={{ width: 200 }} >Last Name</th>
          <th data-type="number">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Smith With a Very Very Very Very loooooooooong namme</td>
          <Table.Td type="number">25</Table.Td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith With a Very Very Very Very loooooooooong namme</td>
          <td data-type="number">31</td>
        </tr>
      </tbody>
    </Table>
  </Card>
);

export const Loading = () => (
  <>
    <Card>
      <Card.Header title="Loading With Placeholders (preferred)" />
      <Table maxHeight={400}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th data-type="number">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Placeholder /></td>
            <td><Placeholder /></td>
            <td data-type="number"><Placeholder /></td>
          </tr>
          <tr>
            <td><Placeholder /></td>
            <td><Placeholder /></td>
            <td data-type="number"><Placeholder /></td>
          </tr>
          <tr>
            <td><Placeholder /></td>
            <td><Placeholder /></td>
            <td data-type="number"><Placeholder /></td>
          </tr>
        </tbody>
      </Table>
    </Card>
    <br />
    <Card>
      <Card.Header title="Loading Prebuilt Component" />
      <Table.Loading rows={5} columns={3} />
    </Card>
  </>
);