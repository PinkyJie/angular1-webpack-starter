module.exports = function (config) {

    var gulpConfig = require('./gulp.config')();

    config.set({
        basePath: gulpConfig.root,
        frameworks: ['jasmine'],
        exclude: gulpConfig.karma.exclude,
        files: gulpConfig.karma.files,
        preprocessors: gulpConfig.karma.preprocessors,
        reporters: ['progress', 'coverage', 'junit', 'mocha'],
        coverageReporter: gulpConfig.karma.coverage,
        junitReporter: gulpConfig.karma.junit,
        reportSlowerThan: 500,
        browsers: ['chrome']
    });
};
