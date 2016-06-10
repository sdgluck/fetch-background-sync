'use strict'

var path = require('path')
var webpack = require('webpack')

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    unused: true,
    dead_code: true,
    warnings: false
  }
})

module.exports = {
  entry: {
    'fetch-sync': path.resolve(__dirname, './src/client.js'),
    'fetch-sync.sw': path.resolve(__dirname, './src/worker.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'fetchSync',
    libraryTarget: 'umd'
  },
  plugins: [
    uglifyPlugin
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  }
}
