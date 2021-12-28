import { Module } from 'vuex'
import { IDashBoardState } from './types'
import { rootState } from '../../types'

import {
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getAddressGoodsCategorySale
} from '@/services/main/analysis/analysis'

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
  mutations: {
    changeGoodsCategoryCount(state, data) {
      state.goodsCategoryCount = data
    },
    changeGoodsCategorySale(state, data) {
      state.goodsCategorySale = data
    },
    changeGoodsCategoryFavor(state, data) {
      state.goodsCategoryFavor = data
    },
    changeAddressGoodsSale(state, data) {
      state.addressGoodsSale = data
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCategoryCount = await getGoodsCategoryCount()
      commit('changeGoodsCategoryCount', goodsCategoryCount.data)
      const goodsCategorySale = await getGoodsCategorySale()
      commit('changeGoodsCategorySale', goodsCategorySale.data)
      const goodsCategoryFavor = await getGoodsCategoryFavor()
      commit('changeGoodsCategoryFavor', goodsCategoryFavor.data)
      const addressGoodsSale = await getAddressGoodsCategorySale()
      commit('changeAddressGoodsSale', addressGoodsSale.data)
    }
  }
}

export default dashboardModule
