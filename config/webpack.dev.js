const webpackConfig = require('./webpack.config');

const devServer = require('./devServ');

const  webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(webpackConfig)

const server = new webpackDevServer(compiler, devServer);

const opn = require('opn');

server.listen(9000, '127.0.0.1', () => {
  opn('http://localhost:9000')
})