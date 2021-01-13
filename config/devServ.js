const path = require("path");
const api = require("./api");
const webpackConfig = require("./webpack.config");
const { createProxyMiddleware } = require("http-proxy-middleware");
const yargs = require("yargs");
const { name } = yargs.argv;

module.exports = {
  // contentBase: webpackConfig.output.path,
  compress: true,
  port: 3000,
  historyApiFallback: true,
  stats: "errors-only",
  // proxy: {
  //   '/api': {
  //     target: 'http://47.74.177.128:3000',
  //     changeOrigin: true
  //   }
  // },
  // hot: true,
  // open: true,
  // publicPath: webpackConfig.output.publicPath,
  // watchContentBase: true,
  // inline: true,
  // stats: "errors-only", // 只打印错误
  // overlay: {
  //   warnings: true,
  //   errors: true
  // },
  // watchOptions: {
  //   poll: true
  // },
  before(app) {
    // app.use('/api', api())
    if (name === "boss") {
      app.use(
        "/excel_data",
        createProxyMiddleware({
          target: "http://47.74.177.128",
          changeOrigin: true,
        })
      );
      return;
    }
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://47.74.177.128:80",
        changeOrigin: true,
      })
    );
  },
  // stats: {
  //     assets: true,
  //     builtAt: true,
  //     colors: true,
  //     entrypoints: true,
  //     timings: true
  //   }
};
