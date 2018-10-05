const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');
const yargs = require('yargs').argv;
const name = yargs.name || 'boss';
const configJson = require(`../src/config/${name}/app.json`);
const proConfig = {
  mode: 'production',
  devtool: 'none'
}
const plugin = [
  new uglify()
]
Object.assign(webpackConfig, proConfig);
webpackConfig.output.publicPath = configJson.proConfig;
webpackConfig.plugins = webpackConfig.plugins.concat(plugin);
 const compiler = webpack(webpackConfig);
 compiler.run(() => {
   console.log(32323)
 }) 