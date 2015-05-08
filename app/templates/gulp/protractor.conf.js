(function () {
    var gulpConfig = require('./gulp.config')();
    var port = process.env.PORT || config.browserSync.defaultPort;

    exports.config = {
        baseUrl: 'http://' + config.browserSync.hostName + ':' + port,
        framework: 'jasmine',
        jasmineNodeOpts: {
            showColors: true,
            defaultTimeoutInterval: 30000
          },
        specs: gulpConfig.protractor.specs,
        suites: gulpConfig.protractor.suites,
        onPrepare: function () {
            browser._ = require(gulpConfig.protractor.helper);
        },
        params: {
            timeout: 10000
        }
    };
});
