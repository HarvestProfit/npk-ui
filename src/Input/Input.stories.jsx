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
  const [value, setValue] = React.useState();
  return (
    <div>
      <label id="generic-inputs">Generic Inputs</label>
      <p>{value}</p>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input aria-labelledby="generic-inputs"value={value} onChange={setValue} />
        <Input aria-labelledby="generic-inputs" disabled variant="invisible" trailingVisual={Icons.CalendarIcon} />
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
        <Input.Number aria-labelledby="number-inputs" name="currency-format" variant="invisible" value={value} onChange={setValue} placeholder="400.00" formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 4 }} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" align="end" trailingVisual="%" placeholder="67" width={40} />
        <Input.Number aria-labelledby="number-inputs" variant="invisible" align="end" placeholder="67" width={50} formatOptions={{ style: 'percent', maximumFractionDigits: 2 }} />
      </div>
      <Button>Save {value}</Button>
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