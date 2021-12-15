import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import zwRequest from './services'

// import './assets/css/index.less'

// import './services/axios.demo'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// console.log(2223333333333333)
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

zwRequest
  .get<DataType>({
    url: '/home/multidata',
    method: 'get',
    isShowLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// 单独的请求拦截
// zwRequest.request({
//   url: '/home/multidata',
//   method: 'get',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独的请求拦截')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独的响应拦截')
//       return res
//     }
//   }
// })
