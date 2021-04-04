const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const options = {
  hot: true,
  liveReload: true,
  port: 3000
}

// 通过调用此方法，在entry中混入热替换js，plugins中混入HotModuleReplacementPlugin插件
WebpackDevServer.addDevServerEntrypoints(baseConfig, options)

console.log(baseConfig)

const compiler = webpack(merge(baseConfig))

const server = new WebpackDevServer(compiler, options)

server.listen(3000)
