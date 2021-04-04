const babel = require('@babel/core')

module.exports = () => {
  const code = `
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const func = () => { }

class Person { }

Promise.resolve()

Object.assign({})

const exists = [1, 2].includes(1)
  `

  return babel.transformSync(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3
        }
      ]
    ],
    plugins: []
  })
}
