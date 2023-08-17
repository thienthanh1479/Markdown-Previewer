const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    hot: true,
    open: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]"
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name][ext]"
        }
      },
      {
        test: /\.(wav|mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: "include/[name][ext]"
        }
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};