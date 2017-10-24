const { resolve } = require("path");

module.exports = {

  entry: {
    "events.spec": "./dist/tests/index.js"
  },

  output: {
    filename: "[name].js",
    path: resolve("dist/bundles"),
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    extensions: [ ".js" ]
  }
};
