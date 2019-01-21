const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
  },
};

module.exports = merge(common, {
    mode: 'development',
    output: {
        chunkFilename: '[name].chunk.js',
        filename: '[name].js',
        publicPath: 'http://127.0.0.1:3000/react/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'student.html',
            template: 'template.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'cache-loader',
                    'style-loader',
                    cssLoaderConfig,
                    'postcss-loader',
                ],
            },
        ],
    },
});