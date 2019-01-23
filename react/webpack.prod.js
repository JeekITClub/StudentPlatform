const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
});