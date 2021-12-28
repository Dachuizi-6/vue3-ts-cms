import { Module } from 'vuex'
import { IDashBoardState } from './types'
import { rootState } from '../../types'

const dashboardModule: Module<IDashBoardState, rootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      addressGoodsSale: []
    }
  },
  actions: {
    async getGoodsCategoryCount() {
      console.log(11)
    }
  }
}

export default dashboardModule
