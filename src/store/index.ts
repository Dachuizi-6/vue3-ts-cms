import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import { rootState, IRootStateWithModule } from './types'

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

export function setupStore() {
  store.dispatch('login/reloadLocalData')
}

export function useStore(): Store<IRootStateWithModule> {
  return useVuexStore()
}

export default store
