const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry:{
        student_entry: './src/student/index.js',
    },
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
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['cache-loader', 'html-loader'],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
