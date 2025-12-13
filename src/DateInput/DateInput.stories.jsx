import React from 'react'
import DateInput, { dateUtils } from '@harvest-profit/npk/DateInput';
import Button from '@harvest-profit/npk/Button';
import Calendar from '@harvest-profit/npk/Calendar';
import Menu from '@harvest-profit/npk/Menu';
import Card from '@harvest-profit/npk/Card';
import * as Icons from '@harvest-profit/npk/icons/regular';
import { expect } from 'storybook/test';

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
    label: {
      type: 'string',
      description: 'The label for the input',
    },
    labelDescription: {
      type: 'string',
      description: 'More details for the input',
    },
    info: {
      type: 'string',
      description: 'Additional information for the input',
    },
    error: {
      type: 'string',
      description: 'An error message for the input',
    },
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    monthAsName: {
      type: 'boolean',
      description: 'Show month as name instead of number',
      table: { defaultValue: { summary: "false" } }
    },
    includeYear: {
      type: 'boolean',
      description: 'Include the year in the date input',
      table: { defaultValue: { summary: "true" } }
    },
    picker: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    presets: {
      type: 'boolean',
      description: 'Show some preset buttons on the picker',
      table: { defaultValue: { summary: "false" } }
    },
    visibleMonths: {
      type: 'integer',
      description: 'The number of months visible in the picker',
      table: { defaultValue: { summary: "1" } }
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
    visibleMonths: null,
    disabled: false,
    picker: false,
    presets: false,
    'aria-label': null
  }
}

export const Default = () => {
  const [value, setValue] = React.useState()
  const [value2, setValue2] = React.useState(new Date('2025-01-22T16:00:00.653-06:00'))
  const [value3, setValue3] = React.useState()
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <p>1(ISO) {value}</p>
        <p>2(Date) {value2.toString()}</p>
        <p>3(Timestamp) {value3}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <DateInput label="Generic (sm)" size="sm" picker presets value={value} onChange={setValue} /><Button>Save</Button>
        <DateInput label="With picker" picker presets value={value2} onChange={setValue2} output="date" granularity="minute" monthAsName />
        <DateInput label="To Timestamp" value={value3} onChange={setValue3} output="timestamp" granularity="minute" /><Button>Save</Button>
      </div>
    </div>
  )
}

export const CalendarButton = () => {
  const [date, setDate] = React.useState('2023-01-01');

  return (
    <div>
      <Menu arrow>
        <Button>{dateUtils.fromISO(date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</Button>
        <Menu.Overlay>
          <Calendar value={date} onChange={setDate} />
        </Menu.Overlay>
      </Menu>
    </div>
  )
}

export const CalendarInline = () => {
  const [date, setDate] = React.useState('2023-01-01');

  return (
    <div>
      <p>selected: {dateUtils.fromISO(date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      <Card style={{ width: 650 }}>
      <Calendar visibleMonths={2} value={date} onChange={setDate} />
      </Card>
      
    </div>
  )
}

export const Range = (props) => {
  const [value, setValue] = React.useState({ start: new Date() })
  return (
    <div>
      <p>{value?.start?.toString()} TO {value?.end?.toString()}</p>
      <DateInput.Range {...props} picker presets value={value} onChange={setValue} trailingVisual={<Button tabIndex={-1} invisible icon={Icons.QuestionIcon} aria-label="This sets the date range" />} /><Button size={props.size}>Save</Button>
    </div>
  )
}

export const Time = () => {
  const [value, setValue] = React.useState(new Date())

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Input in a Card" />
    <div>
      <DateInput granularity="time" value={value} onChange={setValue} />
      <Button>Save</Button>
      <p>{value?.toString()}</p>
    </div>
    
  </Card>
  
</div>
  )
}

export const Plain = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <DateInput variant="plain" />
</div>

export const Granularity = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <div><DateInput label="Minute" granularity="minute" includeYear={false} /></div>
  <div><DateInput label="Day (Default)" granularity="day" monthAsName /></div>
  <div><DateInput label="Month" granularity="month" /></div>
  <div><DateInput label="Year" granularity="year" /></div>
  <div><DateInput.Range label="Month (Range)" granularity="month" monthAsName /></div>
  <div><DateInput label="Time" granularity="time" /></div>
</div>

export const PassThroughProps = {
  play: async ({ canvas }) => {
    const input = canvas.getByTestId('123');
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("data-tour", "Something Random");
  },
  render:() => (
    <DateInput data-tour="Something Random" data-testid="123" />
  )
}

export const Playground = (props) => <DateInput {...props} />