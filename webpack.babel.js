'use strict'

module.exports = {
  test: /\.js?$/,
  exclude: /node_modules/,
  loaders: [
    'babel?' + JSON.stringify(
      {
        presets: [
          'es2015',
          'stage-0'
        ],
        plugins: [
          'add-module-exports'
        ]
      }
    )
  ]
}
