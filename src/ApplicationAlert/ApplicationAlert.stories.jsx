import React from 'react'
import ApplicationAlert from '@harvest-profit/npk/ApplicationAlert';
import * as Icons from '@harvest-profit/npk/icons';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/ApplicationAlert',
  component: ApplicationAlert,
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

export const Default = () => <ApplicationAlert>Example of an application wide alert</ApplicationAlert>
export const Playground = (props) => <ApplicationAlert {...props}>Example of an application wide alert</ApplicationAlert>
export const WithIcon = () => <ApplicationAlert icon={Icons.MaintenanceIcon}>We are performing a update to our services from 2am to 4am on Wednesday.</ApplicationAlert>
export const WithIconElement = () => <ApplicationAlert icon={<Icons.MaintenanceIcon />}>Example of an application wide alert</ApplicationAlert>
export const DemoUpgrade = () => <ApplicationAlert variant="primary" as="a" href="https://harvestprofit.com/pricing">You have 6 days left on your trial. <b>Upgrade your account here »</b></ApplicationAlert>