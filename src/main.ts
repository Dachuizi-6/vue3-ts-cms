import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import zwRequest from './services'

import 'normalize.css'
import './assets/css/index.less'

import { setupStore } from '@/store'

// 注册全局 的东西
import registryGlobal from '@/global'

// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// import './services/axios.demo'
const app = createApp(App)

setupStore()

app.use(registryGlobal)
app.use(ElementPlus, {
  locale: zhCn
})

app.use(router)
app.use(store)
app.mount('#app')

// console.log(2223333333333333)
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// zwRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'get',
//     isShowLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

// zwRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     method: 'get',
//     isShowLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

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
