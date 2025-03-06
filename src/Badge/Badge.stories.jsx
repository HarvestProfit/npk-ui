import React from 'react'
import Badge from '@harvest-profit/npk/Badge';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/Badge',
  component: Badge,
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
      description: "Icon at end of button even when full width. Used for dropdown indicators"
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
      table: { defaultValue: { summary: "false" } },
      description: 'Sets loading spinner and disables the button'
    },
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<button>" } }
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['purple', 'preview', 'green', 'red', 'brown', 'orange', 'blue'],
      table: { defaultValue: { summary: "default" } }
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['md', 'lg'],
      table: { defaultValue: { summary: "md" } }
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
      description: 'Used to set a tooltip on the badge. You can also use aria-describedby to link to a tooltip.',
    }
  },
  args: {
    as: 'span',
    color: null,
    children: 'Badge Name',
    leadingVisual: null,
    trailingVisual: null,
    trailingAction: null,
    disabled: false,
    loading: false,
    chip: null,
    'aria-label': null
  }
}

export const FeaturePreviews = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Badge color="preview">Preview</Badge>
  <Badge size="lg" color="preview" leadingVisual={Icons.FarmIcon}>Preview</Badge>
</div>

export const Clickable = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Badge color="green" onClick={() => alert('You clicked on a preview badge')}>Badge With Click</Badge>
  <Badge color="green">Badge With Out Click</Badge>
  <Badge color="green" aria-label="More info on this badge">Badge With Tooltip</Badge>
</div>

export const Colors = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Badge color="purple">Purple</Badge>
  <Badge size="lg" color="purple" leadingVisual={Icons.FarmIcon}>Large Purple</Badge>
  <Badge color="red">Red Badge</Badge>
  <Badge color="green">Green Badge</Badge>
  <Badge color="brown" aria-label="More info on this badge">Brown Badge With Tooltip</Badge>
  <Badge color="orange">Orange Badge</Badge>
  <Badge color="blue" chip="10">Blue With Chip</Badge>
  <Badge loading>Loading</Badge>
</div>

export const Playground = (props) => <Badge {...props} />