import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex)
const debug = false
export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  },
  plugins: debug ? [createLogger()] : []
})
