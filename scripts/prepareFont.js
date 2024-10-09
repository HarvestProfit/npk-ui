const fs = require('node:fs');

const svgFontOutputFolder = `${__dirname}/../tmp/font`;
const outputFolder = `${__dirname}/../font`;

fs.mkdir(outputFolder, { recursive: true }, (err) => {
  if (err) console.error(err);
});

fs.copyFile(`${svgFontOutputFolder}/npkicons.ttf`, `${outputFolder}/npkicons.ttf`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('TTF Added')
  }
});

const icons = require(`${svgFontOutputFolder}/info.json`);
const ligatures = {};

Object.keys(icons).forEach(iconName => {
  ligatures[iconName] = String.fromCharCode(parseInt(icons[iconName].encodedCode.replace('\\', ''), 16))
});

fs.writeFile(`${outputFolder}/ligatures.json`, JSON.stringify(ligatures), { flag: 'w+' }, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Ligatures Added')
  }
});