const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [
    require('postcss-nesting'),
    postcssPresetEnv({ stage: 3 }),
  ]
}

module.exports = config