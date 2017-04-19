'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  host: defaultSettings.host,
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '../dist/assets'),
    publicPath: defaultSettings.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  devServer: {
    inline: true,
    quiet: true,
    color: true,
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      page: `${defaultSettings.srcPath}/page/`,
      assets: `${defaultSettings.srcPath}/assets/`
    }
  },
  module: {},
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("style", "css!postcss"),
      loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
    },
    postcss: [
      require('precss'),
      require('autoprefixer'),
      px2rem({remUnit: 64})
    ]
  },
  postcss: function () {
    return [
      require('precss'),
      require('autoprefixer'),
      px2rem({remUnit: 64})
    ];
  }
};
