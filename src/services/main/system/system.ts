import zwRequest from '../../index'

import { IDataType } from '../../types'

export function requestDataList(url: string, queryInfo: any) {
  return zwRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return zwRequest.delete<IDataType>({
    url
  })
}
