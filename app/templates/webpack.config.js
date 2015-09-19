/*eslint-disable */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './client/source/app/index.js',
        'file?name=index.html!jade-html!./client/source/app/index.jade'
    ],
    output: {
        path: './client/build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
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
                loader : 'file?name=res/[name].[ext]?[hash]'
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
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEV || 'true')),
            __PRODUCTION__: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'false'))
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './client/build',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    }

};
