module.exports = function (gulp, config, $, args) {

    var merge = require('merge-stream');

    // Copy all items
    gulp.task('copy', ['copy:js', 'copy:images', 'copy:vendor']);

    // Copy image files
    gulp.task('copy:images', ['clean:images'], function () {
        config.fn.log('Compressing and copying images');

        return gulp
            .src(config.resource.images)
            .pipe($.imagemin({optimizationLevel: 4}))
            .pipe(gulp.dest(config.build.dev + 'static/images'));
    });

    // Copy javascript files
    gulp.task('copy:js', ['clean:js'], function () {
        config.fn.log('Copying all javascript files');

        var jsStream = gulp
            .src(config.js.app)
            .pipe(gulp.dest(config.build.dev + 'static'));

        // Also copy mock files if --mock is on
        if (args.mock) {
            var mockStream = gulp
                .src(config.js.stubs[1])
                .pipe($.flatten())
                .pipe(gulp.dest(config.bulid.dev + 'static/test'));
            return merge(jsStream, mockStream);
        } else {
            return jsStream;
        }
    });

    // Copy bower dependency files
    gulp.task('copy:vendor', ['clean:vendor'], function () {
        config.fn.log('Copying bower dependency files');

        return copy(config.bower.directory + '/**/*');
    });

    // Copy image files to prod folder
    gulp.task('copy:images:prod', function () {
        return gulp
            .src(config.build.dev + 'static/images')
            .pipe(gulp.dest(config.build.prod + 'static/images'));
    });

    ////////

    function copy (src, dest) {
        return gulp
            .src(src)
            .pipe(gulp.dest(dest));
    }
};
