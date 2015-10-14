/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var args = require('yargs').argv;

var unitTestEntry = 'source/test/unit/helper.js';
// run multiple times in watch mode
var singleRun = !args.watch;
// use Pahntom in watch mode
var browser = args.watch ? 'PhantomJS' : 'Chrome';

var include = [
    path.resolve('./source')
];

var preLoaders = [
    // Process test code with Babel
    {test: /\.spec\.js$/, loader: 'babel', include: include},
    // Process all non-test code with Isparta
    {test: /\.js$/, loader: 'isparta', include: include, exclude: /\.spec\.js$/}
];
var loaders = [
    {test: /\.styl$/, loader: 'style!css!stylus'},
    {test: /\.jade$/, loader: 'jade'},
    {test: /\.(png|jpg)$/, loader: 'null'}
];
var processors = {};
processors[unitTestEntry] = ['webpack', 'sourcemap'];
processors['source/app/**/*.js'] = ['webpack', 'sourcemap'];

// for watch mode, only show text coverage
var reporters = args.watch ? [
    'mocha', 'coverage'
] : [
    'mocha', 'coverage', 'junit'
];
var coverageReporters = args.watch ? [
    {type: 'text-summary'}
] : [
    {type: 'html', subdir: '.'},
    {type: 'text-summary'}
];

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        exclude: [],
        files: [
            unitTestEntry
        ],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: preLoaders,
                loaders: loaders
            },
            cache: true,
            plugins: [
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery"
                }),
            ]
        },
        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },
        preprocessors: processors,
        reporters: reporters,
        coverageReporter: {
            dir: 'source/test/unit/results/coverage',
            reporters: coverageReporters
        },
        junitReporter: {
            outputDir: 'source/test/unit/results/junit'
        },
        reportSlowerThan: 500,
        singleRun: singleRun,
        browsers: [
            browser
        ]
    });
};
