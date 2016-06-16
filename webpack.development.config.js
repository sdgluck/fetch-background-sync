'use strict'

var path = require('path')

module.exports = {
  entry: {
    'fetch-sync': path.resolve(__dirname, './src/client.js'),
    'fetch-sync.sw': path.resolve(__dirname, './src/worker.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'fetchSync',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  }
}
