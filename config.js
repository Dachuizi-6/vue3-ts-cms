/**
 * 1. 创建实例
 * 2. 设置默认基础属性
 * 3. 设置baseURL
 * 4. 请求拦截
 * 5. header配置
 * 6. 请求拦截
 * 7. 响应拦截
 */

// request.js
import axios from 'axios' // 引入axios
import Qs from 'qs' // 引入qs模块，用来序列化post类型的数据
import router from '@/router/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import store from '@/store'
// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.VUE_APP_PROXY,
  baseURL:
    process.env.NODE_ENV == 'development'
      ? process.env.VUE_APP_PROXY
      : process.env.VUE_APP_BASE_API,
  // baseURL: 'http://192.168.0.164:8888/auth',
  // baseURL: 'http://127.0.0.1:3000/auth',
  timeout: 180000, // 请求超时时间
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  transformRequest: [
    function (data) {
      // 对 data 进行任意转换处理
      // data = JSON.stringify(data)
      return data
    }
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    }
  ],
  withCredentials: true,
  crossDomain: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

// 环境的切换
// instance.defaults.baseURL = process.env.VUE_APP_BASE_URL
instance.interceptors.request.use(
  function (config) {
    // 显示进度条
    NProgress.start()
    if (config.method === 'get') {
      // get请求处理
      config.headers = Object.assign(
        {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        config.headers
      )
      config.data = Qs.stringify(config.params)
    } else {
      const contentType = config.headers['Content-Type']
      // 根据Content-Type转换data格式
      if (contentType) {
        if (contentType.includes('multipart')) {
          // 类型 'multipart/form-data;'
        } else if (contentType.includes('json')) {
          // 类型 'application/json;'
          // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
          config.data = JSON.stringify(config.data)
        } else {
          // 类型 'application/x-www-form-urlencoded;'
          // 服务器收到的raw body(原始数据) name=nowThen&age=18
          // config.data = Qs.stringify(config.data)
          // 请求头为空 设置默认请求头
          config.data = Qs.stringify(config.data)
          config.headers = Object.assign(
            {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            config.headers
          )
        }
      } else {
        // 请求头为空 设置默认请求头
        config.headers = Object.assign(
          {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          },
          config.headers
        )
        config.data = JSON.stringify(config.data)
      }
    }
    Object.assign(config.headers, {
      Authorization: localStorage.access_token
        ? `Bearer ${localStorage.access_token}`
        : ''
    })
    config.headers['SameSite'] = `None`
    return Promise.resolve(config)
  },
  function (error) {
    // 请求失败处理
    Message({
      message: error,
      type: 'warning'
    })
    // 对请求错误做处理...
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    // 隐藏
    NProgress.done()
    //   响应成功处理
    // sso 登陆状态失效
    if (~res.data.action.indexOf('sso') && res.data.code === 1005) {
      if (location.pathname != '/sso/login') {
        router.replace('/sso/login')
        Message({
          message: res.data.msg,
          type: 'error'
        })
      }
      return Promise.reject(res.data)
    }
    //权限系统 登陆失效
    if (res.data.code === 1005) {
      sessionStorage.sessionId = ''
      // 请求失败处理
      // if (location.hash != '#/login') {
      //   router.replace('/login')
      //   Message({
      //     message: res.data.msg,
      //     type: 'error'
      //   })
      // }
      return Promise.reject(res.data)
    }

    if (res.data.code === 1) {
      return Promise.resolve(res.data)
    } else {
      // 请求失败处理
      Message({
        message: res.data.msg,
        type: 'warning'
      })
      return Promise.reject(res.data)
    }
  },
  (err) => {
    // 隐藏
    NProgress.done()
    Message({
      type: 'error',
      message: '系统错误，请稍后重试'
    })
    // 请求失败处理
    return Promise.reject(err.response)
  }
)

export default instance
