import { themes, create } from '@storybook/theming';
import '../static/styles/dashboard/index.scss';

const lightTheme = create({
  ...themes.normal,
  brandTitle: 'NPK UI',
  brandUrl: 'https://github.com/HarvestProfit/npk-ui',
  brandImage: 'logo.svg',
  brandTarget: '_self',
});

const darkTheme = create({
  ...themes.dark,
  brandTitle: 'NPK UI',
  brandUrl: 'https://github.com/HarvestProfit/npk-ui',
  brandImage: 'logo-darkmode.svg',
  brandTarget: '_self',
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      date: /Date$/
    },
  },
  options: {
    storySort: {
      order: ['Home', ['Installation', 'GitHub', 'Upgrading', 'Themes'], '*']
    }
  },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  darkMode: {
    stylePreview: true,
    // Override the default dark theme
    dark: darkTheme,
    // Override the default light theme
    light: lightTheme
  }
}
export const tags = ['autodocs'];
