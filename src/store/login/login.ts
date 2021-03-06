import { Module } from 'vuex'

import { loginState } from './types'
import { rootState } from '../types'
import { IAccount } from '@/services/login/types'

import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/services/login/login'

import localCache from '@/utils/cache'
import { menusToRoutes, mapMenusToPerssions } from '@/utils/map-menus-to-routes'

const loginModule: Module<loginState, rootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },

  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, useInfo: any) {
      state.userInfo = useInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 1、动态添加路由
      const routes = menusToRoutes(userMenus)
      // 2、把二级路由添加到一级菜单下面
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 2、获取按钮权限
      const permissions = mapMenusToPerssions(userMenus)
      state.permissions = permissions
    }
  },

  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      console.log('触发登录action', payload)

      // 1、去登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // **确保有token之后再发起请求部门和角色数据**
      dispatch('getPageDataList', null, { root: true })

      //2、登录成功之后：获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 2、登录成功之后：获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      console.log(userMenus)

      // 跳转首页
      router.push('/main')
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('手机登录的action~')
    // }

    // 解决刷新登录信息丢失的token
    reloadLocalData({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // **确保有token之后再发起请求部门和角色数据**
        dispatch('getPageDataList', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
