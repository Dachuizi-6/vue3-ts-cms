import { Module } from 'vuex'

import { rootState } from '../../types'
import { IUserState } from './types'

import {
  requestDataList,
  deletePageData,
  editPageData,
  addNewPageData
} from '@/services/main/system/system'

const userModule: Module<IUserState, rootState> = {
  namespaced: true, // 这个一定要写哇
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount) {
      state.menuCount = menuCount
    }
  },
  actions: {
    // 1、获取页面数据的异步action。配置决定，可以请求每个菜单的数据
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      // 1、有规范的接口
      const pageUrl = `/${pageName}/list`
      // 2、无规范的接口
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      // const res = await requestUserList(payload.url, payload.queryInfo)
      const res = await requestDataList(pageUrl, payload.queryInfo)
      const { list, totalCount } = res.data

      const myPageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      // 1、有规律的用法
      commit(`change${myPageName}List`, list)
      commit(`change${myPageName}Count`, totalCount)

      // 2、switch的用法
      // switch (pageName) {
      //   case 'users':
      //     commit('changeUsersList', list)
      //     commit('changeUsersCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    },
    // 2、删除每个菜单也的一条条数据。配置决定。/pageName/id
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload

      const pageUrl = `/${pageName}/${id}`

      await deletePageData(pageUrl)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 3、编辑每个菜单也面的数据。配置决定
    async editPageData({ dispatch }, payload) {
      console.log('编辑payload', payload)
      const { pageName, id, editData } = payload
      await editPageData(`/${pageName}/${id}`, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async addNewPageData({ dispatch }, payload) {
      console.log('新建payload', payload)
      const { pageName, addData } = payload
      await addNewPageData(`/${pageName}`, addData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'user':
        //     return state.userList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    getPageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default userModule
