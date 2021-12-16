import ZWRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const zwRequest = new ZWRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 这里的拦截器只有当前实例才有
    requestInterceptor: (config) => {
      // 携带token拦截
      const token = ''
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default zwRequest

// 如果项目有多个base_url，则可以多new几次ZWRequest
// 1、每次new都可以传入自己的拦截器

// 2、全局的拦截器
// 也是放到constructor里面
// 有顺序，可调节
