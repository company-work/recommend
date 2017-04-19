'use strict';
let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      inject: 'body',
      template: "./src/index.html",
      cache: false,
      filename: "index.html"
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.NoErrorsPlugin()

  ],
  module: defaultSettings.getDefaultModules()
});

config.module.loaders.push({
  test: /\.vue$/,
  loader: 'vue',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
