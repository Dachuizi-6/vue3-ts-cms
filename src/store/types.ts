import { loginState } from './login/types'
import { IUserState } from './main/system/types'
import { IDashBoardState } from './main/analysis/types'

export interface rootState {
  name: string
  age: number
  allDepList: any[]
  allRoleList: any[]
  allMenuList: any[]
}

interface IStateWithModule {
  login: loginState
  system: IUserState
  dashboard: IDashBoardState
}

export type IRootStateWithModule = rootState & IStateWithModule
