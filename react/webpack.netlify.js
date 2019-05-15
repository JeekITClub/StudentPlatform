const merge = require('webpack-merge');
const config = require('./webpack.config');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
    mode: "production",
    output: {
        filename: '[name].[hash].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
            template: "./template.html",
            alwaysWriteToDisk: true
        })
    ],
});