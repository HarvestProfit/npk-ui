import React from 'react';
import { themes, create } from 'storybook/theming';
import '../static/preview-styles.scss';
import { ThemeContextProvider } from '../src/ThemeContext';

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

export default {
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        date: /Date$/
      },
    },

    options: {
      storySort: {
        order: [
          'Overview',
          'Components',
          'Loading',
          '*',
          'WIP'
        ]
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
    },

    docs: {
      codePanel: true
    }
  },
  decorators: [
    (Story, { id }) => {
      return (
        <div>
          <div id={`${id}_prependRoot`} />
          <ThemeContextProvider config={{ prependRootId: `${id}_prependRoot`, appendRootId: `${id}_appendRoot` }}>
            <Story />
          </ThemeContextProvider>
          <div id={`${id}_appendRoot`} />
        </div>
      )
    },
  ]
}
