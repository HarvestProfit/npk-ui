import React, { useState } from 'react'
import SegmentedControl from '@harvest-profit/npk/SegmentedControl';
import Tooltip from '@harvest-profit/npk/Tooltip';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    selected: {
      type: 'integer',
      description: 'Index of the selected item'
    },
    onChange: {
      type: 'function',
      description: 'Called when the selection changes, new index is the returned value'
    },
    block: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: "Full width control"
    },
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "md" } }
    },
    children: {
      type: 'string',
    }
  },
  args: {
    block: false,
    selected: 0,
    disabled: false,
  }
}

export const Default = () => {
  const [selected, setSelected] = useState(0);
  return (
    <SegmentedControl selected={selected} onChange={setSelected}>
      <SegmentedControl.Button>By Field</SegmentedControl.Button>
      <SegmentedControl.Button>By Crop</SegmentedControl.Button>
      <SegmentedControl.Button>By Season</SegmentedControl.Button>
    </SegmentedControl>
  )
}

export const Small = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="d-flex flex-row">

      <h4 style={{ display: 'inline-block', marginBottom: 0, marginRight: 10 }}>Grain Cart Level</h4>
      <SegmentedControl size="sm" selected={selected} onChange={setSelected}>
        <SegmentedControl.Button>Wet</SegmentedControl.Button>
        <SegmentedControl.Button>Dry</SegmentedControl.Button>
      </SegmentedControl>
    </div>
  )
}

export const WithIcons = () => {
  const [selected, setSelected] = useState(0);
  return (
    <SegmentedControl selected={selected} onChange={setSelected}>
      <SegmentedControl.Button leadingVisual={Icons.FieldIcon}>By Field</SegmentedControl.Button>
      <SegmentedControl.Button leadingVisual={Icons.FarmIcon} aria-label="Show all grouped by farm">By Farm</SegmentedControl.Button>
    </SegmentedControl>
  )
}

export const IconButtons = () => {
  const [selected, setSelected] = useState(0);
  return (
    <SegmentedControl selected={selected} onChange={setSelected}>
      <SegmentedControl.IconButton icon={Icons.FieldIcon} aria-label="By Field" />
      <SegmentedControl.IconButton icon={Icons.FarmIcon} aria-label="By Farm" />
    </SegmentedControl>
  )
}