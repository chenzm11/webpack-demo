const PLUGIN_NAME = 'Decoration Plugin'

class DecorationPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tap(PLUGIN_NAME, compilation => {
      Object.keys(compilation.assets).forEach(asset => {
        console.log(asset)
      })
    })

    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      console.log('this is a test')
    })
  }
}

module.exports = DecorationPlugin
