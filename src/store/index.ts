import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { rootState, IRootStateWithModule } from './types'

import login from './login/login'
import system from './main/system/system'

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
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/reloadLocalData')
}

export function useStore(): Store<IRootStateWithModule> {
  return useVuexStore()
}

export default store
