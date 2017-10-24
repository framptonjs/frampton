const { resolve } = require("path");

module.exports = {

  entry: {
    "html": "./dist/main/index.js"
  },

  output: {
    filename: "[name].js",
    path: resolve("dist/bundles"),
    library: "@frampton/html",
    libraryTarget: "commonjs2"
  },

  resolve: {
    extensions: [ ".js" ]
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules\/(?!@frampton)/,
        loader: "babel-loader"
      }
    ]
  },

  externals : {
    "@frampton/core": {
      commonjs2: "@frampton/core"
    },
    "@frampton/events": {
      commonjs2: "@frampton/events"
    }
  },

  // Source maps support ("inline-source-map" also works)
  devtool: "source-map"
};
