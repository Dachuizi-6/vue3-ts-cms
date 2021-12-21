import { loginState } from './login/types'
import { IUserState } from './main/system/types'

export interface rootState {
  name: string
  age: number
}

interface IStateWithModule {
  login: loginState
  system: IUserState
}

export type IRootStateWithModule = rootState & IStateWithModule
