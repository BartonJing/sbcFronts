import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'test'
    },
    routes: [],
    token: window.localStorage.getItem('token')
  },
  mutations: {
    changeLang (state, lang) {
      window.localStorage.setItem('lang', lang || 'cn')
    },
    setToken (state, token) {
      state.token = token
      window.localStorage.setItem('token', token)
    }
  }
})
