const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const configFn = require("./webpack.config");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const yargs = require("yargs").argv;
const utils = require("./utils/utils.js");
const name = yargs.name || "boss";

const configJson = require(`../src/${name}/config/app.json`);

const proConfig = {
  mode: "production",
  devtool: "none",
};

const plugin = [
  new cleanWebpackPlugin(utils.resolve("dist"), {
    root: process.cwd(),
    verbose: true,
  }),
  new uglify(),
  // 压缩css
  new OptimizeCssAssetsPlugin(),
];

const webpackConfig = configFn({ name });

Object.assign(webpackConfig, proConfig);

webpackConfig.output.publicPath = configJson.proConfig;

webpackConfig.plugins = webpackConfig.plugins.concat(plugin);

const compiler = webpack(webpackConfig);

compiler.run(() => {
  console.log("成功");
});
