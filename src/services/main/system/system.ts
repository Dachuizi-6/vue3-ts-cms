import zwRequest from '../../index'

import { IDataType } from '../../types'

// 1、请求页面数据
export function requestDataList(url: string, queryInfo: any) {
  return zwRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// 2、删除页面的一条数据
export function deletePageData(url: string) {
  return zwRequest.delete<IDataType>({
    url
  })
}

// 3、编辑页面的数据
export function editPageData(url: string, editData: any) {
  return zwRequest.patch<IDataType>({
    url,
    data: editData
  })
}
// 新建页面数据
export function addNewPageData(url: string, addData: any) {
  return zwRequest.post<IDataType>({
    url,
    data: addData
  })
}
