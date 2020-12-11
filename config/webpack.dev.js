const configFn = require('./webpack.config');

const devServer = require('./devServ');

const  webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const { getIPAddress } = require('./utils/utils');

const yargs = require('yargs');

const { name } = yargs.argv;

const ip = getIPAddress()

const webpackConfig = configFn({ name });

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

webpackConfig.entry.index.unshift(`webpack-dev-server/client?http://localhost:3030/`);

const compiler = webpack(webpackConfig)

webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);

const server = new webpackDevServer(compiler, devServer);

const opn = require('opn');

server.listen(3030, () => {
  console.log(`ip:  ${ip}`)

  opn(`http://localhost:3030`)
})