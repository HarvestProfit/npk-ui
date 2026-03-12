import React from 'react'
import Avatar from '@harvest-profit/npk/Avatar';
import Menu from '@harvest-profit/npk/Menu';
import Button from '@harvest-profit/npk/Button';
import * as Icons from '@harvest-profit/npk/icons/regular';

export default {
  title: 'Components/Buttons/Avatar',
  component: Avatar,
  argTypes: {
    as: {
      type: 'string',
      description: 'The html tag or component to be used.',
      table: { defaultValue: { summary: "<button>" } }
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "md" } }
    },
    children: {
      type: 'string',
    },
    'aria-label': {
      type: 'string',
      description: 'Used to set a tooltip on the button. You can also use aria-describedby to link to a tooltip.',
    }
  },
  args: {
    as: 'button',
    children: 'JD',
    size: 'md',
    'aria-label': 'John Doe'
  }
}

export const Default = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Menu>
    <Avatar aria-label="Open user navigation menu">JD</Avatar>
    <Menu.Overlay>
      <Menu.Header>
        <Avatar size="sm" style={{ marginTop: 10 }}>JD</Avatar>
        <div style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 8 }}>
          <h5 style={{ fontSize: 14, margin: 0 }}>John Doe</h5>
          <h6 style={{ fontSize: 12, margin: 0, fontWeight: 'normal' }}>johndoe@example.com</h6>
        </div>
      </Menu.Header>
      <Button leadingVisual={Icons.ProfileIcon}>Profile</Button>
      <Button leadingVisual={Icons.NotificationsIcon}>Notifications</Button>
      <Menu.Divider />
      <Button leadingVisual={Icons.CredentialsIcon}>Password</Button>
      <Button leadingVisual={Icons.SessionsIcon}>Sessions</Button>
      <Menu.Divider />
      <Button leadingVisual={Icons.LogoutIcon}>Log Out</Button>
    </Menu.Overlay>
  </Menu>
</div>

export const Large = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Avatar aria-label="Open user navigation menu" size="lg">JD</Avatar>
  <Avatar aria-label="Using an image tag" size="lg"><img src="https://i.pravatar.cc/300" /></Avatar>
</div>

export const Small = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Avatar aria-label="Open user navigation menu" size="sm">JD</Avatar>
  <Avatar aria-label="Using an image tag" size="sm"><img src="https://i.pravatar.cc/300" /></Avatar>
</div>

export const Loading = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Avatar aria-label="Open user navigation menu" loading>JD</Avatar>
  <Avatar aria-label="Using an image tag" size="sm" loading></Avatar>
</div>

export const Colors = () => <div>
  <p>Colors are chosen based on the first letter provided</p>
  <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    <Avatar aria-label="Open user navigation menu">AJ</Avatar>
    <Avatar aria-label="Open user navigation menu">LD</Avatar>
    <Avatar aria-label="Open user navigation menu">OS</Avatar>
    <Avatar aria-label="Open user navigation menu">ST</Avatar>
    <Avatar aria-label="Open user navigation menu">ZW</Avatar>
    <Avatar aria-label="Open user navigation menu" loading>ZW</Avatar>
  </div>
</div>

export const Playground = (props) => <Avatar {...props} />
