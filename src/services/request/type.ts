import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZWRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface ZWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZWRequestInterceptors<T>
  isShowLoading?: boolean
}
