import axios, { AxiosInstance } from 'axios'

import { ZWRequestInterceptors, ZWRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

class ZWRequest {
  instance: AxiosInstance
  interceptors?: ZWRequestInterceptors
  loading?: any
  isShwoLoading: boolean

  constructor(config: ZWRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isShwoLoading = config.isShowLoading ?? DEFAULT_LOADING

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
        // console.log('所有实例都有的拦截器：请求成功拦截')

        if (this.isShwoLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器：响应成功拦截')

        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有实例都有的拦截器：响应失败拦截')
        this.loading?.close()
        // switch(err.status) // 也可以用switch语句
        // if (err.response.status) {
        //   if ((err.response.status = 404)) {
        //     console.log('请求错误~')
        //   }
        // }
        return err
      }
    )
  }

  request<T>(config: ZWRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单独的请求拦截器做执行
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.isShowLoading === false) {
        this.isShwoLoading = config.isShowLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单独的响应拦截器做执行
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          resolve(res)
          this.isShwoLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          console.log(err)
          reject(err)
          this.isShwoLoading = DEFAULT_LOADING
        })
    })
  }

  get<T>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  put<T>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  patch<T>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZWRequest
