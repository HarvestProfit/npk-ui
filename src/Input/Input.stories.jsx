import React from 'react'
import Input from '@harvest-profit/npk/Input';
import Button from '@harvest-profit/npk/Button';
import Menu from '@harvest-profit/npk/Menu';
import DateInput from '@harvest-profit/npk/DateInput';
import * as Icons from '@harvest-profit/npk/icons/regular';

const icons = { None: null, ...Icons }

export default {
  title: 'Input/Input',
  component: Input,
  argTypes: {
    leadingVisual: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Text or Icon at the start of the button"
    },
    trailingVisual: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "None" } },
      description: "Text or Icon at the end of the button"
    },
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    debounce: {
      type: 'boolean | number',
      description: "Allows you to debounce the onChange event. You can set it to a number or just true for 500ms",
      table: { defaultValue: { summary: "false" } }
    },
    selectAllOnFocus: {
      type: 'boolean',
      description: "Auto select all contents of the input when it receives focus.",
      table: { defaultValue: { summary: "true" } }
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
    }
  },
  args: {
    as: 'div',
    variant: 'default',
    leadingVisual: null,
    trailingVisual: null,
    disabled: false,
    'aria-label': null
  }
}

export const Default = () => {
  const [valuemonth, setValueMonth] = React.useState();
  const [valueday, setValueDay] = React.useState();
  const [valueyear, setValueYear] = React.useState();
  const [valueHour, setValueHour] = React.useState();
  const [valueMin, setValueMin] = React.useState();
  const [valueTOD, setValueTOD] = React.useState();

  const [dInput, setDInput] = React.useState();

  return (
    <div>
      <label id="generic-inputs">Generic Inputs</label>
      <p>{valuemonth} / {valueday} / {valueyear}</p>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input.Group trailingVisual={Icons.CalendarIcon}>
          <Input aria-labelledby="generic-inputs" placeholder="MM" value={valuemonth} onChange={setValueMonth} mask="calendar-month" focusNextOnComplete style={{ width: 30 }} />
          <span data-component="input-segment">/</span>
          <Input aria-labelledby="generic-inputs" placeholder="DD" value={valueday} onChange={setValueDay} mask="calendar-day" focusNextOnComplete style={{ width: 30 }} />
          /
          <Input aria-labelledby="generic-inputs" placeholder="YYYY" value={valueyear} onChange={setValueYear} mask="calendar-year" focusNextOnComplete style={{ width: 45 }}/>
          &nbsp;
          <Input aria-labelledby="generic-inputs" placeholder="--" value={valueHour} onChange={setValueHour} mask="time-hour" focusNextOnComplete style={{ width: 28 }}/>
          :
          <Input aria-labelledby="generic-inputs" placeholder="--" value={valueMin} onChange={setValueMin} mask="time-minute" focusNextOnComplete style={{ width: 30 }}/>
          <Input aria-labelledby="generic-inputs" placeholder="AM" value={valueTOD} onChange={setValueTOD} mask="time-tod" focusNextOnComplete style={{ width: 30 }}/>
        </Input.Group>

        <DateInput.New value={dInput} onChange={setDInput} />
        <Input aria-labelledby="generic-inputs" variant="invisible" leadingVisual="TEL" placeholder="111 1111" type="tel" />
      </div>
      <Button>Save</Button>
    </div>
  )
}


export const Number = () => {
  const [value, setValue] = React.useState();
  return (
    <div>
      <label id="number-inputs">Number Inputs</label>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input.Number aria-label="how many" variant="invisible" trailingVisual={Icons.QuestionIcon} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" leadingVisual="$" placeholder="400.00" minValue={-10} formatOptions={{ minimumFractionDigits: 3, maximumFractionDigits: 4 }} />
        <Input.Number aria-labelledby="number-inputs" name="currency-type" variant="invisible" value={value} onChange={setValue} type="currency" placeholder="400.00" />
        <Input.Number aria-labelledby="number-inputs" name="currency-format" variant="invisible" value={value} onChange={setValue} placeholder="Debounced" debounce formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 4 }} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" align="end" trailingVisual="%" placeholder="67" width={80} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" align="end" placeholder="67" width={80} />
      </div>
      <Button>Save {value}</Button>
    </div>
  )
}

export const Loading = () => {
  const [value, setValue] = React.useState();
  return (
    <div>
      <label id="number-inputs">Number Inputs</label>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input aria-label="how many" variant="invisible" trailingVisual={Icons.QuestionIcon} loading value={value} onChange={setValue} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" leadingVisual="$" loading />
      </div>
    </div>
  )
}

export const Groups = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <div>
    <label id="you">Your Details</label>
    <Input.Group aria-labelledby="you">
      <Input placeholder="First"/>
      <Input placeholder="Last" />
      <DateInput />
    </Input.Group>
  </div>
  
  <div>
    <label id="size">Size</label>
    <Input.Group aria-labelledby="size">
      <Input.Number placeholder="Weight" minValue={0} width={100} />
      <Menu arrow>
        <Button tabIndex={0} invisible trailingAction={Icons.DropdownIndicatorIcon}>LBS</Button>
        <Menu.Overlay>
          <Button>LBS</Button>
          <Button>KG</Button>
          <Button>MT</Button>
        </Menu.Overlay>
      </Menu>
    </Input.Group>
  </div>
</div>


export const Plain = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Input variant="plain" />
</div>

export const Playground = (props) => <Input {...props} />