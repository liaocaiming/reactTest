var webpackConfig = require('./webpack.config');

var devServer = require('./devServ');

var  webpackDevServer = require('webpack-dev-server');

var webpack = require('webpack');

var compiler = webpack(webpackConfig)

var server = new webpackDevServer(compiler, devServer);

server.listen(9000)