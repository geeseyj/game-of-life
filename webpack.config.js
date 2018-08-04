var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/main.ts',
        './src/main.scss'
        ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    mode: 'none',
    module: {
        rules:[
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'sass-loader' ],
                })
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};