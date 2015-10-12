/* eslint-disable */
var path = require('path');
var args = require('yargs').argv;

// var specFileFilter = 'source/test/unit-test.index.js';
var specFileFilter = 'source/app/**/*.spec.js';
var singleRun = !args.watch;
var browser = args.watch ? 'PhantomJS' : 'Chrome';

var include = [
    path.resolve('./source/app')
];
// only use coverage/junit in non-watch mode
var preLoaders = args.watch ? [
    // Process test code with Babel
    {test: /\.spec\.js$/, loader: 'babel', include: include},
    // Process all non-test code with Isparta
    {test: /\.js$/, loader: 'isparta', include: include, exclude: /\.spec\.js$/}
] : [
    {test: /\.js$/, loader: 'babel', include: include}
];
var reporters = !args.watch ? [
    'mocha'
] : [
    'mocha', 'coverage', 'junit'
];

var loaders = [
    {test: /\.styl$/, loader: 'style!css!stylus'},
    {test: /\.jade$/, loader: 'jade'},
    {test: /\.(png|jpg)$/, loader: 'null'}
];
var processors = {};
processors[specFileFilter] = ['webpack', 'sourcemap'];

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        exclude: [],
        files: [
            specFileFilter
        ],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: preLoaders,
                loaders: loaders
            },
            cache: true
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
            reporters: [
                {type: 'html', subdir: '.'},
                {type: 'text-summary'}
            ]
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
