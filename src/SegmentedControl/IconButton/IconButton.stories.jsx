import React, { useState } from 'react'
import SegmentedControl from '@harvest-profit/npk/SegmentedControl';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/SegmentedControl/IconButton',
  component: SegmentedControl.IconButton,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Icon at the start of the button"
    },
    loading: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'Sets loading spinner and disables the button'
    },
    children: {
      type: 'string',
    },
    'aria-label': {
      type: 'string',
      description: 'Used to set a tooltip on the button. You can also use aria-describedby to link to a tooltip.',
    }
  },
  args: {
    children: 'Button',
    icon: null,
    loading: false,
    'aria-label': null
  }
}

export const Default = () => {
  const [selected, setSelected] = useState(0);
  return (
    <SegmentedControl selected={selected} onChange={setSelected}>
      <SegmentedControl.IconButton icon={Icons.FieldIcon} aria-label="By Field" />
      <SegmentedControl.IconButton icon={Icons.FarmIcon} aria-label="By Farm" />
    </SegmentedControl>
  )
}
