/* eslint-disable */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var args = require('yargs').argv;

var base = './';

var entryJs = args.mock ?
    base + 'source/test/e2e/mocks/index.js' :
    base + 'source/app/index.js';
var appName = args.mock ? 'appTest' : 'app';

module.exports = {
    entry: [
        entryJs,
        'file?name=index.html!jade-html?app=' + appName +
            '!' + base + 'source/app/index.jade'
    ],
    output: {
        path: base + 'build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
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
                loader: 'style!css!stylus'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader : 'file?name=assets/[name].[ext]?[hash]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            // materialize-css rely on this to support velocity
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            __DEV__: args.dev,
            __BUILD__: args.build,
            __MOCK__: args.mock
        })
    ],
    debug: true,
    devtool: 'eval-source-map',
    devServer: {
        contentBase: base + 'build',
        historyApiFallback: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        host: '0.0.0.0'
    }
};
