const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const SpecReporter = require('jasmine-spec-reporter');

const webpackConfig = require('./webpack.config');
const args = require('yargs').argv;

const e2eBaseFolder = './source/test/e2e';

const config = {
    baseUrl: `http://localhost:${webpackConfig.devServer.port}`,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 90000,
        // remove ugly protractor dot reporter
        print: () => {}
    },
    specs: `${e2eBaseFolder}/specs/*.spec.js`,
    onPrepare: () => {
        // support ES6, need to put this line in onPrepare to make line number
        // in error report correct
        require('babel-core/register'); // eslint-disable-line
        const helper = require('./source/test/e2e/helper'); // eslint-disable-line
        browser._BasePageObject = helper.BasePageObject;
        browser._ = new helper.E2EHelper();
        if (!args.ci) {
            // screenshot reporter
            jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
                dest: `${e2eBaseFolder}/screenshots`,
                filename: 'e2e-report.html',
                captureOnlyFailedSpecs: true,
                reportOnlyFailedSpecs: false,
                pathBuilder: (currentSpec) => {
                    // TODO: can not get browser name due to
                    // https://github.com/mlison/protractor-jasmine2-screenshot-reporter/issues/4
                    return currentSpec.description.replace(/[ :]/g, '-');
                }
            }));
        }
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all',
            displayFailuresSummary: false
        }));
        beforeEach(() => {
            // add custom matchers
            jasmine.addMatchers(helper.customMatchers);
        });
    },
    params: {
        timeout: 10000
    }
};

if (args.ci) {
    // run by sauce lab
    config.baseUrl = 'http://localhost:8080/#';
    config.sauceUser = 'sd4399340';
    config.sauceKey = '5829a37c-41c0-4490-b6c2-061ae4acc5e9';
    // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
    config.multiCapabilities = [
        {
            name: `Chrome (build-${args.buildId})`,
            build: args.buildId,
            browserName: 'chrome',
            platform: 'Windows 7',
            maxDuration: 3600,
            commandTimeout: 600,
            idleTimeout: 1000
        },
        {
            name: `Safari (build-${args.buildId})`,
            build: args.buildId,
            browserName: 'safari',
            platform: 'OS X 10.11',
            maxDuration: 3600,
            commandTimeout: 600,
            idleTimeout: 1000
        },
        {
            name: `IE (build-${args.buildId})`,
            build: args.buildId,
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '11.0',
            maxDuration: 3600,
            commandTimeout: 600,
            idleTimeout: 1000
        },
        {
            name: `iOS (build-${args.buildId})`,
            build: args.buildId,
            browserName: 'iphone',
            platform: 'OS X 10.10',
            version: '9.1',
            deviceName: 'iPhone 5s',
            deviceOrientation: 'portrait',
            maxDuration: 3600,
            commandTimeout: 600,
            idleTimeout: 1000
        },
        {
            name: `Android (build-${args.buildId})`,
            build: args.buildId,
            browserName: 'android',
            platform: 'Linux',
            version: '4.4',
            deviceName: 'Android Emulator',
            deviceOrientation: 'portrait',
            maxDuration: 3600,
            commandTimeout: 600,
            idleTimeout: 1000
        }
    ];
} else {
    // local run
    config.capabilities = {
        browserName: 'chrome'
    };
}

exports.config = config;
