import axios, { AxiosInstance } from 'axios'

import { ZWRequestInterceptors, ZWRequestConfig } from './type'

class ZWRequest {
  instance: AxiosInstance

  interceptors?: ZWRequestInterceptors

  constructor(config: ZWRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 当前实例才有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都会执行的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应成功拦截')
        return res
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        return err
      }
    )
  }

  request(config: ZWRequestConfig): void {
    // 对单独的请求拦截器做执行
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      // 对单独的响应拦截器做执行
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }

      console.log(res)
    })
  }
}

export default ZWRequest
