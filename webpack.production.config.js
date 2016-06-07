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

var definePlugin = new webpack.DefinePlugin({
  __DEV__: false,
  'process.env.NODE_ENV': '"production"'
});

module.exports = {
  entry: {
    'fetch-sync': path.resolve(__dirname, './fetchSync/client/index.js'),
    'fetch-sync.sw': path.resolve(__dirname, './fetchSync/worker/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'fetchSync',
    libraryTarget: 'umd'
  },
  plugins: [
    uglifyPlugin,
    definePlugin
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  }
}
