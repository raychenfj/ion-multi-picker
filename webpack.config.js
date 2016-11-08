'use strict';

/**
 * This configuration file is used for karma test
 */

// Modules
var webpack = require('webpack');

module.exports = function makeWebpackConfig() {
  var config = {};
  config.entry = {};

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = {};

  config.resolve = {
    // Add `.ts` and `.tsx` as a resolvable extension. 
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  };

  config.module = {
    preLoaders: [],
    loaders: [{
      // ts-loader
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['babel','ts-loader'],
    }]
  };

  config.stats = {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  };

  config.devtool = 'inline-source-map';

  return config;
}();
