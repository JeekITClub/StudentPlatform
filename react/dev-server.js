const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const chalk = require('chalk');
const devConfig = require('./webpack.dev');

const PORT = 3000;
const HOST = '127.0.0.1';

const options = {
  stats: "errors-only",
  publicPath: devConfig.output.publicPath,
  hot: true,
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: 'dist/index.html' },
    ],
  },
  contentBase: [__dirname, path.resolve(__dirname, '../')],
  // proxy: proxyArray,
  // add port and host to prevent 'The URL 'http:/sockjs-node' is invalid' error
  port: PORT,
  host: HOST,
};

WebpackDevServer.addDevServerEntrypoints(devConfig, options);
const compiler = webpack(devConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(PORT, HOST, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.blue(`Listening at http://${HOST}:${PORT}/`));
});
