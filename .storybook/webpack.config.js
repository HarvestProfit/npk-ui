const path = require('path');

module.exports = async ({ config }) => {
  config.resolve = {
    alias: {
      "@harvest-profit/npk": path.resolve(__dirname, '../src/')
    },
  };

  return config;
};
