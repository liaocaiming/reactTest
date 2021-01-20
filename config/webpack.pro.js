const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const configFn = require("./webpack.config");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const chalk = require("chalk");
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

const compressing = require("compressing");

const compiler = webpack(webpackConfig);

const zipName = `${name}-${configJson.version}.zip`;

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
    return;
  }

  compressing.zip
    .compressDir(
      utils.resolve(`dist/${name}`),
      utils.resolve(`dist/${zipName}`)
    )
    .then(() => {
      console.log(chalk.yellow(`Tip: 文件压缩成功，已压缩至【${zipName}】`));
    })
    .catch((err) => {
      console.log(chalk.red("Tip: 压缩报错"));
      console.error(err);
    });
});
