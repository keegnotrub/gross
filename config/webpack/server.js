const environment = require("./environment");
const merge = require("webpack-merge");

const serverEnvironment = merge(environment.toWebpackConfig(), {
  target: "node",
  entry: "./app/javascript/packs/react-views.js",
  output: {
    filename: "react-views-ssr.js",
    path: environment.config.output.path,
    libraryTarget: "commonjs2"
  },
});

serverEnvironment.plugins = serverEnvironment.plugins
  .filter(plugin => plugin.constructor.name !== "WebpackAssetsManifest")

module.exports = serverEnvironment
