'use strict';

const Jasmine = require('jasmine');
const TerminalReporter = require('jasmine-terminal-reporter');
const reporters = require('jasmine-reporters');

const jasmine = new Jasmine();
const verbose = process.env.VERBOSE || false;
const showColours = true;
const junitOutput = process.env.JUNIT_OUTPUT || false;

jasmine.loadConfigFile('spec/test-config.json');

jasmine.randomizeTests(true);
jasmine.showColors(showColours);

jasmine.addReporter(new TerminalReporter({
  isVerbose: verbose,
  showColors: showColours
}));

if (junitOutput) {
  jasmine.addReporter(new reporters.JUnitXmlReporter({
    savePath: 'reports/jasmine/',
    consolidateAll: true,
    filePrefix: 'junit'
  }));
}

// Forces tests to return 1 on test failure
jasmine.onComplete(passed => {
  if (!passed) {
    process.exit(1);
  }
});

jasmine.execute();