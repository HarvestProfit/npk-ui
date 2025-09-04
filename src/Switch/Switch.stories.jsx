import React, { useRef } from 'react'
import Switch from '@harvest-profit/npk/Switch';
import Input from '@harvest-profit/npk/Input';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    children: {
      type: 'string',
      description: 'A label to display next to the switch.',
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'flat'],
      table: { defaultValue: { summary: "default" } }
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: "md" } }
    },
  }
}

export const Default = () => {
  const [isOn, setIsOn] = React.useState(false);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Switch onClick={() => setIsOn(!isOn)} value={isOn}>
          Toggle me!
        </Switch>
        <Switch variant="flat" onClick={() => setIsOn(!isOn)} value={isOn}>
          Flat Toggle
        </Switch>
        <Switch variant="flat" size="sm" onClick={() => setIsOn(!isOn)} value={isOn}>
          Flat Toggle
        </Switch>

        <Switch position="trailing" onClick={() => setIsOn(!isOn)} value={isOn}>
          Toggle on right side
        </Switch>
        <Input placeholder="Type something..." />
      </div>
      <p>The switch is {isOn ? 'ON' : 'OFF'}</p>
    </div>
  );
}
