const path = require('path');

module.exports = async ({ config }) => {
  config.resolve = {
    alias: {
      "@harvest-profit/npk": path.resolve(__dirname, '../src/')
    },
  };

  // This modifies the existing image rule to exclude `.svg` files
  // since we handle those with `@svgr/webpack`.
  const imageRule = config.module.rules.find((rule) => {
    if (typeof rule !== 'string' && rule.test instanceof RegExp) {
      return rule.test.test('.svg')
    }
  })
  if (typeof imageRule !== 'string') {
    imageRule.exclude = /\.svg$/
  }
  // add SVGR instead
  config.module.rules.push({
    test: /\.svg$/i,
    use: [{ loader: '@svgr/webpack', options: { icon: true } }],
  });

  return config;
};
