const { resolve } = require('path');

module.exports = {

  entry: {
    'core': './dist/main/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
    library: '@frampton/core',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: [ '.js' ]
  },

  // Source maps support ("inline-source-map" also works)
  devtool: "source-map"
};
