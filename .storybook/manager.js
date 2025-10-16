import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'NPK UI',
  brandUrl: 'https://github.com/HarvestProfit/npk-ui',
  brandImage: 'logo.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme
});
