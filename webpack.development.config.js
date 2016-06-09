'use strict'

var path = require('path')
var webpack = require('webpack')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: true,
  'process.env.NODE_ENV': '"development"'
});

module.exports = {
  entry: {
    'fetch-sync': path.resolve(__dirname, './src/client/index.js'),
    'fetch-sync.sw': path.resolve(__dirname, './src/worker/index.js')
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
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  }
}
