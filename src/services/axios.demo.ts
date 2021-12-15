import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
// axios.defaults.headers = {}

axios
  .get('http://123.207.32.32:8000/home/multidata')
  .then((res: AxiosResponse) => {
    console.log(res)
  })

// axios
//   .post('/post', {
//     data: {
//       name: 'zohnny',
//       age: 20
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 同时发送多个请求
axios
  .all([
    axios.post('/post', {
      data: {
        name: 'zoh',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axiso的拦截器
// fn1：请求成功执行的回调
// fn2：请求失败执行的回调
axios.interceptors.request.use(
  (config) => {
    // 1.对请求进行转发
    // config.url=""
    return config
  },
  (err) => {
    console.log('请求发生错误')
    return err
  }
)

// 响应成功：2xx
// 响应失败：4xx、5xx
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)
