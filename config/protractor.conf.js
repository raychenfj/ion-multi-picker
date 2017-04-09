//jshint strict: false
exports.config = {
  directConnect: true,

  allScriptsTimeout: 11000,

  specs: [
    '../test/**/*.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8100/',

  framework: 'jasmine',
  useAllAngular2AppRoots: true,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
