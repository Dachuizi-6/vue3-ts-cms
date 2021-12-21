import { Module } from 'vuex'

import { rootState } from '../../types'
import { IUserState } from './types'

import { requestUserList } from '@/services/main/system/system'

const userModule: Module<IUserState, rootState> = {
  namespaced: true, // 这个一定要写哇
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload)
      const res = await requestUserList(payload.url, payload.queryInfo)
      const { list, totalCount } = res.data

      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default userModule
