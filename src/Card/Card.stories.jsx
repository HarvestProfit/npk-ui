import React from 'react'
import Card from '@harvest-profit/npk/Card';
import Button from '@harvest-profit/npk/Button';
import TabNav from '@harvest-profit/npk/TabNav';
import Table from '@harvest-profit/npk/Table';
import * as Icons from '@harvest-profit/npk/icons/regular';
import { expect } from 'storybook/test';

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: { Header: Card.Header, HeaderLeadingActions: Card.HeaderLeadingActions, HeaderTrailingActions: Card.HeaderTrailingActions, Divider: Card.Divider, Footer: Card.Footer, Section: Card.Section },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'muted', 'invisible'],
      table: { defaultValue: { summary: "default" } }
    },
    headerVariant: {
      control: {
        type: 'radio',
      },
      options: ['underlined', 'plain', 'inset'],
      table: { defaultValue: { summary: "underlined" } }
    }
  },
  args: {
    variant: 'default',
    headerVariant: 'underlined'
  }
}

export const Default = {
  args: {
    variant: 'default',
  },
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('card-1');
    await expect(card).toBeInTheDocument();
    await expect(card).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ variant, headerVariant }) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card data-testid="card-1" variant={variant} data-tour="Something Random">
        <Card.Header title="Card Title" variant={headerVariant}>
          <Card.HeaderLeadingActions>
            <Button invisible variant="primary">See More</Button>
          </Card.HeaderLeadingActions>
          <Card.HeaderTrailingActions>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
          </Card.HeaderTrailingActions>
        </Card.Header>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ipsa nesciunt aperiam adipisci, porro quas cumque accusamus. Inventore, nam quos. Quam iusto omnis laudantium amet quaerat sed inventore quos voluptatum.
        </p>

        <Card.Divider />

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ipsa nesciunt aperiam adipisci, porro quas cumque accusamus. Inventore, nam quos. Quam iusto omnis laudantium amet quaerat sed inventore quos voluptatum.
        </p>

        <Card.Footer>
          <Button>Buttons can be in the footer!</Button>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
        </Card.Footer>
      </Card>
    </div>
  )
}

export const Muted = () =>
  <Card variant="muted" block style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
    <span><b>Key</b> Value</span>
    <span><b>Key</b> Value</span>
    <span><b>Key</b> Value</span>
    <span><b>Key</b> Value</span>
    <span><b>Key</b> Value</span>
    <span><b>Key</b> Value</span>
  </Card>

export const InsetForForms = () =>
  <Card>
    <Card.Header variant="plain" title="My Form" />

    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 30 }}>
    <Card>
      <Card.Header variant="inset" title="User" />
      <label>Name</label>
      <input type="text" value="John Doe" />
    </Card>

    <Card>
      <Card.Header variant="inset" title="Company" />
      <label>Name</label>
      <input type="text" value="John Deere" />
    </Card>
    </div>
  </Card>

export const Invisible = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card variant="invisible">
    <Card.Header title="Summary" variant="plain">
      <Card.HeaderTrailingActions>
        <Button invisible icon={Icons.MenuIcon} />
      </Card.HeaderTrailingActions>
    </Card.Header>

    <div style={{ fontSize: 20, fontWeight: 'bold'}}>
      356 total items
    </div>
    <div style={{ marginTop: 6, maxWidth: 250 }}>
      This shows how you can use this card to create summary report cards.
    </div>
  </Card>
</div>

export const Footers = {
  args: {
    variant: 'default',
  },
  play: async ({ canvas }) => {
    const card = canvas.getByTestId('card-1');
    await expect(card).toBeInTheDocument();
    await expect(card).toHaveAttribute("data-tour", "Something Random");
  },
  render:({ variant, headerVariant }) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card data-testid="card-1" variant={variant} data-tour="Something Random">
        <Card.Header title="Card Title" variant={headerVariant}>
          <Card.HeaderLeadingActions>
            <Button invisible variant="primary">See More</Button>
          </Card.HeaderLeadingActions>
          <Card.HeaderTrailingActions>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
          </Card.HeaderTrailingActions>
        </Card.Header>

        <p>
          Card.Footer allows you to create a section to summarize, add additional details to a card, or even add
          actions (like toggling a chart's visuals from line to bar).
        </p>

        <Card.Footer>
          <Button>Buttons can be in the footer!</Button>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
        </Card.Footer>
      </Card>
    </div>
  )
}

