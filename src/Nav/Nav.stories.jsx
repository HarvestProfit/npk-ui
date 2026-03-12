import React from 'react'
import Nav from '@harvest-profit/npk/Nav';
import * as Icons from '@harvest-profit/npk/icons/regular';
import { expect } from 'storybook/test';

export default {
  title: 'Components/Nav',
  component: Nav,
  subcomponents: { Group: Nav.Group, Button: Nav.Button },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'underline'],
      table: { defaultValue: { summary: "underline" } },
      description: "primary, secondary, or underline. primary and secondary are vertical, underline is horizontal"
    }
  },
  args: {
    variant: 'default',
  }
}

export const Primary = {
  args: {
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByTestId('nav-1');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ }) => (
    <Nav variant="primary" data-testid="nav-1" data-tour="Something Random">
      <Nav.Group aria-label="Primary A">
        <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname} chip="10">Active</Nav.Button>
        <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname + '/farm'} chip="10">Inactive</Nav.Button>
        <Nav.Button leadingVisual={<Icons.HomeFeatureIcon />} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
      </Nav.Group>
      <Nav.Group title="Primary B">
        <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname}>Active</Nav.Button>
        <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
      </Nav.Group>
    </Nav>
  )
}

export const Secondary = {
  args: {
    variant: 'secondary',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByTestId('nav-1');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ }) => (
    <Nav variant="secondary" data-testid="nav-1" data-tour="Something Random">
      <Nav.Group title="Secondary A">
        <Nav.Button leadingVisual={Icons.SettingsIcon} href={window.location.pathname} chip="10">Active</Nav.Button>
        <Nav.Button leadingVisual={Icons.SettingsIcon} href={window.location.pathname + '/farm'} chip="10">Inactive</Nav.Button>
        <Nav.Button leadingVisual={<Icons.SettingsIcon />} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
      </Nav.Group>
      <Nav.Group title="Secondary B">
        <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname}>Active</Nav.Button>
        <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
      </Nav.Group>
    </Nav>
  )
}

export const Underline = {
  args: {
    variant: 'underline',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByTestId('nav-1');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ }) => (
    <Nav variant="underline" data-testid="nav-1" data-tour="Something Random">
      <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname} chip="10">Active</Nav.Button>
      <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname + '/farm'} chip="10">Inactive</Nav.Button>
      <Nav.Button leadingVisual={<Icons.HomeFeatureIcon />} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
      <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname}>Active</Nav.Button>
      <Nav.Button leadingVisual={({ active }) => active ? Icons.PdfIcon : Icons.ExcelIcon} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
    </Nav>
  )
}

export const Groups = {
  args: {
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByTestId('nav-1');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ }) => (
    <div>
      <p>Groups are <b>required and only work</b> on vertical navs (primary & secondary variants)</p>
      <Nav variant="primary" data-testid="nav-1" data-tour="Something Random">
        <Nav.Group aria-label="Primary A">
          <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname}>Group without header</Nav.Button>
          <Nav.Button leadingVisual={Icons.HomeFeatureIcon} href={window.location.pathname + '/farm'} chip="10">Inactive</Nav.Button>
          <Nav.Button leadingVisual={<Icons.HomeFeatureIcon />} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
        </Nav.Group>
        <Nav.Group title="Primary B">
          <Nav.Button leadingVisual={Icons.PdfIcon} href="/farm">Group with header</Nav.Button>
          <Nav.Button leadingVisual={Icons.ExcelIcon} href={window.location.pathname + '/farm'}>Inactive</Nav.Button>
        </Nav.Group>
      </Nav>
    </div>
  )
}


export const Loading = () => (
  <div>
    <h3>Underline Loading</h3>
    <Nav variant="underline" data-testid="nav-1" data-tour="Something Random">
      <Nav.Button loading>Active</Nav.Button>
      <Nav.Button loading>Inactive</Nav.Button>
      <Nav.Button loading>Inactive</Nav.Button>
      <Nav.Button loading>Active</Nav.Button>
    </Nav>

    <h3>Secondary Loading</h3>
    <Nav variant="secondary" data-testid="nav-1" data-tour="Something Random">
      <Nav.Group aria-label="Primary A">
        <Nav.Button loading>Active</Nav.Button>
        <Nav.Button loading>Inactive</Nav.Button>
        <Nav.Button loading>Inactive</Nav.Button>
        <Nav.Button loading>Active</Nav.Button>
      </Nav.Group>
    </Nav>
  </div>
)
