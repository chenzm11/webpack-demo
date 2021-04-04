const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    lodash: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'lib/[name].js',
    // 这里必须加上library
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, './dist/lib/manifest.[name].json')
    })
  ]
}
