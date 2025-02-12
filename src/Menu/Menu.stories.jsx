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
      <Button>Email</Button>
      <Button aria-label="Create a new event!">Event</Button>
      <Menu.Divider />
      <Button>Contact</Button>
      <Button variant="primary" align="center" invisible={false}>Custom Button</Button>
    </Menu.Overlay>
  </Menu>
</div>

export const BasicMenu = (props) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
    <Menu variant="menu" {...props}>
      <Button aria-label="This opens a menu" icon={Icons.MenuIcon}></Button>
      <Menu.Overlay>
        <Button>Edit</Button>
        <Button>Copy</Button>
        <Menu.Divider />
        <Button>Delete</Button>
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
          <Button selected={selected === 1} onClick={() => setSelected(1)}>Item 1</Button>
          <Button selected={selected === 2} onClick={() => setSelected(2)}>Item 2</Button>
          <Menu.Section>Section</Menu.Section>
          <Button selected={selected === 3} onClick={() => setSelected(3)}>Item 3</Button>
          <Button selectedIcon={Icons.LogoIcon} selected={selected === 4} onClick={() => setSelected(4)}>Item 4</Button>
        </Menu.Overlay>
      </Menu>
    </div>
  )
}

export const SubMenus = (props) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
  <Menu variant="dialog" {...props}>
    <Button trailingAction={Icons.DropdownIndicatorIcon}>Actions</Button>
    <Menu.Overlay>
      <Button leadingVisual={Icons.CopyIcon}>Copy</Button>
      <Button leadingVisual={Icons.EditIcon}>Edit</Button>
      <Menu.Divider />
      <Menu placement="right-start">
        <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dismiss All</Button>
        <Menu.Overlay>
          <Button>Excel</Button>
          <Button>PDF</Button>
        </Menu.Overlay>
      </Menu>
      <Menu autoDismiss="menu">
        <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Dismiss SubMenu</Button>
        <Menu.Overlay>
          <Button>Excel</Button>
          <Menu autoDismiss="menu">
            <Button leadingVisual={Icons.ExportIcon} trailingAction={Icons.DropdownIndicatorIcon}>Deeper</Button>
            <Menu.Overlay>
              <Button>Excel</Button>
              <Button>PDF</Button>
            </Menu.Overlay>
          </Menu>
        </Menu.Overlay>
      </Menu>
      <Menu.Divider />
      <Menu variant="select">
        <Button trailingAction={Icons.DropdownIndicatorIcon}>Select</Button>
        <Menu.Overlay>
          <Button selected>Item 1</Button>
          <Button>Item 2</Button>
          <Menu.Section>Section</Menu.Section>
          <Button>Item 3</Button>
          <Button>Item 4</Button>
        </Menu.Overlay>
      </Menu>
      <Button leadingVisual={Icons.DeleteIcon} variant="danger">Delete Something</Button>
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