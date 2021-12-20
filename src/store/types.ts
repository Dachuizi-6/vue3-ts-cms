import { loginState } from './login/types'
import { IUserState } from './main/system/types'

export interface rootState {
  name: string
  age: number
}

interface IStateWithModule {
  login: loginState
  user: IUserState
}

export type IRootStateWithModule = rootState & IStateWithModule
