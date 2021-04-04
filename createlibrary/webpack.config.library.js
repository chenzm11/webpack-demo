const path = require('path')

module.exports = {
  mode: 'development',
  entry: './library/index.js',
  output: {
    path: path.resolve(__dirname, './library'),
    filename: 'string-utils.js',
    // 配置生成的文件类型，amd、commonjs2、script等
    library: {
      name: 'string-utils',
      type: 'umd'
    }
  },

  // 外部化lodash，防止打包，需要使用者自行提供lodash
  externals: {
    lodash: 'lodash'
  }
}
