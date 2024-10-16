import React from 'react'
import Button from '@harvest-profit/npk/Button';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'WIP/Buttons',
  component: Button,
  argTypes: {
    leadingVisual: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Icon at the start of the button"
    },
    trailingVisual: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Icon at the end of the button"
    },
    trailingAction: {
      options: ['None', 'DropdownIndicatorIcon'],
      mapping: { 'None': null, 'DropdownIndicatorIcon': Icons.DropdownIndicatorIcon },
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Icon at the end of the button"
    },
    block: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: "Full width button"
    },
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    loading: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<button>" } }
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'primary', 'danger', 'cta-primary', 'cta'],
      table: { defaultValue: { summary: "default" } }
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "md" } }
    },
    align: {
      control: {
        type: 'radio',
      },
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: "center" } }
    },
    count: {
      type: 'number',
    },
    children: {
      type: 'string',
    }
  },
  args: {
    as: 'button',
    variant: 'default',
    children: 'Button',
    leadingVisual: null,
    trailingVisual: null,
    trailingAction: null,
    block: false,
    disabled: false,
    loading: false,
    count: null
  }
}

export const Default = () => <Button>Example of an application wide alert</Button>
export const Playground = (props) => <Button {...props} />