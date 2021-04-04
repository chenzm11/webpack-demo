module.exports = function (content) {
  content = content.trim().split('').reverse().join('')

  console.log('reverse-loader', content)

  return content
}
