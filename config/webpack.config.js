const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const copyWebpackPlugin = require('copy-webpack-plugin');
// const uglify = require('uglifyjs-webpack-plugin');
const yargs = require("yargs").argv;

const tsImportPluginFactory = require("ts-import-plugin");

let name = "boss";
if (yargs.name) {
  name = yargs.name;
}

const utils = require("./utils");

const publicPath = "/";

module.exports = {
  entry: {
    vendor: ["react", "react-dom"],
    index: [utils.resolve("src/index.tsx")]
  },
  output: {
    filename: "[name][hash].js",
    path: utils.resolve(`dist/${name}`)
    // publicPath: publicPath
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },

  devtool: "eval-source-map",

  mode: "development",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    alias: {
      "@utils": utils.resolve("src/@shared/utils"),
      "@shared": utils.resolve("src/@shared"),
      "@screens": utils.resolve("src/@screens"),
      "@containers": utils.resolve("src/@shared/containers")
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          {
            // loader: "awesome-typescript-loader",
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryDirectory: "es",
                    libraryName: "antd",
                    style: "css"
                  })
                ]
              })
            }
            
          },
          {
            loader: "string-replace-loader",
            options: {
              search: "./config/boss/index",
              replace: `./config/${name}/index`
            }
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          },
        ]
      },

      {
        test: /\.css?$/,
        loader: 'typed-css-modules-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]"
            }
          }
          // {
          //   loader: 'url-loader?limit=8000&name=img/[name]-[hash:5].[ext]'
          // }
        ]
      }
    ]
  },

  // devServer: {
  //   contentBase: utils.resolve('dist'),
  //   compress: true,
  //   port: 8080,
  //   historyApiFallback: true,
  //   hot: true,
  //   open: true,
  //   publicPath: '/',
  //   watchContentBase: true,
  //   inline: true,
  //   // stats: "errors-only", // 只打印错误
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   },
  //   watchOptions: {
  //     poll: true
  //   },
  //   before(app) {
  //     // app.use('/api', api())
  //   }
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./tpl/index.html",
      filename: "index.html"
    }),
    new webpack.ProvidePlugin({
      React: "reat",
      ReactDom: "react-dom"
    })
    // new webpack.config.optimization.splitChunks({
    //     name: "vendor",

    //     // filename: "vendor.js"
    //     // (Give the chunk a different name)

    //     minChunks: Infinity,
    //     // (with more entries, this ensures that no other module
    //     //  goes into the vendor chunk)
    //   }),
  ]
};
