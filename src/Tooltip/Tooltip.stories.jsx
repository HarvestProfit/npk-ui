import React, { useRef } from 'react'
import Tooltip from '@harvest-profit/npk/Tooltip';
import Button from '@harvest-profit/npk/Button';
import Menu from '@harvest-profit/npk/Menu';
import * as Icons from '@harvest-profit/npk/icons/regular';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<div>" } }
    },
    id: {
      type: 'string',
      description: 'The tooltip id that matches a target element\'s aria-describedby attribute.',
    },
    targetRef: {
      type: 'ref',
      description: 'The target element ref to attach the tooltip to. Optional if you use the describedby/id approach.',
    },
    children: {
      type: 'string',
    }
  },
  args: {
    as: 'div',
    children: 'Example of an application wide alert'
  }
}

export const Default = () => (
  <div>
    <button aria-describedby='tooltip-id'>My Button</button>
    <Tooltip id="tooltip-id">
      Here's some extra info! It can be a longer message that wraps onto multiple lines if needed.
    </Tooltip>
    <h4>All Icon buttons should have one. Just provide the <code>aria-label="my tooltip text"</code> prop.</h4>
    <Button icon={Icons.EditIcon} aria-label="Edit Something" />

    <br />
    <br />

    <Menu>
      <Button aria-label="Open the menu and hide the tooltip">Open Menu</Button>
      <Menu.Overlay>
        <Button>Menu Item</Button>
      </Menu.Overlay>
    </Menu>
  </div>
);

export const WithRef = () => {
  const buttonRef = useRef();
  return (
    <div>
      <h4>All buttons should have one</h4>
      <button ref={buttonRef}>My Button</button>
      <Tooltip targetRef={buttonRef}>
        Here's some extra info!
      </Tooltip>
    </div>
  )
}

export const TextBlock = () => (
  <p style={{ width: 200 }}>
    something to <span aria-describedby='tooltip-textblock-id' style={{ textDecoration: 'underline' }}>explain</span>. This works when you have a large multilined block.
    <Tooltip id="tooltip-textblock-id">
      Here's some extra info!
    </Tooltip>
  </p>
);