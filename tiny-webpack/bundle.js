// https://www.youtube.com/watch?v=Gc9-7PBqOC8&list=LLHK1mTHpwrUeYgF5gu-Kd4g

const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

let ID = 0

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  // 使用@babel/parser将源代码转换成ast
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  // 当前模块所依赖的子模块
  const dependencies = []

  // 使用@babel/traverse获取每个模块的依赖项
  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value)
    }
  })

  // 使用@babel/core和@babel/preset-env生成代码
  const { code } = babel.transformFromAstSync(ast, 'utf-8', {
    presets: ['@babel/preset-env'],
    plugins: []
  })

  const id = ID++

  return {
    id,
    filename,
    dependencies,
    code
  }
}

function createGraph(entry) {
  const mainAsset = createAsset(entry)

  const queue = [mainAsset]

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename)

    asset.mapping = {}

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)

      const childAsset = createAsset(absolutePath)

      asset.mapping[relativePath] = childAsset.id

      queue.push(childAsset)
    })
  }

  return queue
}

function bundle(queue) {
  const modules = []

  queue.forEach(asset => {
    modules.push(`
    ${asset.id}: [
      function (require, module, exports) {
        ${asset.code}
      },
      ${JSON.stringify(asset.mapping)}
    ]
    `)
  })

  return `
  (function (modules) {
    function require(id) {
      const [fn, mapping] = modules[id]

      function localRequire(relativePath) {
        const id = mapping[relativePath]
        return require(id)
      }

      const module = { exports: {} }

      fn(localRequire, module, module.exports)

      return module.exports
    }

    require(0)
  })({
    ${modules.join(',')}
  })
  `
}

const graph = createGraph('./example/entry.js')

const code = bundle(graph)

console.log(code)
