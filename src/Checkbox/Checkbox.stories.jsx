import React, { useState } from 'react'
import Checkbox from '@harvest-profit/npk/Checkbox';
import { expect } from 'storybook/test';


export default {
  title: 'Input/Checkbox',
  component: Checkbox,
  argTypes: {
    value: {
      control: {
        type: 'radio',
      },
      options: [true, false, 'mixed'],
      table: { defaultValue: { summary: "false" } }
    },
    disabled: {
      type: 'boolean'
    },
    label: {
      type: 'string'
    }
  },
  args: {
    value: null,
    disabled: false
  }
}

export const Default = {
  args: {
    value: null,
    disabled: false
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('checkbox', { name: /Checkbox label/i });
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("data-tour", "Something Random");
  },
  render: ({ value, ...props }) => {
    const [val, setVal] = useState();
    return (
      <Checkbox
        label="Checkbox label"
        labelDescription="Some more content about what the checkbox does"
        value={value === null ? val : value}
        onChange={setVal} {...props}
        data-tour="Something Random"
      />
    )
  }
}

export const Group = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole('checkbox', { name: /First Option/i });
    await expect(input).toBeInTheDocument();
  },
  render: () => {
    const [val1, setVal1] = useState();
    const [val2, setVal2] = useState();
    return (
      <div>
        <h3 id="options-label">Options</h3>
        <div role="group" aria-labelledby="options-label" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox
            label="First Option"
            labelDescription="Always a good choice"
            value={val1}
            onChange={setVal1}
          />
          <Checkbox
            label="Second Option"
            labelDescription="Settle for second if you have to"
            value={val2}
            onChange={setVal2}
          />
        </div>
      </div>
    )
  }
}
