//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'test/**/e2e.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:8100/',

  framework: 'jasmine',
  useAllAngular2AppRoots: true,
  // seleniumAddress: 'http://localhost:8100',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
