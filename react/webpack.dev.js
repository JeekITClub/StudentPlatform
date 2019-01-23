const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(config, {
    mode: "development",
    devServer: {
        headers: {
            'Allow-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
});