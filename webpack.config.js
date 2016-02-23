var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var jade = require('jade');
var args = require('yargs').argv;

// parameters
var isProd = args.prod;
var isMock = args.mock;

var base = './';
// use mock api or not
var entryJs = isMock ?
    base + 'source/test/e2e/mocks/index.js' :
    base + 'source/app/index.js';
var appName = isMock ? 'appTest' : 'app';

var template = jade.compileFile('./source/app/index.jade')({app: appName});
var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        // materialize-css rely on this to support velocity
        "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
        __PROD__: isProd,
        __MOCK__: isMock
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash].js' : 'vendor.js'),
    new ExtractTextPlugin(isProd ? '[name].[hash].css' : '[name].css'),
    new HtmlWebpackPlugin({
        templateContent: template,
        inject: 'body',
        chunks: ['app', 'vendor'],
        favicon: 'favicon.ico'
    }),
    new CopyWebpackPlugin([
        { from: 'node_modules/babel-core/browser-polyfill.min.js', to: 'polyfill.js'}
    ])
];

if (isProd) {
    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    );
}

module.exports = {
    entry: {
        app: [
            entryJs
        ],
        vendor: [
            // 3rd dependencies
            'materialize-css/bin/materialize.css',
            'materialize-css/bin/materialize.js',
            'animate.css/animate.css',
            // angular
            'angular',
            'angular-ui-router',
            'angular-animate',
            'angular-messages',
            'angular-mocks',
            'angular-loading-bar',
            'oclazyload'
        ]
    },
    output: {
        path: base + 'build',
        filename: isProd ? '[name].[hash].js' : '[name].js',
        chunkFilename: isProd ? '[name].[hash].chunk.js' : '[name].chunk.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.jade$/,
                loader: 'jade',
                exclude: /index\.jade/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('vue-style', 'css?sourceMap!autoprefixer!stylus')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('vue-style', 'css?sourceMap!autoprefixer')
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader : 'file?name=assets/fonts/[name].[ext]?[hash]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192&name=assets/images/[name].[hash].[ext]'
            }
        ]
    },
    plugins: plugins,
    debug: !isProd,
    devtool: isProd ? 'source-map' : 'eval-source-map',
    devServer: {
        contentBase: base + 'build',
        historyApiFallback: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        host: '0.0.0.0',
        port: 8080
    }
};
