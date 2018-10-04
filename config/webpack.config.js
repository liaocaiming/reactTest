const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
function resolve(url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
    index: resolve('../src/index.tsx'),
  },
  output: {
    filename: "[chunkhash][name].js",
    path: __dirname + "/dist",
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


  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval-source-map",

  mode: 'development',

  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "node_modules")],
    compress: true,
    port: 9000
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          },
          {
            loader: 'string-replace-loader',
            options: {
              search: './config/boss/index',
              replace: './config/pc/index',
            }
          }
        ]
      },

      // {
      //   test: /\.tsx?$/,
      //   loader: 'string-replace-loader',
      //   exclude: "/node_modules",
      //   options: {
      //     search: './config/boss/index',
      //     replace: './config/pc/index',
      //   }
      // },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: './tpl/index.html',
      filename: 'index.html'
    }),
    // new copyWebpackPlugin([
    //     {
    //         from: `${process.pwd()}/node_modules/react/cjs/react.production.min.js`,//打包的静态资源目录地址
    //         to: './lab' //打包到dist下面的public
    //     },
    //     {
    //         from:   `${process.pwd()}/node_modules/react-dom/cjs/react-dom.production.min.js`,//打包的静态资源目录地址
    //         to: './lab' //打包到dist下面的public
    //     },
    // ]),
    new webpack.ProvidePlugin({
        React: 'reat',
        ReactDom: 'react-dom'
    }),
    // new webpack.config.optimization.splitChunks({
    //     name: "vendor",

    //     // filename: "vendor.js"
    //     // (Give the chunk a different name)

    //     minChunks: Infinity,
    //     // (with more entries, this ensures that no other module
    //     //  goes into the vendor chunk)
    //   }),

    new cleanWebpackPlugin(['dist']),
    // new uglify()
  ]
}