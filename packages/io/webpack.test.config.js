const { resolve } = require('path');

module.exports = {

  entry: {
    'io.spec': './testing/tests/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('testing/bundles'),
  },

  resolve: {
    extensions: [ '.js' ]
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules\/(?!@frampton)/,
        loader: "babel-loader"
      }
    ]
  }
};
