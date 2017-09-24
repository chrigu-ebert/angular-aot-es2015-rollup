'use strict';

const path = require('path');
const webpack = require('webpack');
const ngtools = require('@ngtools/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// let ultimate = require('@ultimate/aot-loader');

module.exports = {
    entry: {
        'main': path.join(process.cwd(), 'src/main.ts'),
        'vendor': path.join(process.cwd(), 'src/vendor.ts'),
        'polyfill': path.join(process.cwd(), 'src/polyfills.ts')
    },

    context: path.join(process.cwd(), 'src'),

    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['@ngtools/webpack'],
                //include: path.resolve(process.cwd(), 'compiled')
                // use: ['@ultimate/aot-loader']
            }
        ].concat([
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]" },
            {
                test: /\.css$/,
                exclude: path.join(process.cwd(), 'src', 'app'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.css$/,
                include: path.join(process.cwd(), 'src', 'app'),
                loader: 'raw-loader'
            }
        ])
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(process.cwd(), 'src')
        ),
        new CopyWebpackPlugin([
            { from: 'index.html' }
            //{ from: 'favicon.ico' }
        ]),
        new ExtractTextPlugin('style.bundle.css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })

    ].concat([
        new ngtools.AotPlugin({
            tsConfigPath: path.join(process.cwd(), 'tsconfig.json')
        })
        // new ultimate.AotPlugin({
        //   tsConfig: path.join(process.cwd(), 'tsconfig.json')
        // })
    ]),

    resolve: {
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'src')
        ],
        extensions: ['.ts', '.js']
    },

    devServer: {
        contentBase: './src',
        port: 9000,
        inline: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500
        }
    },

    stats: 'errors-only',

    devtool: 'source-map'
};