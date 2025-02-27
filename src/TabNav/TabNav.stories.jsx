import React from 'react'
import Card from '@harvest-profit/npk/Card';
import TabNav from '@harvest-profit/npk/TabNav';
import * as Icons from '@harvest-profit/npk/icons/regular';

export default {
  title: 'Components/TabNav',
  component: TabNav
}

export const Default = () => {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
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
    </div>
  )
}

export const WithCard = () => {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Card>
        <Card.Header title="Card Title" variant="plain" />
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
