import { loginState } from './login/types'
export interface rootState {
  name: string
  age: number
}

interface IStateWithModule {
  login: loginState
}

export type IRootStateWithModule = rootState & IStateWithModule
