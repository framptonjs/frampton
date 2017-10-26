const { resolve } = require('path');

module.exports = {

  entry: {
    'file.spec': './dist/tests/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
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
