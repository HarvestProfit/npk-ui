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
    readOnly: {
      type: 'boolean',
      description: "If true, the input will be read only.",
      table: { defaultValue: { summary: "false" } }
    },
    disabled: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    loading: {
      type: 'boolean',
      table: { defaultValue: { summary: "false" } }
    },
    mask: {
      type: 'string | function',
      description: "Can be a prebuilt mask name or A function that returns an object with a mask and formatter function.",
      table: { defaultValue: { summary: "null" } }
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
    readOnly: false,
    loading: false,
    size: 'md',
    align: 'start',
    selectAllOnFocus: true,
    debounce: false,
    mask: null,
  }
}

export const Default = () => (
  <div>
    <label id="generic-inputs">Generic Inputs</label>
    <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Input placeholder="Placeholder" type="text" label="My Input" />
      <Input leadingVisual="TEL" placeholder="111 1111" type="tel" label="Phone"/>
      <Input placeholder="Disabled" type="text" disabled />
      <Input value="Readonly" type="text" readOnly />
    </div>
    <Input value="A longer description of things" label="Notes" type="textarea" rows={4} />
    <br />
    <Button>Save</Button>
  </div>
)

export const Masking = () => {
  const mask = () => {
    return {
      mask: [
        ['-', ({ nextValue, cursorIndex }) => {
          if (nextValue[cursorIndex - 1] === '-') return false;
          return nextValue.match(/\-/g).length < 3;
        }],
        [/\d/, ({ nextValue }) => {
          if (nextValue.replaceAll('-', '').length > 10) return false;
          return true;
        }],
      ],
      formatter: (text) => {
        if (!text) return '';
        const value = text.replaceAll('-', '');
        if (value.length < 10) return '';
        return `${value.substr(0, 3)}-${value.substr(3, 3)}-${value.substr(6, 4)}`;
      }
    }
  }

  return (
    <div>
      <label id="generic-inputs">Custom Phone Number Mask. Only Allows numbers and a certain number of dashes</label>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input leadingVisual="TEL" placeholder="111-111-1111" type="tel" mask={mask} />
      </div>
      <Button>Save</Button>
    </div>
  )
}


export const CustomInputs = () => {
  const [valuemonth, setValueMonth] = React.useState();
  const [valueday, setValueDay] = React.useState();
  const [valueyear, setValueYear] = React.useState();
  const [valueHour, setValueHour] = React.useState();
  const [valueMin, setValueMin] = React.useState();
  const [valueTOD, setValueTOD] = React.useState();

  return (
    <div>
      <label id="generic-inputs">Custom Built Date</label>
      <p>{valuemonth} / {valueday} / {valueyear}</p>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input.Group trailingVisual={Icons.CalendarIcon}>
          <Input aria-labelledby="generic-inputs" placeholder="MM" value={valuemonth} onChange={setValueMonth} mask="calendar-month" focusNextOnComplete style={{ width: 30 }} />
          /
          <Input aria-labelledby="generic-inputs" placeholder="DD" value={valueday} onChange={setValueDay} mask="calendar-day" focusNextOnComplete style={{ width: 30 }} />
          /
          <Input aria-labelledby="generic-inputs" placeholder="YYYY" value={valueyear} onChange={setValueYear} mask="calendar-year" focusNextOnComplete style={{ width: 45 }}/>
          &nbsp;
          <Input aria-labelledby="generic-inputs" placeholder="--" value={valueHour} onChange={setValueHour} mask="time-hour" focusNextOnComplete style={{ width: 28 }}/>
          :
          <Input aria-labelledby="generic-inputs" placeholder="--" value={valueMin} onChange={setValueMin} mask="time-minute" focusNextOnComplete style={{ width: 30 }}/>
          <Input aria-labelledby="generic-inputs" placeholder="AM" value={valueTOD} onChange={setValueTOD} mask="time-tod" focusNextOnComplete style={{ width: 30 }}/>
        </Input.Group>
      </div>
      <Button>Save</Button>
    </div>
  )
}


export const Number = () => {
  const [value, setValue] = React.useState(40.99890123);
  return (
    <div>
      <label id="number-inputs">Number Inputs</label>
      <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Input.Number placeholder="any number" trailingVisual={Icons.QuestionIcon} />
        <Input.Number placeholder="positive integers" formatOptions={{ maximumFractionDigits: 0, minValue: 0 }} />
        <Input.Number placeholder="decimals or integers" formatOptions={{ maximumFractionDigits: 2 }} />
        <Input.Number aria-labelledby="number-inputs" leadingVisual="$" placeholder="400.00" minValue={-10} formatOptions={{ minimumFractionDigits: 3, maximumFractionDigits: 4 }} />
        <Input.Number aria-labelledby="number-inputs" name="currency-type" value={value} onChange={setValue} type="currency" placeholder="400.00" formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }} />
        <Input.Number aria-labelledby="number-inputs" name="currency-format" value={value} onChange={setValue} placeholder="Debounced" debounce formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 4 }} />
        <Input.Number aria-labelledby="number-inputs" align="end" trailingVisual="%" placeholder="67" width={80} />
        <Input.Number aria-labelledby="number-inputs" align="end" placeholder="67" width={80} />
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

export const Groups = () => {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [date, setDate] = React.useState();
  const [weight, setWeight] = React.useState();
  const [unit, setUnit] = React.useState('LBS');
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <div>
        <Input.Group label="Your Details" labelDescription="A description of the input" info="You can quickly tab through each segment of the input">
          <Input placeholder="First" value={firstName} onChange={setFirstName} />
          <Input placeholder="Last" value={lastName} onChange={setLastName} />
          <DateInput value={date} onChange={setDate} />
        </Input.Group>
      </div>
      
      <div>
        <Input.Group label={<><h5>Size</h5><p>Labels can be customized as well!</p></>}>
          <Input.Number placeholder="Weight" minValue={0} width={100} value={weight} onChange={setWeight} />
          <Menu arrow>
            <Button tabIndex={0} invisible trailingAction={Icons.DropdownIndicatorIcon}>{unit}</Button>
            <Menu.Overlay>
              <Button onClick={() => setUnit('LBS')}>LBS</Button>
              <Button onClick={() => setUnit('KG')}>KG</Button>
              <Button onClick={() => setUnit('MT')}>MT</Button>
            </Menu.Overlay>
          </Menu>
        </Input.Group>
      </div>
    </div>
  )
}


export const Plain = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Input variant="plain" />
</div>

export const Playground = (props) => <Input {...props} />