module.exports = function (gulp, config, $, args) {

    var browserSync = require('browser-sync');
    var port = process.env.PORT || config.browserSync.defaultPort;

    /**
     * serve the development environment
     * --mock: inject mock files
     * --nosync: do not reload browser
     */
    gulp.task('serve:dev', ['build:dev'], function () {
        startBrowserSync(true);
    });

    /**
     * serve the production environment
     * --mock: inject mock files
     * --nosync: do not reload browser
     */
    gulp.task('serve:prod', ['build:prod'], function () {
        startBrowserSync(false);
    });

    ///////////

    function startBrowserSync(isDev) {
        if (args.nosync || browserSync.active) {
            return;
        }

        config.fn.log('Starting BrowserSync on port ' + port);

        // only watch files for development environment
        var watchedFiles = [].concat(
            config.js.app,
            config.css.singleSource,
            config.html.source,
            config.templateCache.source
        );
        if (args.mock) {
            watchedFiles = watchedFiles.concat(config.js.stubs);
        }
        if (isDev) {
            gulp.watch(watchedFiles, ['build:dev'])
                .on('change', changeEvent);
        }

        var options = {
            proxy: config.browserSync.hostName + ':' + port,
            port: port,
            files: [],
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: config.browserSync.reloadDelay
        };

        browserSync(options);
    }

    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.client.source + ')/');
        config.fn.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

};
