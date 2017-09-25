const ExtractTextPlugin = require('extract-text-webpack-plugin');
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "source-map" : null,
    // devtool: "source-map",
    entry: "./client/app.js",
    devServer: {
        historyApiFallback: true,
        port: 3001
    },
    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                })
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },

        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: "app.js",
        publicPath: '/dist/js/'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/app.css'
        })
    ]
    // plugins: debug ? [] : [
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    // ],
};