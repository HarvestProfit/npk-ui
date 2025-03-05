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

  if (process.env["BUILD_ENV"] === "release") {
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return {
    presets,
    plugins,
    ignore: [
      '**/__tests__',
      '**/*.spec.js',
      '**/*.test.js',
      '**/__snapshots__',
      '**/*.stories.js',
      '**/*.stories.jsx',
      '**/*.mdx'
    ]
  };
}