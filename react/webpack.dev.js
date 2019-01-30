const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
            template: "./template.html",
            filename: path.resolve(__dirname, 'dist')
        })
    ],
});