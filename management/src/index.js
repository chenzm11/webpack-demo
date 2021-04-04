import './index.scss'
import google from './assets/googlelogo.png'
import img10 from './assets/img10.jpg'

console.log(google)
console.log(img10)

// 全局API
Promise.resolve()
  .then(() => { console.log('Promise.resolve()') })

// 实例方法
console.log([1, 2].includes(2))

function component() {
  const div = document.createElement('div')
  div.textContent = 'hello webpack'

  div.appendChild(createImage(google))

  div.appendChild(createImage(img10))

  return div
}

function createImage(src) {
  const img = document.createElement('img')
  img.classList.add('wp-image')
  img.src = src
  return img
}

document.body.appendChild(component())
