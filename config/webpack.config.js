const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const copyWebpackPlugin = require('copy-webpack-plugin');
// const uglify = require('uglifyjs-webpack-plugin');
const yargs = require("yargs").argv;

let name = "boss";


if (yargs.name) {
  name = yargs.name;
}

const utils = require("./utils");

const publicPath = "/";

module.exports = {
  entry: {
    vendor: ["react", "react-dom"],
    index: [utils.resolve(`src/${name}/index.tsx`)],
  },
  output: {
    filename: "[name].[hash].js",
    path: utils.resolve(`dist/${name}`),
    publicPath: publicPath
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },

  devtool: "eval-source-map",

  mode: "development",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".less"],
    alias: {
      "@utils": utils.resolve("src/@shared/utils"),
      "@shared": utils.resolve("src/@shared"),
      "@screens": utils.resolve("src/@screens"),
      "@containers": utils.resolve("src/@shared/containers"),
      "@typings": utils.resolve("src/typings"),
      "@src": utils.resolve("src"),
      "@components": utils.resolve("src/@shared/components")
    },
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/(node_modules|bower_components)/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { modules: false }],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: "css",
                  },
                  "antDesign",
                ],
                [
                  "import",
                  {
                    libraryName: "antd-mobile",
                    libraryDirectory: "es",
                    style: "css",
                  },
                  "antMobile",
                ],
              ],
              cacheDirectory: true,
            },
          },
          {
            loader: "string-replace-loader",
            options: {
              search: "./config/boss/index",
              replace: `./config/${name}/index`,
            },
          },
        ],
      },

      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: [/(node_modules|bower_components)/],
      //   use: [
      //     {
      //       loader: "ts-loader",
      //       options: {
      //         getCustomTransformers: () => ({
      //           before: [
      //             tsImportPluginFactory({
      //               libraryDirectory: "es",
      //               libraryName: "antd",
      //               style: "css"
      //             })
      //           ]
      //         })
      //       }
      //     },
      //     {
      //       loader: "string-replace-loader",
      //       options: {
      //         search: "./config/boss/index",
      //         replace: `./config/${name}/index`,
      //       },
      //     },
      //   ],
      // },

      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   localIdentName: "[name]__[local]--[hash:base64:5]",
            // },
          },
          // {
          //   loader: "postcss-loader",
          // },
        ],
      },

      // {
      //   test: /\.css?$/,
      //   loader: "typed-css-modules-loader",
      //   enforce: "pre",
      //   exclude: /node_modules/,
      // },

      {
        test: /\.less$/,
        exclude: [/(node_modules|bower_components)/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
            },
          },
          // {
          //   loader: 'url-loader?limit=8000&name=img/[name]-[hash:5].[ext]'
          // }
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./tpl/index.html",
      filename: "index.html",
    }),
    new webpack.ProvidePlugin({
      React: "reat",
      ReactDom: "react-dom",
    }),
    // new webpack.config.optimization.splitChunks({
    //     name: "vendor",

    //     // filename: "vendor.js"
    //     // (Give the chunk a different name)

    //     minChunks: Infinity,
    //     // (with more entries, this ensures that no other module
    //     //  goes into the vendor chunk)
    //   }),
  ],
};
