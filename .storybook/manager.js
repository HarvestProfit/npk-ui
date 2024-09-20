import { addons } from '@storybook/manager-api';
import { STORY_RENDERED } from '@storybook/core-events'
import { create } from '@storybook/theming';

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

// addons.register('TitleAddon', api => {
//   const customTitle = 'Reactstrap';
//   let interval = null;
//   const setTitle = () => {
//     clearTimeout(interval);

//     let storyData = null;
//     try {
//       storyData = api.getCurrentStoryData();
//     } catch (e) { }

//     let title;
//     if (!storyData) {
//       title = customTitle;
//     } else {
//       title = `${storyData.kind} - ${storyData.name} ⋅ ${customTitle}`
//     }

//     if (document.title !== title) {
//       document.title = title;
//     }
//     interval = setTimeout(setTitle, 100);
//   };
//   setTitle();
//   api.on(STORY_RENDERED, story => {
//     setTitle();
//   })
// })
