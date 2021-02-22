import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './module/auth'
Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth
  }
})
export default store
