const babel = require('@babel/core')

module.exports = () => {
  const code = `
const func = () => { }

class Person { }

Promise.resolve()

Object.assign({})

const exists = [1, 2].includes(1)
  `

  return babel.transformSync(code, {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  })
}