export const CardSections = {
  args: {
    variant: 'default',
  },
  render:({ variant, headerVariant }) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card data-testid="card-1" variant={variant} data-tour="Something Random">
        <Card.Header title="Card Title" variant={headerVariant}>
          <Card.HeaderLeadingActions>
            <Button invisible variant="primary">See More</Button>
          </Card.HeaderLeadingActions>
          <Card.HeaderTrailingActions>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
            <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
          </Card.HeaderTrailingActions>
        </Card.Header>

        <Card.Section>
          Card.Section will blend with the header.
        </Card.Section>

        <p>
          Sections describe metadata for the card. To create a separate content section, use the Card.Divider component.
          This will keep your HTML flat.
        </p>

        <Card.Divider />

        <p>
          This shows up as a separate section now thanks to the divider.
        </p>

        <Card.Section>
          Card.Section component will add this section. These are great for including some minor meta data to the card.
        </Card.Section>

        <p>
          Content should still be enclosed in its own content tag (paragraph tag for me!), but it will maintain its gaps
          from its siblings correctly.
        </p>

        <Card.Section>
          Card sections will blend with footers.
        </Card.Section>

        <Card.Footer>
          <Button>Buttons can be in the footer!</Button>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
          <span><b>Key</b> Value</span>
        </Card.Footer>
      </Card>
    </div>
  )
}

export const Large = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Card Title" as="h6" size="lg" variant="plain">
      <Card.HeaderTrailingActions>
        <Button leadingVisual={Icons.ExportIcon}>Export</Button>
        <Button leadingVisual={Icons.AddIcon} variant="primary">Add</Button>
      </Card.HeaderTrailingActions>
    </Card.Header>

    <p>
      The <code>as</code> prop can be used to change the header element. The <code>size</code> prop can be used to change the size of the header.
    </p>
  </Card>
</div>

export const PlainHeader = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Card Title" variant="plain">
      <Card.HeaderLeadingActions>
        <Button invisible variant="primary">See More</Button>
      </Card.HeaderLeadingActions>
      <Card.HeaderTrailingActions>
        <Button leadingVisual={Icons.ExportIcon}>Export</Button>
      </Card.HeaderTrailingActions>
    </Card.Header>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ipsa nesciunt aperiam adipisci, porro quas cumque accusamus. Inventore, nam quos. Quam iusto omnis laudantium amet quaerat sed inventore quos voluptatum.
    </p>
  </Card>
</div>

export const PlainWithTabNav = () => {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card>
        <Card.Header title="Card Title" variant="plain">
          <Card.HeaderLeadingActions>
            <Button invisible variant="primary">See More</Button>
          </Card.HeaderLeadingActions>
          <Card.HeaderTrailingActions>
            <Button leadingVisual={Icons.ExportIcon}>Export</Button>
          </Card.HeaderTrailingActions>
        </Card.Header>
        <TabNav active={activeTab} onChange={setActiveTab}>
          <TabNav.NavItem value="tab1" leadingVisual={Icons.CropPlannerFeatureIcon}>Tab 1</TabNav.NavItem>
          <TabNav.NavItem value="tab2">Tab 2</TabNav.NavItem>
          <TabNav.NavItem value="tab3">Tab 3</TabNav.NavItem>
          <TabNav.NavItem value="tab4">Tab 4</TabNav.NavItem>
          <TabNav.NavItem value="tab5">Tab 5</TabNav.NavItem>
        </TabNav>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ipsa nesciunt aperiam adipisci, porro quas cumque accusamus. Inventore, nam quos. Quam iusto omnis laudantium amet quaerat sed inventore quos voluptatum.
        </p>
      </Card>
    </div>
  )
}

export const MultipleHeaders = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Card Title">
      <Card.HeaderLeadingActions>
        <Button invisible variant="primary">See More</Button>
      </Card.HeaderLeadingActions>
      <Card.HeaderTrailingActions>
        <Button leadingVisual={Icons.ExportIcon}>Export</Button>
      </Card.HeaderTrailingActions>
    </Card.Header>
    <Card.Header title="Second Header" />

    <p>
      I don't think we'd use this but its an option!
    </p>
  </Card>
</div>

export const StickyHeader = () => <div style={{ maxHeight: 100, display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Sticky Card Title" sticky>
      <Card.HeaderLeadingActions>
        <Button invisible variant="primary">See More</Button>
      </Card.HeaderLeadingActions>
      <Card.HeaderTrailingActions>
        <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
        <Button invisible leadingVisual={Icons.ExportIcon}>Export</Button>
      </Card.HeaderTrailingActions>
    </Card.Header>

    <p>
      Hey! This sticky head will only work for the "underlined" variant of the header. 
    </p>

    <Card.Divider />

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ipsa nesciunt aperiam adipisci, porro quas cumque accusamus. Inventore, nam quos. Quam iusto omnis laudantium amet quaerat sed inventore quos voluptatum.
    </p>

    <Table>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith</td>
          <td>25</td>
        </tr>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith</td>
          <td>25</td>
        </tr>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith</td>
          <td>25</td>
        </tr>
      </tbody>
    </Table>



    <Card.Footer>
      <span><b>Key</b> Value</span>
      <span><b>Key</b> Value</span>
      <span><b>Key</b> Value</span>
      <span><b>Key</b> Value</span>
    </Card.Footer>
  </Card>
</div>
