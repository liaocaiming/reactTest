const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const yargs = require('yargs').argv;
const utils = require('./utils.js');
const name = yargs.name || 'boss';
const configJson = require(`../src/config/${name}/app.json`);
const proConfig = {
  mode: 'production',
  devtool: 'none'
}
const plugin = [
  new uglify(),
  new cleanWebpackPlugin(utils.resolve('dist'), {
    root: process.cwd(),
    verbose: true
  }),
]
Object.assign(webpackConfig, proConfig);
webpackConfig.output.publicPath = configJson.proConfig;
webpackConfig.plugins = webpackConfig.plugins.concat(plugin);
 const compiler = webpack(webpackConfig);
 compiler.run(() => {
   console.log(32323)
 }) 