import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import service from './modules/service'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    service
  },
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        user: val.user // 只储存state中的user
      }
    }
  })]

})

export default store
