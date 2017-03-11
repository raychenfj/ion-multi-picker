var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        reporters: [
            'progress',
            'coverage',
        ],
        files: [
            { pattern: './karma-shim.js', watched: false }
        ],

        browsers: [
            'PhantomJS'
        ],

        singleRun: true,
        port: 9876,
        colors: true,

        preprocessors: {
            './karma-shim.js': ['webpack', 'sourcemap']
        },

        // Configure code coverage reporter
        coverageReporter: {
            dir: '../coverage/',
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'json',
                dir: '../coverage',
                subdir: 'json',
                file: 'coverage-final.json'
            }]
        },

        //Webpack
        webpack: require('./webpack.config'),
        webpackMiddleware: {
            noInfo: 'errors-only'
        }
    });
};
