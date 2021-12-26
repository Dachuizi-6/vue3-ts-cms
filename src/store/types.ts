import { loginState } from './login/types'
import { IUserState } from './main/system/types'

export interface rootState {
  name: string
  age: number
  allDepList: any[]
  allRoleList: any[]
}

interface IStateWithModule {
  login: loginState
  system: IUserState
}

export type IRootStateWithModule = rootState & IStateWithModule
