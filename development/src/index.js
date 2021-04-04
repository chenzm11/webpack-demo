import { sayHello } from './foo'

function component() {
  const p = document.createElement('p')

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.onclick = sayHello
  btn.textContent = '点击'
  p.appendChild(btn)

  return p
}

document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./foo', (...args) => {
    console.error(args)

    document.body.appendChild(component())
  })
}
