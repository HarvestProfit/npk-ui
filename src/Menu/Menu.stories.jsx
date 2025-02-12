import React, { useState } from 'react'
import Button from '@harvest-profit/npk/Button';
import Menu from '@harvest-profit/npk/Menu';
import * as Icons from '@harvest-profit/npk/icons/regular';

export default {
  title: 'Components/Menus',
  component: Menu,
  argTypes: {
    placement: {
      options: ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "bottom-start" } },
      description: "Placement of the menu"
    },
    variant: {
      options: ['dialog', 'menu', 'select'],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: "dialog" } },
      description: "Type of menu"
    },
    autoDismiss: {
      options: [true, false, 'menu'],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: true } },
      description: "If the menu dismisses on click. 'menu' will dismiss just the current menu."
    },
    arrow: {
      options: [true, false],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: false } },
      description: "Show an arrow on the menu"
    }
  },
  args: {
    placement: 'bottom-start',
  }
}

export const BasicDialog = (props) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
  <Menu  variant="dialog" {...props}>
    <Button aria-label="This opens a menu" leadingVisual={Icons.AddIcon} trailingAction={Icons.DropdownIndicatorIcon} variant="primary">Add</Button>
    <Menu.Overlay>
      <Menu.Button>Email</Menu.Button>
      <Menu.Button aria-label="Create a new event!">Event</Menu.Button>
      <Menu.Divider />
      <Menu.Button>Contact</Menu.Button>
      <Menu.Button>Task</Menu.Button>
    </Menu.Overlay>
  </Menu>
</div>

export const BasicMenu = (props) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
    <Menu variant="menu" {...props}>
      <Button aria-label="This opens a menu" icon={Icons.MenuIcon}></Button>
      <Menu.Overlay>
        <Menu.Button>Edit</Menu.Button>
        <Menu.Button>Copy</Menu.Button>
        <Menu.Divider />
        <Menu.Button>Delete</Menu.Button>
      </Menu.Overlay>
    </Menu>
  </div>
)

export const BasicSelect = (props) => {
  const [selected, setSelected] = useState(1)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <Menu variant="select" {...props}>
        <Button trailingAction={Icons.DropdownIndicatorIcon}>Select</Button>
        <Menu.Overlay>
          <Menu.Section>Section</Menu.Section>
          <Menu.Button selected={selected === 1} onClick={() => setSelected(1)}>Item 1</Menu.Button>
          <Menu.Button selected={selected === 2} onClick={() => setSelected(2)}>Item 2</Menu.Button>
          <Menu.Section>Section</Menu.Section>
          <Menu.Button selected={selected === 3} onClick={() => setSelected(3)}>Item 3</Menu.Button>
          <Menu.Button selected={selected === 4} onClick={() => setSelected(4)}>Item 4</Menu.Button>
        </Menu.Overlay>
      </Menu>
    </div>
  )
}

export const SubMenus = (props) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
  <Menu {...props}>
    <Button trailingAction={Icons.DropdownIndicatorIcon}>Actions</Button>
    <Menu.Overlay>
      <Menu.Button leadingVisual={Icons.CopyIcon}>Copy</Menu.Button>
      <Menu.Button leadingVisual={Icons.EditIcon}>Edit</Menu.Button>
      <Menu.Divider />
      <Menu placement="right-start">
        <Menu.Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dismiss All</Menu.Button>
        <Menu.Overlay>
          <Menu.Button>Excel</Menu.Button>
          <Menu.Button>PDF</Menu.Button>
        </Menu.Overlay>
      </Menu>
      <Menu placement="right-start" autoDismiss="menu">
        <Menu.Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dismiss SubMenu</Menu.Button>
        <Menu.Overlay>
          <Menu.Button>Excel</Menu.Button>
          <Menu.Button>PDF</Menu.Button>
        </Menu.Overlay>
      </Menu>
      <Menu.Divider />
      <Menu.Button leadingVisual={Icons.DeleteIcon} variant="danger">Delete Something</Menu.Button>
    </Menu.Overlay>
  </Menu>
</div>;

export const CustomMenu = (props) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
    <Menu arrow {...props}>
      <Button trailingAction={Icons.DropdownIndicatorIcon}>Show Menu</Button>
      <Menu.Overlay>
        <h3>Some random content</h3>
        <p>This is just some random content to show that you can do this.</p>
      </Menu.Overlay>
    </Menu>
  </div>
)