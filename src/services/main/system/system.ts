import zwRequest from '../../index'

import { IDataType } from '../../types'

export function requestUserList(url: string, queryInfo: any) {
  return zwRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
