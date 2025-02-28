import React from 'react'
import Card from '@harvest-profit/npk/Card';
import Button from '@harvest-profit/npk/Button';
import TabNav from '@harvest-profit/npk/TabNav';
import * as Icons from '@harvest-profit/npk/icons/regular';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'primary', 'danger'],
      table: { defaultValue: { summary: "default" } }
    }
  },
  args: {
    variant: 'default',
  }
}

export const Default = () => <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Card>
    <Card.Header title="Card Title">
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