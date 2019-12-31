const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "node_modules/antd")
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader', options: {
                            javascriptEnabled: true // allow inline javascript
                        }
                    }]
            },
            {
                test: /\.css$/,
                include: [
                    /src/,
                    '/node_modules/antd/dist/'
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|eot|woff|woff2|svg|ttf)([\?]?.*)$/i,
                use: ['cache-loader', 'url-loader'],
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};