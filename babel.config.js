module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.22",
        "modules": false
      }
    ],
    "@babel/preset-react"
  ];

  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from"
  ];

  if (process.env["NODE_ENV"] === "production") {
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return {
    presets,
    plugins
  };
}