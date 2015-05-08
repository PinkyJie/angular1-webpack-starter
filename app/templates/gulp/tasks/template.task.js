module.exports = function (gulp, config, $, args) {

    var merge = require('merge-stream');

    // Compile jade templates to html files
    gulp.task('jade', ['clean:html'], function () {
        config.fn.log('Compiling jade templates to html files');

        var indexStream = jade(config.html.source, config.build.dev);
        var templateStream = jade(config.templateCache.source, config.build.dev + 'static');

        return merge(indexStream, templateStream);
    });

    // Inject all js/css files into the index.html file
    gulp.task('inject:js:css', function () {
        config.fn.log('Wire up css into the html, after files are ready');

        // Only include mock files if --mock flag is enabled
        var js = args.mock ? [].concat(config.js.app, config.js.stubs) : config.js.app;

        return gulp
            .src(config.html.target)
            .pipe(config.fn.inject(config.css.target))
            .pipe(config.fn.inject(js, '', config.js.order))
            .pipe(gulp.dest(config.build.dev));
    });

    // Inject all the bower dependencies
    gulp.task('inject:bower', function () {
        config.fn.log('Wiring the bower dependencies into the html');

        var wiredep = require('wiredep').stream;
        var options = config.wiredepOption;

        return gulp
            .src(config.html.target)
            .pipe(wiredep(options))
            .pipe(gulp.dest(config.build.dev));
    });

    // Compile all template files to $templateCache
    gulp.task('templatecache', ['clean:temp'], function () {
        config.fn.log('Creating an AngularJS $templateCache');

        return gulp
            .src(config.templateCache.source)
            .pipe($.if(args.verbose, $.bytediff.start()))
            .pipe($.minifyHtml({empty: true}))
            .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
            .pipe($.angularTemplatecache(
                config.templateCache.target,
                config.templateCache.options
            ))
            .pipe(gulp.dest(config.build.temp));
    });

    ///////////

    function bytediffFormatter (data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return data.fileName + ' went from ' +
            (data.startSize / 1000).toFixed(2) + ' kB to ' +
            (data.endSize / 1000).toFixed(2) + ' kB and is ' +
            formatPercent(1 - data.percent, 2) + '%' + difference;
    }

    function formatPercent(num, precision) {
        return (num * 100).toFixed(precision);
    }

    function jade (src, dest) {
        // change `app` variable based on --mock parameter
        var data = {};
        if (args.mock) {
            data['app'] = 'appTest';
        } else {
            data['app'] = 'app';
        }
        return gulp
            .src(src)
            .pipe($.jade({
                locals: data
            }))
            .pipe(gulp.dest(dest));
    }

};
