'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: "首页",
      inject: 'body',
      template: "./src/index.html",
      cache: false,
      filename: "index.html"
    }),
    new ExtractTextPlugin("styles[hash].css")
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.vue$/,
  loader: 'vue',
  include: [].concat(
      config.additionalPaths,
      [path.join(__dirname, '/../src')]
  )
});


module.exports = config;
