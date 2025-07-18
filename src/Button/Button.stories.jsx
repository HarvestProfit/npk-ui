import React from 'react'
import Button from '@harvest-profit/npk/Button';
import Tooltip from '@harvest-profit/npk/Tooltip';
import Card from '@harvest-profit/npk/Card';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Components/Buttons',
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
    active: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    selected: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'alias for active for use in menus'
    },
    selectedIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "CheckedIcon" } },
      description: "When selected is true, unless leadingVisual, this icon will be used"
    },
    elevated: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'Make the button float with a shadow'
    },
    invisible: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'Makes the button appear as just a line of text'
    },
    plain: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } },
      description: 'None rounded plain button'
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
      options: ['default', 'primary', 'danger'],
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
    as: 'button',
    variant: 'default',
    children: 'Button',
    leadingVisual: null,
    trailingVisual: null,
    trailingAction: null,
    block: false,
    disabled: false,
    loading: false,
    elevated: false,
    invisible: false,
    plain: false,
    chip: null,
    'aria-label': null
  }
}

export const Default = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button>default</Button>
  <Button loading>default</Button>
  <Button disabled>Disabled</Button>
  <Button leadingVisual={Icons.ExportIcon}>Leading Vis</Button>
  <Button leadingVisual={Icons.ExportIcon} loading>Leading Vis</Button>
  <Button trailingVisual={Icons.ExportIcon}>Trailing Vis</Button>
  <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dropdown</Button>
  <Button leadingVisual={Icons.ExportIcon} chip="10">With Chip</Button>
  <Button size="sm">Small</Button>
</div>

export const Primary = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="primary">Primary</Button>
  <Button variant="primary" loading>Primary</Button>
  <Button variant="primary" disabled>Disabled</Button>
  <Button variant="primary" leadingVisual={Icons.ExportIcon}>Leading Vis</Button>
  <Button variant="primary" leadingVisual={Icons.ExportIcon} loading>Leading Vis</Button>
  <Button variant="primary" trailingVisual={Icons.ExportIcon}>Trailing Vis</Button>
  <Button variant="primary" leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dropdown</Button>
  <Button variant="primary" leadingVisual={Icons.ExportIcon} chip="10">With Chip</Button>
  <Button variant="primary" size="sm">Small</Button>
</div>

export const Danger = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="danger">danger</Button>
  <Button variant="danger" loading>danger</Button>
  <Button variant="danger" disabled>Disabled</Button>
  <Button variant="danger" leadingVisual={Icons.DeleteIcon}>Leading Vis</Button>
  <Button variant="danger" leadingVisual={Icons.ExportIcon} loading>Leading Vis</Button>
  <Button variant="danger" trailingVisual={Icons.ExportIcon}>Trailing Vis</Button>
  <Button variant="danger" leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dropdown</Button>
  <Button variant="danger" leadingVisual={Icons.ExportIcon} chip="10">With Chip</Button>
  <Button variant="danger" size="sm">Small</Button>
</div>

export const Groups = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button.Group>
    <Button leadingVisual={Icons.AddIcon}>Add</Button>
    <Button leadingVisual={Icons.EditIcon}>Edit</Button>
    <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
  </Button.Group>
  <Button leadingVisual={Icons.AddIcon}>Add</Button>

  <Button.Group variant="primary">
    <Button leadingVisual={Icons.AddIcon}>Add</Button>
    <Button icon={Icons.DropdownIndicatorIcon} aria-label="More primary actions" />
  </Button.Group>

  <Button.Group variant="danger" size="sm">
    <Button leadingVisual={Icons.AddIcon}>Add</Button>
    <Button leadingVisual={Icons.EditIcon}>Edit</Button>
    <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
  </Button.Group>
  <Button leadingVisual={Icons.AddIcon} size="sm">Add</Button>
</div>

export const ColorsOnCards = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button leadingVisual={Icons.AddIcon}>On Background</Button>
  <Button.Group>
    <Button leadingVisual={Icons.AddIcon}>Add</Button>
    <Button leadingVisual={Icons.EditIcon}>Edit</Button>
    <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
  </Button.Group>
  <Card>

    <Button leadingVisual={Icons.AddIcon}>On Card</Button>

    <Button.Group>
      <Button leadingVisual={Icons.AddIcon}>Add</Button>
      <Button leadingVisual={Icons.EditIcon}>Edit</Button>
      <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
    </Button.Group>
  </Card>

  <Card variant="muted">

    <Button leadingVisual={Icons.AddIcon}>On Card</Button>

    <Button.Group>
      <Button leadingVisual={Icons.AddIcon}>Add</Button>
      <Button leadingVisual={Icons.EditIcon}>Edit</Button>
      <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
    </Button.Group>
  </Card>

  <Card variant="invisible">

    <Button leadingVisual={Icons.AddIcon}>On Card</Button>

    <Button.Group>
      <Button leadingVisual={Icons.AddIcon}>Add</Button>
      <Button leadingVisual={Icons.EditIcon}>Edit</Button>
      <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Export</Button>
    </Button.Group>
  </Card>
</div>

export const Elevated = () => <div>

  <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    <Button variant="danger" leadingVisual={Icons.DeleteIcon} elevated>Delete Selected</Button>
    <Button elevated leadingVisual={Icons.EditIcon}>Bulk Edit</Button>
    <Button elevated leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon} chip="12">Export</Button>
  </div>


  <h4>CTAs</h4>
  <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    <Button elevated size="lg" leadingVisual={Icons.ExportIcon}>Export</Button>
    <Button variant="primary" size="lg" elevated leadingVisual={Icons.AddIcon} loading>Adding Item...</Button>
    <Button variant="primary" size="lg" elevated leadingVisual={Icons.AddIcon} trailingAction={Icons.DropdownIndicatorIcon}>Add Something</Button>
  </div>
</div>


export const IconButtons = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="primary" icon={Icons.ExportIcon} aria-label="Primary Export" />
  <Button variant="danger" icon={Icons.ExportIcon} aria-label="Destructive Export" />
  <Button icon={Icons.ExportIcon} aria-label="Export" />
  <Button icon={Icons.ExportIcon} />
</div>

export const Invisible = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="primary" invisible>Primary</Button>
  <Button variant="danger" invisible>Danger</Button>
  <Button icon={Icons.ExportIcon} invisible>Export</Button>
  <Button invisible loading>Loading</Button>
  <Button invisible disabled>Disabled</Button>
  <Button invisible chip="Beta">With Chip</Button>
</div>

export const ContextDriven = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Button.Context value={{ variant: 'primary', onClick: () => setCount(count + 1) }}>
        <Button>Primary</Button>
      </Button.Context>
      <p>Count: {count}</p>
    </div>
  )
}

export const WithTooltip = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button aria-label="Hello!">I have a Tooltip</Button>
  <Button aria-describedby="btn-tooltip-id">Described By</Button>
  <Tooltip id="btn-tooltip-id">Describedby Tooltip</Tooltip>
</div>
export const Playground = (props) => <Button {...props} />