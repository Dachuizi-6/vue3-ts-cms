import zwRequest from '../../index'
import { IDataType } from '../../types'

enum goodsCategory {
  goodsCategoryCount = '/goods/category/count',
  goodsCategorySale = '/goods/category/sale',
  goodsCategoryFavor = '/goods/category/favor',
  addressGoodsCategory = '/goods/address/sale'
}

export function getGoodsCategoryCount() {
  return zwRequest.get<IDataType>({
    url: goodsCategory.goodsCategoryCount
  })
}

export function getGoodsCategorySale() {
  return zwRequest.get<IDataType>({
    url: goodsCategory.goodsCategorySale
  })
}

export function getGoodsCategoryFavor() {
  return zwRequest.get<IDataType>({
    url: goodsCategory.goodsCategoryFavor
  })
}

export function getAddressGoodsCategorySale() {
  return zwRequest.get<IDataType>({
    url: goodsCategory.addressGoodsCategory
  })
}
