import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

console.log(_, Vue, Vuex, VueRouter)

function component() {
  const btn = document.createElement('button')
  btn.textContent = '点击'
  btn.onclick = () => {
    import(/* webpackChunkName: 'foo', webpackPrefetch: true */ './foo')
      .then(({ foo }) => {
        console.log(foo())
      })
  }
  return btn
}

document.body.appendChild(component())
