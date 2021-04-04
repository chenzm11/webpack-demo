const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const server = express()

/**
 * 启动模块热替换：
 *  1. 在entry中注入 webpack-hot-middleware/client?reload=true
 *  2. 在plugins中注入 new webpack.HotModuleReplacementPlugin()
 */

const compiler = webpack(merge(baseConfig, {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    baseConfig.entry
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}))

server.use(webpackDevMiddleware(compiler, {

}))

server.use(webpackHotMiddleware(compiler, {

}))

server.listen(3000)
