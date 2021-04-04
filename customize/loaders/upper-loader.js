module.exports = function (content) {
  content = content.trim().toUpperCase()

  console.log('upper-loader', content)

  return `module.exports = \`${content}\``
}
