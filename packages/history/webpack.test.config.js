const { resolve } = require('path');

module.exports = {

  entry: {
    'history.spec': './dist/tests/index.js'
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
        exclude: /node_modules/,
        exclude: /node_modules\/(?!@frampton)/,
        loader: 'babel-loader'
      }
    ]
  },
};
