module.exports = function (config) {
  config.set({

    frameworks: ['jasmine'],
    reporters: [
      'progress',
      'coverage',
    ],
    files:[
        'src/**/*.spec.ts'
    ],

    browsers:[
        'Chrome'
    ],

    singleRun: true,
    port: 9876,
    colors: true,

    preprocessors: {
      '**/*.ts': ['webpack','sourcemap']
    },

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html'
      }]
    },

    //Webpack
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
