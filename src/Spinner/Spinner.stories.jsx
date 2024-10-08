import React from 'react'
import Spinner from '@harvest-profit/npk/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "md" } }
    },
  }
}

export const Playground = ({ ...props }) => (<div>
  <Spinner {...props} />
</div>);

export const Example = () => (<div>
  <div>Small <Spinner size="sm" /></div>
  <div>Medium <Spinner /></div>
  <div>Large <Spinner size="lg" /></div>
</div>);