Error.stackTraceLimit = Infinity;

require('core-js/client/shim');
require('reflect-metadata');

require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be a function/object with file names as keys.
 using that regex we are saying look in client/app and find
 any file that ends with '.spec.ts' and get its path. By passing in true
 we say do this recursively
 */
var testsContext = require.context('../specs', true, /\.spec\.ts/);
var componentsContext = require.context('../src/components/multi-picker', true, /multi-picker\.ts/);
var utilsContext = require.context('../src', true, /util\.ts/);


// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
testsContext.keys().forEach(testsContext);
componentsContext.keys().forEach(componentsContext);
utilsContext.keys().forEach(utilsContext);

// Select BrowserDomAdapter.
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
// Somewhere in the test setup
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());