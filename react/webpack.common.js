const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../static/react/'),
        publicPath: '/static/react/'
    },
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')]
    },
    plugins: [
        new ProgressBarPlugin({
            format: `  build ${chalk.blue('[:bar]')} ${chalk.green(':percent')} :elapsed seconds`,
        }),
        new HappyPack({
            id: 'jsx',
            loaders: ['cache-loader', 'babel-loader'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=jsx',
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.html$/,
                use: ['cache-loader', 'html-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|eot|woff|woff2|svg|ttf)([\?]?.*)$/i,
                use: ['cache-loader', {
                    loader: 'url-loader',
                    options: {
                        limit: '100000',
                    },
                }],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
