module.exports = function (gulp, config, $, args) {

    // Run unit test once
    gulp.task('test:unit', function (done) {
        startUnitTests(true, done);
    });

    // Run unit test and watch for file changes then re-run tests
    gulp.task('test:tdd', function (done) {
        startUnitTests(false , done);
    });

    // Download web driver if it's required
    /* jshint camelcase: false */
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    /* jshint camelcase: false */
    gulp.task('webdriverUpdate', webdriverStandalone);

    // Run e2e test
    gulp.task('test:e2e', ['webdriverUpdate'], function (done) {
        var protractor = require('gulp-protractor').protractor;

        return gulp
            .src(config.protractor.specs)
            .pipe(protractor({
                configFile: __dirname + '../protractor.config.js'
            }))
            .on('error', function(e) { throw e; });
    });

    /////////////

    function startUnitTests(singleRun, done) {
        var child;
        var excludeFiles = [];
        var fork = require('child_process').fork;
        var karma = require('karma').server;

        if (singleRun) {
            karma.start({
                configFile: __dirname + '../karma.conf.js',
                exclude: excludeFiles,
                singleRun: !!singleRun
            }, karmaCompleted);
        } else {
            // use phantomjs when auto-run tests
            karma.start({
                configFile: __dirname + '../karma.conf.js',
                exclude: excludeFiles,
                singleRun: !!singleRun,
                browser: ['phantomjs']
            }, karmaCompleted);
        }

        ////////////////

        function karmaCompleted(karmaResult) {
            config.fn.log('Karma completed');
            if (child) {
                config.fn.log('shutting down the child process');
                child.kill();
            }
            if (karmaResult === 1) {
                done('karma: tests failed with code ' + karmaResult);
            } else {
                done();
            }
        }
    }

};
