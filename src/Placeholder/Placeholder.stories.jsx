import React from 'react'
import Placeholder from '@harvest-profit/npk/Placeholder';

export default {
  title: 'Components/Placeholder',
  component: Placeholder,
  argTypes: {
    width: {
      type: 'string',
      table: { defaultValue: { summary: "[70,150]" } },
      description: "Can be a numeric pixel value, percent, or an array of min max to randomly select from"
    }
  }
}

export const Example = () => (<div>
  <p>Let's load things! How about something inline like my name is <Placeholder />, what's your name?</p>
  <p>Or maybe a list!</p>
  <ul>
    <li><Placeholder width={[70, 200]} /></li>
    <li><Placeholder width={[70, 200]} /></li>
    <li><Placeholder width={[70, 200]} /></li>
  </ul>

  <h2>We can even <Placeholder /> things in a header</h2>

  <p>Or in a table</p>
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><Placeholder /></td>
        <td><Placeholder /></td>
      </tr>
      <tr>
        <td><Placeholder /></td>
        <td><Placeholder /></td>
      </tr>
      <tr>
        <td><Placeholder /></td>
        <td><Placeholder /></td>
      </tr>
    </tbody>
  </table>
</div>);