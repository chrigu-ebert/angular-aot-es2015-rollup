var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|ico|aac|ttf|eot|csv|json)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //loader: 'file-loader?name=assets/[name].[hash].[ext]'
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.html/,
                loader: 'markup-inline-loader'
            },
            {
                test: /\.ico$/,
                loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ]})
            },
            /*{
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            },*/
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new ExtractTextPlugin('[name].css')
    ]
};
