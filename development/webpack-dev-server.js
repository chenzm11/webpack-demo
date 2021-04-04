const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  devServer: {
    hot: true,
    liveReload: true,
    port: 3000
  }
})
