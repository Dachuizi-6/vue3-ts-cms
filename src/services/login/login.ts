import zwRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum loginApi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  userMenus = '/role/'
}

// 登录接口
export function accountLoginRequest(account: IAccount) {
  return zwRequest.post<IDataType<ILoginResult>>({
    url: loginApi.AccountLogin,
    data: account
  })
}

// 获取登录用户信息
export function requestUserInfoById(id: number) {
  return zwRequest.get<IDataType>({
    url: loginApi.UserInfo + id,
    isShowLoading: false
  })
}

// 获取登录用户菜单
export function requestUserMenusByRoleId(id: number) {
  return zwRequest.get<IDataType>({
    url: loginApi.userMenus + id + '/menu',
    isShowLoading: false
  })
}
