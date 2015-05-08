module.exports = function() {
    // dependencies used in this file
    var wiredep = require('wiredep');
    var bowerJson = require('../bower.json');
    var gulp = require('gulp');
    var gUtil = require('gulp-util');
    var gInject = require('gulp-inject');
    var gIf = require('gulp-if');
    var gOrder = require('gulp-order');
    // base folder
    var _root = '../';
    var _clientBase = _root + 'client/';
    var _serverBase = _root + 'server/';
    // client folder
    var client = {
        base: _clientBase,
        source: this.base + 'source/',
        test: this.source + 'test/',
        app: this.source + 'app/'
    };
    // server folder
    var server = {
        base: _serverBase
    };
    // build folder
    var build = {
        base: client.base + 'build/',
        dev: this.base + 'dev/',
        temp: this.base + '.temp/',
        prod: this.base + 'prod/'
    };
    // node dependency
    var nodeModules = _root + 'node_modules/';
    // bower dependency
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var bower = {
        json: bowerJson,
        directory: client.source + 'vendor',
        ignorePath: '../..'
    };

    // all configuration which will be returned
    var config = {
        // folders
        root: _root,
        client: client,
        server: server,
        build: build,
        // js
        js: {
            all: [
                client.app + '**/*.js',
                client.test + '**/*.js',
                _root + 'gulp/**/*.js',
                _root + '*.js'
            ],
            app: [
                client.app + '**/*.module.js',
                client.app + '**/*.js'
            ],
            order: [
                '**/app.module.js',
                '**/*.module.js',
                '**/*.js'
            ],
            stubs: [
                bower.directory + 'angular-mocks/angular-mocks.js',
                client.test + 'e2e/mocks/**/*.e2e.js'
            ],
            specs: [
                client.test + 'unit/specs/**/*.spec.js'
            ]
        },
        // css
        css: {
            source: client.app + '**/*.styl',
            target: build.dev + 'static/**/*.css',
            singleSource: client.source + 'styles/**/*.styl'
        },
        // html
        html: {
            source: client.source + 'index.jade',
            target: build.dev + 'index.html'
        },
        templateCache: {
            source: client.app + '**/*.jade',
            target: 'templates.js',
            options: {
                module: 'app.core',
                root: '/static/app/',
                standAlone: false
            }
        },
        resource: {
            images: client.source + 'images/**/*.*',
            fonts: client.source + 'fonts/**/*.*',
        },
        bower: bower,
        browserSync: {
            hostName: 'localhost',
            reloadDelay: 1000,
            defaultPort: 8088
        },
        optimized: {
            allCSS: '*.css',
            appJS: 'app.js',
            libJS: 'lib.js'
        },
        packages: [
            './package.json',
            './bower.json'
        ]
    };

    config.karmaOption = getKarmaOptions();
    config.wiredepOption = getWiredepDefaultOptions();
    config.protractorOption = getProtractorOptions();

    // common functions used by multiple tasks
    config.fn = {};
    config.fn.log = log;
    config.fn.inject = inject;

    return config;

    ////////////////

    // Options for wiredep
    function getWiredepDefaultOptions () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
    }

    // Options for karma
    function getKarmaOptions () {
        var options = {
            files: [].concat(
                bowerFiles,
                client.app + '**/*.module.js',
                client.app + '**/*.js'
            ),
            exclude: [],
            coverage: {
                dir: client.test + 'unit/results/coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: '.'},
                    {type: 'text-summary'}
                ]
            },
            junit: client.test + 'unit/results/unit-test-results.xml',
            preprocessors: {}
        };
        options.preprocessors[config.js.specs] = ['coverage'];
        return options;
    }

    // Options for protractor
    function getProtractorOptions () {
        return {
            specs: [client.test + 'e2e/specs/*.spec.js'],
            suites: {
                home: client.test + 'e2e/specs/home.spec.js',
                login: client.test + 'e2e/specs/login.spec.js',
                dashboard: client.test + 'e2e/specs/dashboard.spec.js',
                product: client.test + 'e2e/specs/product.spec.js'
            },
            helper: client.test + 'e2e/helper.js'
        };
    }

    // Log function for both object type and primitive type
    function log (msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    gUtil.log(gUtil.colors.blue(msg[item]));
                }
            }
        } else {
            gUtil.log(gUtil.colors.blue(msg));
        }
    }

    // Helper function for gulp-inject
    function inject (src, label, order) {
        var options = {read: false};
        if (label) {
            options.name = 'inject:' + label;
        }

        return gInject(orderSrc(src, order), options);
    }

    function orderSrc (src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe(gIf(order, gOrder(order)));
    }
};
