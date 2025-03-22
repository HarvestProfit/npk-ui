import React from 'react'
import DateInput from '@harvest-profit/npk/DateInput';
import Button from '@harvest-profit/npk/Button';
import Card from '@harvest-profit/npk/Card';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Input/DateInput',
  component: DateInput,
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
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    picker: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<div>" } }
    },
    granularity: {
      control: {
        type: 'radio',
      },
      options: ['second', 'minute', 'hour', 'day', 'month', 'year'],
      table: { defaultValue: { summary: "day" } }
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'plain', 'invisible'],
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
    'aria-label': {
      type: 'string',
      description: 'Used to set a tooltip on the button. You can also use aria-describedby to link to a tooltip.',
    }
  },
  args: {
    as: 'div',
    variant: 'default',
    leadingVisual: null,
    trailingVisual: null,
    disabled: false,
    picker: false,
    'aria-label': null
  }
}

export const Default = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <DateInput aria-label="Generic date input" /><Button>Save</Button>
  <DateInput aria-label="Generic date input with picker" variant="invisible" picker /><Button>Save</Button>
</div>

export const Range = (props) => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <DateInput.Range {...props} trailingVisual={<Button invisible icon={Icons.QuestionIcon} aria-label="This sets the date range" />} /><Button size={props.size}>Save</Button>
</div>

export const Time = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Input in a Card" />
    <div>
      <DateInput.Time />
      <Button>Save</Button>
    </div>
    
  </Card>
  
</div>

export const Plain = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <DateInput variant="plain" />
</div>

export const Granularity = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <div><label>Minute</label><DateInput granularity="minute" /></div>
  <div><label>Hour</label><DateInput granularity="hour" /></div>
  <div><label>Day (Default)</label><DateInput granularity="day" /></div>
  <div><label>Month</label><DateInput granularity="month" /></div>
  <div><label>Year</label><DateInput granularity="year" /></div>
  <div><label>Month (Range)</label><DateInput.Range granularity="month" /></div>
  <div><label>Second (Time)</label><DateInput.Time granularity="second" /></div>
</div>


export const Playground = (props) => <DateInput {...props} />