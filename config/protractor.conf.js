const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

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
    defaultTimeoutInterval: 30000,
    print () {}
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }

};
