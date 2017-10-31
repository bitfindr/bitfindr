var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',
  suites: {
    initial: './e2e/app.e2e-spec.ts'
  },
  // Reference:
  // https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
  capabilities: {
    platformName: 'android',
    platformVersion: '7.0',
    deviceName: 'Android Device',
    browserName: '',
    autoWebview: true,
    autoGrantPermissions: true,
    noReset: true,
    orientation: 'PORTRAIT',
    fullReset: false,
    nativeWebScreenshot: true,
    app: __dirname + '/platforms/android/build/outputs/apk/android-debug.apk'
  },
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 200 * 60 * 10, // 200sec
    print: function () { }
  },
  allScriptsTimeout: 200 * 60 * 10, // 200sec,
  baseUrl: 'http://10.0.2.2:8000',
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  // configuring wd in onPrepare wdBridge helps to bridge wd driver with other
  // selenium clients See https://github.com/sebv/wd-bridge/blob/master/README.md
  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    protractor.browser.ignoreSynchronization = true;
    wdBridge.initFromProtractor(exports.config);
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }));
  }
};
