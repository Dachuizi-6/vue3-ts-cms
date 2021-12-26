import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { rootState, IRootStateWithModule } from './types'

import login from './login/login'
import system from './main/system/system'

import { requestDataList } from '@/services/main/system/system'

const store = createStore<rootState>({
  state: () => {
    return {
      name: 'zohnny',
      age: 20,
      allDepList: [],
      allRoleList: []
    }
  },
  mutations: {
    changeAllDepList(state, list) {
      state.allDepList = list
    },
    changeAllRoleList(state, list) {
      state.allRoleList = list
    }
  },
  actions: {
    async getPageDataList({ commit }) {
      const depListRes = await requestDataList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: depList } = depListRes.data

      const roleListRes = await requestDataList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleListRes.data

      commit('changeAllDepList', depList)
      commit('changeAllRoleList', roleList)
    }
  },
  getters: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/reloadLocalData')
  store.dispatch('getPageDataList')
}

export function useStore(): Store<IRootStateWithModule> {
  return useVuexStore()
}

export default store
