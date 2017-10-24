module.exports = function(config) {
  config.set({
    frameworks: [ 'mocha' ],

    browsers: [
      'PhantomJS'
    ],

    files: [
      './dist/bundles/dom.spec.js'
    ],

    singleRun: true,

    plugins: [
      'karma-mocha',
      'karma-phantomjs-launcher'
    ],

    //logLevel: config.LOG_DEBUG,

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  })
}