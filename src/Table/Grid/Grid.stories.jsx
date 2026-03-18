import React from 'react'
import Table from '@harvest-profit/npk/Table';
import { useState } from 'react';

export default {
  title: 'Components/Table/Grid',
  component: Table,
  argTypes: {
    role: {
      control: {
        type: 'radio',
      },
      options: ['grid'],
      table: { defaultValue: { summary: "grid" } }
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['zebra', 'plain'],
      table: { defaultValue: { summary: "zebra" } }
    }
  },
  args: {
    role: 'grid',
  }
}

export const Grid = () => {
  const yields = [1, 2, 3, 4, 5, 6, 7, 8];
  const prices = [1, 2, 3, 4, 5, 6, 7, 8];
  const color = (value) => {
    if (value > 45) return 'really-positive';
    if (value > 25) return 'positive';
    if (value < 5) return 'really-negative';
    if (value < 15) return 'negative';
    return 'neutral';
  }
  const [focusedColumnIndex, setFocusedColumnIndex] = useState(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState(null);
  return (
    <Table role="grid" aria-rowcount="5" variant="">
      <caption data-align="bottom">Profit Per Acre</caption>
      <thead>
        <tr aria-hidden="true">
          <th />
          <th />
          <th colSpan={yields.length + 2}><span>Yield</span></th>
        </tr>
        <tr>
          <th style={{ width: 30 }}></th>
          <th style={{ width: 40 }}></th>
          {yields.map((y, index) => (
            <th key={y} data-type="number" aria-label={`Yield ${y}`} data-column-focused={focusedColumnIndex === index}>{y}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr aria-hidden="true">
          <th rowSpan={prices.length + 1}><span>Price</span></th>
        </tr>
        {prices.map((price, index) => (
          <tr key={price}>
            <th scope="row" role="rowheader" aria-label={`$${price} price`} data-type="number" data-column-focused={focusedRowIndex === index}>${price}</th>
            {yields.map((y, indexYield) => (
              <td
                key={y}
                data-type="number"
                data-color={color(y * price)}
                data-column-focused={focusedRowIndex === index || focusedColumnIndex === indexYield}
                onMouseOver={() => {
                  setFocusedRowIndex(index);
                  setFocusedColumnIndex(indexYield);
                }}
              >${y * price}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
