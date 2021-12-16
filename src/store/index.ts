import { createStore } from 'vuex'

import login from './login/login'
import { rootState } from './types'

const store = createStore<rootState>({
  state: () => {
    return {
      name: 'zohnny',
      age: 20
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login
  }
})

export default store
