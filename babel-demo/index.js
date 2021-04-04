/**
 * @babel/preset-env：转换语法
 *  useBuiltIns为false、entry时，需要手动引入polyfill
 *  useBuiltIns为usage时，不需要手动引入polyfill
 *
 * @babel/polyfill：提供垫片，模拟完整的ES6环境
 *  1. 全局API
 *  2. 静态方法
 *  3. 实例方法
 *  4. 生成器函数
 * 注：babel7.4+已经废弃，需要自行安装 core-js 和 regenerator-runtime
 *
 * @babel/runtime：Babel会在转换过程中注入类似_classCallCheck2等公共方法，通过搭配@babel/plugin-transform-runtime插件，可以将其转换成require的形式，避免多次注入代码。
 * @babel/runtime-corejs3：除了提供公共方法，还可以提供垫片，通过搭配@babel/plugin-transform-runtime插件，可以将其转换成require的形式，避免污染全局环境。
 *
 * @babel/plugin-transform-runtime：将引用转换成require的形式
 *
 * presets与plugins
 *  1. plugins在presets前运行
 *  2. plugins从前往后运行
 *  3. presets从后往前运行
 */

const fs = require('fs')
const path = require('path')

fs.readdirSync(path.resolve(__dirname, './src'))
  .forEach(v => {
    const code = require(`./src/${v}`)().code
    fs.writeFileSync(path.resolve(__dirname, './dist', v), code)
    console.log('done', v)
  })
