const { resolve } = require('path');

module.exports = {

  entry: {
    'example': './examples/example.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('examples')
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
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
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map'
};
