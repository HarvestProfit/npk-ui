import React from 'react'
import DateInput, { dateUtils } from '@harvest-profit/npk/DateInput';
import Button from '@harvest-profit/npk/Button';
import Calendar from '@harvest-profit/npk/Calendar';
import Menu from '@harvest-profit/npk/Menu';
import Card from '@harvest-profit/npk/Card';
import * as Icons from '@harvest-profit/npk/icons/regular';
import { expect, userEvent } from 'storybook/test';

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
    output: {
      control: {
        type: 'radio'
      },
      options: ['ISO', 'timestamp', 'Date'],
      description: 'The format of the value inputted and outputted via onChange from this component',
      table: { defaultValue: { summary: 'ISO' }}
    },
    isoType: {
      control: {
        type: 'radio'
      },
      options: ['Date', 'DateTime', 'null'],
      description: 'The format of the ISO value outputted via the onChange from this component. Will remove the time part if specifying "Date"',
      table: { defaultValue: { summary: 'null' }}
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
  const [value2, setValue2] = React.useState(new Date())
  const [value3, setValue3] = React.useState()
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <p>1(ISO) {value}</p>
        <p>2(Date) {value2.toString()}</p>
        <p>3(Timestamp) {value3}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <DateInput label="Date (sm)" name="generic" size="sm" picker presets value={value} onChange={setValue} /><Button>Save</Button>
        <DateInput label="With picker" picker presets value={value2} onChange={setValue2} output="Date" granularity="minute" monthAsName />
        <DateInput label="To Timestamp" value={value3} onChange={setValue3} output="timestamp" granularity="minute" /><Button>Save</Button>
      </div>
    </div>
  )
}

export const CalendarButton = {
  play: async ({ canvas }) => {

    const menu = canvas.getByTestId('menu');
    await expect(menu).toHaveTextContent('2023-01-01');
    await userEvent.click(menu);

    const dateToSelect = new Date(2023, 0, 2);
    const dateLabel = dateToSelect.toLocaleDateString('default', { month: 'long', year: 'numeric', day: 'numeric' });
    const cell = canvas.getByRole('gridcell', { name: dateLabel })
    await expect(cell).toBeInTheDocument();
    await userEvent.click(cell);
    await expect(menu).toHaveTextContent('2023-01-02');
    // Should NOT have a time component to the output
    await expect(menu).not.toHaveTextContent('2023-01-02T');
  },
  render: () => {
    const [date, setDate] = React.useState('2023-01-01');

    return (
      <div>
        <Menu arrow>
          <Button data-testid="menu">{date}</Button>
          <Menu.Overlay>
            <Calendar value={date} onChange={setDate} />
          </Menu.Overlay>
        </Menu>
      </div>
    )
  }
}

export const CalendarButtonWithTime = {
  play: async ({ canvas }) => {

    const menu = canvas.getByTestId('menu');
    await expect(menu).toHaveTextContent('2026-01-22T01:05:34.414Z');
    await userEvent.click(menu);

    const dateToSelect = new Date(2026, 0, 23);
    const dateLabel = dateToSelect.toLocaleDateString('default', { month: 'long', year: 'numeric', day: 'numeric' });
    const cell = canvas.getByRole('gridcell', { name: dateLabel })
    await expect(cell).toBeInTheDocument();
    await userEvent.click(cell);
    // Should also contain a time part of it
    await expect(menu).toHaveTextContent('T');
  },
  render: () => {
    const [date, setDate] = React.useState('2026-01-22T01:05:34.414Z');

    return (
      <div>
        <Menu arrow>
          <Button data-testid="menu">{date}</Button>
          <Menu.Overlay>
            <Calendar value={date} onChange={setDate} isoType="DateTime" />
          </Menu.Overlay>
        </Menu>
      </div>
    )
  }
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
  const [value, setValue] = React.useState((new Date()).toISOString())

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card>
        <Card.Header title="Input in a Card" />
        <div>
          <DateInput granularity="time" value={value} onChange={setValue} />
          <Button>Save</Button>
          <p data-testid="output">{value?.toString()}</p>
        </div>

      </Card>

    </div>
  )
}

const testValue1 = (new Date()).toISOString();
const testValue2 = dateUtils.add(new Date(), 2, 'day').toISOString();
export const Tests = {
  play: async ({ canvas }) => {
    const output = canvas.getByTestId('output');
    await expect(output).toBeInTheDocument();
    await expect(output).toHaveTextContent(testValue1?.toString());

    const input = canvas.getByTestId('input');
    await userEvent.tab();
    await userEvent.keyboard('1')
    await expect(output).toHaveTextContent(testValue2?.toString());

    const btn = canvas.getByTestId('addHourButton');
    const monthOutput = canvas.getByTestId('monthOutput');
    await expect(monthOutput).toHaveTextContent('2024-12-12');
    await userEvent.tab();
    await userEvent.keyboard('1')
    await userEvent.click(btn);
    await expect(monthOutput).toHaveTextContent('2024-12-12');
  },
  render: () => {
    const [value, setValue] = React.useState(testValue1);
    const [monthValue, setMonthValue] = React.useState('2024-12-12');

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Card>
          <Card.Header title="Test for onchange hook only called when actually changing something" />
          <div>
            <h4>Test Time Input</h4>
            <DateInput data-testid="input" granularity="time" value={value} onChange={() => setValue(testValue2)} />
            <p data-testid="output">{value?.toString()}</p>
          </div>
          <Card.Divider />
          <div>
            <h4>Test Month Input</h4>
            <DateInput data-testid="monthInput" granularity="month" value={monthValue} onChange={() => setMonthValue('2024-2-12')} />
            <Button data-testid="addHourButton" onClick={() => setMonthValue('2024-12-12')}>Add an Hour</Button>
            <p data-testid="monthOutput">{monthValue?.toString()}</p>
          </div>

        </Card>

      </div>
    )
  }
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
