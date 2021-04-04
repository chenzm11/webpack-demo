# Webpack

## 安装Webpack

```bash
npm i webpack webpack-cli -D
```

## 常用Plugin

```bash
npm i html-webpack-plugin -D
```

```bash
npm i clean-webpack-plugin -D
```

```bash
npm i copy-webpack-plugin -D
```

```bash
npm i webpack-bundle-analyzer -D
```

```bash
# 在模块中可以直接使用库，Webpack会自动引入相应的模块
new webpack.ProvidePlugin({})
```

```bash
# 定义环境变量
new webpack.DefinePlugin({})
```

```bash
# 配置开发环境
npm i webpack-dev-server -D

npm i webpack-dev-middleware -D
npm i webpack-hot-middleware -D
```

## 处理JS

```bash
npm i @babel/runtime @babel/runtime-corejs3 -S

npm i @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader -D
```

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ]
}
```

## 处理CSS

```bash
npm i style-loader css-loader postcss-loader autoprefixer sass-loader sass -D
```

```bash
# 提取CSS
npm i mini-css-extract-plugin -D
```

## 处理文件

```bash
npm i file-loader url-loader -D
```

## 代码分离

* `optimization.splitChunks`：默认只影响异步chunk
  ```js
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
  }
  ```
* `import()`：动态导入
  ```js
  // preload预加载：当前导航下可能需要的资源
  import(/* webpackChunkName: 'lodash', webpackPreload: true */ 'lodash')
      .then(({ default: _ }) => {
      _.forEach([1, 2], v => console.log(v))
    })

  // prefetch预获取：将来某些导航下可能需要的资源
  // <link rel="prefetch" as="script" href="bundle.lodash.js">
  import(/* webpackChunkName: 'lodash', webpackPrefetch: true */ 'lodash')
    .then(({ default: _ }) => {
      _.forEach([1, 2], v => console.log(v))
    })
  ```

## 性能优化

* 使用新版本的`Node.js`、`Webpack`
* 使用`cache-loader`、`thread-loader`
* 使用`resolve.modules`、`resolve.extensions`
* 使用`loader`中的`include`、`exclude`选项
* 使用`externals`
* 使用`DllPlugin`，需要在html页面中手动引入js
* `tree-shaking`

## 模块热替换

1. Webpack首先会watch本地文件，当检测到文件修改时，会重新打包并将结果放入内存中
2. dev-server会将打包后文件信息通过websocket发送给浏览器
3. 浏览器会根据文件信息去dev-server中获取是否需要进行文件更新
4. 如果有更新，浏览器会重新构建请求，获取最新文件内容，然后更新
