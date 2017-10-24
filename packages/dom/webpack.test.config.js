const { resolve } = require('path');

module.exports = {

  entry: {
    'html.spec': './dist/tests/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules\/(?!@frampton)/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: [ '.js' ]
  }
};
