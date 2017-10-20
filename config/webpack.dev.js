const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module:  {
        exprContextCritical: false,

        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?{configFileName: "tsconfig.dev.json"}',
                    'angular2-template-loader'
                ],
                exclude: ['/\.(spec|e2e|d)\.ts$/']
            }
        ]
    },

    //plugins: [

    //],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});