import React from 'react'
import Button from '@harvest-profit/npk/Button';
import MaintenanceIcon from '../../icons/regular/MaintenanceIcon.svg';

const icons = { None: null, MaintenanceIcon }

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Can also be an element to work with legacy fontawesome icons."
    },
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<div>" } }
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'primary'],
      table: { defaultValue: { summary: "default" } }
    },
    children: {
      type: 'string',
    }
  },
  args: {
    as: 'div',
    variant: 'default',
    children: 'Example of an application wide alert',
    icon: null
  }
}

export const Default = () => <Button>Example of an application wide alert</Button>