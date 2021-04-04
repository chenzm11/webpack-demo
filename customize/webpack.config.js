const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DecorationPlugin = require('./plugins/decoration-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[name].js'
  },

  module: {
    rules: [
      {
        test: /\.txt$/i,
        // loader是从后往前执行
        use: [
          './loaders/upper-loader',
          './loaders/reverse-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin(),

    new DecorationPlugin({
      text: '**'
    })
  ]
}
