import { Module } from 'vuex'

import { loginState } from './types'
import { rootState } from '../types'
import { IAccount } from '@/services/login/types'

import { accountLoginRequest } from '@/services/login/login'

const loginModule: Module<loginState, rootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },

  mutations: {
    changeToken(state, token) {
      state.token = token
    }
  },

  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('触发登录action', payload)

      const loginResult = await accountLoginRequest(payload)
      const { token } = loginResult.data

      commit('changeToken', token)
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('手机登录的action~')
    // }
  }
}

export default loginModule
