const { resolve } = require('path');

module.exports = {

  entry: {
    'history': './dist/main/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
    library: '@frampton/history',
    libraryTarget: 'commonjs2'
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

  externals : {
    '@frampton/core': {
      commonjs2: "@frampton/core"
    },
    '@frampton/dom': {
      commonjs2: "@frampton/dom"
    },
    '@frampton/events': {
      commonjs2: "@frampton/events"
    }
  },

  resolve: {
    extensions: [ '.js' ]
  },

  // Source maps support ("inline-source-map" also works)
  devtool: "source-map"
};
