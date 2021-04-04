const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = require('./public/config')[isDev ? 'dev' : 'prod']

module.exports = {
  mode: isDev ? 'development' : 'production',

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'scripts/bundle.[name].js'
  },

  // 新版本Webpack需要设置成es5，不然manifest会使用箭头函数？
  // 项目中存在browserslist时，会根据browserslist的配置推断目标环境，推断失败会导致热替换失效
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: 'es5',

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 10kb以下的文件会转换成DataURL
              limit: 10 * 1024,
              // 输出文件地址
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      config
    }),
    // 生产环境下提取CSS
    ...(
      [!isDev ? new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      }) : null].filter(v => v)
    )
  ]
}
