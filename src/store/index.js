import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('USER')),
    routes: [],
    token: window.localStorage.getItem('token')
  },
  mutations: {
    initMenu (state, menus) {
      state.routes = menus
    },
    changeLang (state, lang) {
      window.localStorage.setItem('lang', lang || 'cn')
    },
    setToken (state, token) {
      state.token = token
      window.localStorage.setItem('token', token)
    },
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('USER', JSON.stringify(user))
    }
  }
})
