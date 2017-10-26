const { resolve } = require('path');

module.exports = {

  entry: {
    'dom': './dist/main/index.js',
    'dom.spec': './dist/tests/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
    library: '@frampton/dom',
    libraryTarget: 'commonjs2'
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

  externals: {
    "@frampton/core": {
      commonjs2: "@frampton/core"
    }
  },

  resolve: {
    extensions: [ '.js' ]
  },

  // Source maps support ("inline-source-map" also works)
  devtool: "source-map"
};
