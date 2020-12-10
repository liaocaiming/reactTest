const webpackConfig = require('./webpack.config');

const devServer = require('./devServ');

const  webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const { getIPAddress } = require('./utils');

const ip = getIPAddress()

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

webpackConfig.entry.index.unshift(`webpack-dev-server/client?http://localhost:3030/`);

const compiler = webpack(webpackConfig)

webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);

const server = new webpackDevServer(compiler, devServer);

const opn = require('opn');

server.listen(3030, ip, () => {
  console.log(`ip:  ${ip}`)

  opn(`http://${ip}:3030`)
})