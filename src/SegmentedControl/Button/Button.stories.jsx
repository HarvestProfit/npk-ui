import React, { useState } from 'react'
import SegmentedControl from '@harvest-profit/npk/SegmentedControl';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/SegmentedControl/Button',
  component: SegmentedControl.Button,
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
    loading: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'Sets loading spinner and disables the button'
    },
    chip: {
      type: 'string',
      description: 'Used to add a chip on the trailing edge of the button, like a counter'
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
    leadingVisual: null,
    loading: false,
    chip: null,
    'aria-label': null
  }
}

export const Default = () => {
  const [selected, setSelected] = useState(0);
  return (
    <SegmentedControl selected={selected} onChange={setSelected}>
      <SegmentedControl.Button aria-label="Grouped by field">By Field</SegmentedControl.Button>
      <SegmentedControl.Button leadingVisual={Icons.FieldIcon}>By Crop</SegmentedControl.Button>
      <SegmentedControl.Button chip="30">By Season</SegmentedControl.Button>
    </SegmentedControl>
  )
}
