import React from 'react'
import ApplicationAlert from '@harvest-profit/npk/ApplicationAlert';
import MaintenanceIcon from '../../icons/regular/MaintenanceIcon.svg';

const icons = { None: null, MaintenanceIcon }

export default {
  title: 'Components/ApplicationAlert',
  description: 'Used to display a banner across the top of the screen with some information. You must have the theme provider set and configure the prependRootId option for this to work.',
  component: ApplicationAlert,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
    },
    as: {
      type: 'string',
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'primary'],
    },
    children: {
      type: 'string'
    }
  },
  args: {
    as: 'div',
    variant: 'default',
    children: 'Example of an application wide alert'
  }
}

export const Default = () => <ApplicationAlert>Example of an application wide alert</ApplicationAlert>
export const WithIcon = () => <ApplicationAlert icon={MaintenanceIcon}>Example of an application wide alert</ApplicationAlert>
export const WithIconElement = () => <ApplicationAlert icon={<MaintenanceIcon />}>Example of an application wide alert</ApplicationAlert>
export const Primary = () => <ApplicationAlert variant="primary">You have 6 days left on your trial. <b>Upgrade your account here »</b></ApplicationAlert>