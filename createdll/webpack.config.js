const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[name].js'
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '!lib/**']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dist/lib/manifest.lodash.json')
    })
  ]
}
