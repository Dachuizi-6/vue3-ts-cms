import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZWRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface ZWRequestConfig extends AxiosRequestConfig {
  interceptors?: ZWRequestInterceptors
}
