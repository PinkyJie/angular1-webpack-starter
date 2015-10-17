const path = require('path');
const webpack = require('webpack');
const args = require('yargs').argv;

const unitTestEntry = 'source/test/unit/helper.js';
// run multiple times in watch mode
const singleRun = !args.watch;
// use Pahntom in watch mode
const browser = args.watch ? 'PhantomJS' : 'Chrome';

const include = [
    path.resolve('./source')
];

const preLoaders = [
    // Process test code with Babel
    {test: /\.spec\.js$/, loader: 'babel', include},
    // Process all non-test code with Isparta
    {test: /\.js$/, loader: 'isparta', include, exclude: /\.spec\.js$/}
];
const loaders = [
    {test: /\.styl$/, loader: 'style!css!stylus'},
    {test: /\.jade$/, loader: 'jade'},
    {test: /\.(png|jpg)$/, loader: 'null'}
];
const processors = {};
processors[unitTestEntry] = ['webpack', 'sourcemap'];
processors['source/app/**/*.js'] = ['webpack', 'sourcemap'];

// for watch mode, only show text coverage
const reporters = args.watch ? [
    'mocha', 'coverage'
] : [
    'mocha', 'coverage', 'junit'
];
const coverageReporters = args.watch ? [
    {type: 'text-summary'}
] : [
    {type: 'html', subdir: '.'},
    {type: 'text-summary'}
];

module.exports = (config) => {
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
                preLoaders,
                loaders
            },
            cache: true,
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                })
            ]
        },
        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },
        preprocessors: processors,
        reporters,
        coverageReporter: {
            dir: 'source/test/unit/results/coverage',
            reporters: coverageReporters
        },
        junitReporter: {
            outputDir: 'source/test/unit/results/junit'
        },
        reportSlowerThan: 500,
        singleRun,
        browsers: [
            browser
        ]
    });
};
