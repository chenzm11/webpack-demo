const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[name].[contenthash:8].js'
  },

  devtool: false,

  optimization: {
    // 提取引导模板
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all', /* all|async|initial */
      cacheGroups: {
        vue: {
          priority: 1000,
          name: 'vue',
          test(module, chunks) {
            // 合并vue、vuex、vue-router
            return module.resource.includes(`${path.sep}node_modules${path.sep}vue${path.sep}`) ||
              module.resource.includes(`${path.sep}node_modules${path.sep}vuex${path.sep}`) ||
              module.resource.includes(`${path.sep}node_modules${path.sep}vue-router${path.sep}`)
          }
        },
        react: {
          priority: 1000,
          name: 'react',
          test(module, chunks) {
            // 合并react、react-dom
            return module.resource.includes(`${path.sep}node_modules${path.sep}react${path.sep}`) ||
              module.resource.includes(`${path.sep}node_modules${path.sep}react-dom${path.sep}`)
          }
        },
        vendor: {
          priority: 10,
          name: 'vendor',
          test(module, chunks) {
            return module.resource.includes(`${path.sep}node_modules${path.sep}`)
          }
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true
    }),
    new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
}
