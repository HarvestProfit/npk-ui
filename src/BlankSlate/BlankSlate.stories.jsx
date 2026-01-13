import React from 'react'
import BlankSlate from '@harvest-profit/npk/BlankSlate';
import Button from '@harvest-profit/npk/Button';
import { NoResultsIcon, GrainBinsIcon } from '@harvest-profit/npk/icons/large';
import { expect } from 'storybook/test';


export default {
  title: 'Components/BlankSlate',
  component: BlankSlate,
  subcomponents: { Description: BlankSlate.Description, Actions: BlankSlate.Actions, Visual: BlankSlate.Visual },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['normal', 'border'],
      table: { defaultValue: { summary: "normal" } }
    },
    title: {
      type: 'string'
    }
  },
  args: {
    variant: 'normal'
  }
}

export const Default = {
  args: {
    title: 'Nothing Found',
    variant: 'border',
  },
  play: async ({ canvas }) => {
    const blankSlate = canvas.getByTestId('blank-1');
    await expect(blankSlate).toBeInTheDocument();
    await expect(blankSlate).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ variant, title }) => (
    <BlankSlate title={title} data-testid="blank-1" variant={variant} data-tour="Something Random">
      <BlankSlate.Description>
        More details as to why this is blank. Could be a good opportunity to
        tell the user a bit more about how the page works. Additionally, you can
        use this with the {'<BlankSlate.Actions>'} component to create a trigger
        to start a feature tour or to create the first item on the page.
      </BlankSlate.Description>
      <BlankSlate.Actions>
        <Button variant="primary">Let's get started!</Button><Button>Dismiss</Button>
      </BlankSlate.Actions>
    </BlankSlate>
  )
}

export const Border = () =>
  <BlankSlate title="I have a border!" variant="border">
    <BlankSlate.Description>
      A bordered blank slate usually will look better if it is replacing a single card component, or if
      there are more than one blank slates on the page. If there are not very many components on the screen,
      the normal blank slate will usually work better.
    </BlankSlate.Description>
    <BlankSlate.Actions>
      <Button variant="primary">Let's get started!</Button>
    </BlankSlate.Actions>
  </BlankSlate>

export const Normal = () =>
  <BlankSlate title="I have no border!" variant="normal">
    <BlankSlate.Description>
      If there are not very many components on the screen, the normal blank slate will usually work better.
      Like for a "no results found" state!
    </BlankSlate.Description>
    <BlankSlate.Actions>
      <Button variant="primary">Lets Go!</Button>
    </BlankSlate.Actions>
  </BlankSlate>

export const Visuals = () =>
  <BlankSlate title="No Results Found" variant="normal">
    <BlankSlate.Visual>
      <NoResultsIcon />
    </BlankSlate.Visual>
    <BlankSlate.Description>
      If there are not very many components on the screen, the normal blank slate will usually work better.
      Like for a "no results found" state!
    </BlankSlate.Description>
    <BlankSlate.Actions>
      <Button>Clear Filter</Button>
    </BlankSlate.Actions>
  </BlankSlate>
