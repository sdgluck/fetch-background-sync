'use strict'

var path = require('path')
var webpack = require('webpack')

var babel = require('./webpack.babel')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: true,
  'process.env.NODE_ENV': '"development"'
});

module.exports = {
  entry: {
    'fetch-sync': path.resolve(__dirname, './fetchSync/client/index.js'),
    'fetch-sync.sw': path.resolve(__dirname, './fetchSync/worker/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'fetchSync',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [definePlugin],
  module: {
    loaders: [babel]
  }
}
