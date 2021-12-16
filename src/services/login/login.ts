import zwRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum loginApi {
  AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount) {
  return zwRequest.post<IDataType<ILoginResult>>({
    url: loginApi.AccountLogin,
    data: account
  })
}
