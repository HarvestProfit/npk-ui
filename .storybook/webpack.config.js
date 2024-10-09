const path = require('path');

module.exports = async ({ config }) => {
  config.resolve = {
    alias: {
      "@harvest-profit/npk/icons": path.resolve(__dirname, '../tmp/icons/'),
      "@harvest-profit/npk": path.resolve(__dirname, '../src/')
    },
  };

  return config;
};
