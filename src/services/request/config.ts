// 区分环境变量
// 1、手动区分
// const BASE_URL = 'http://zohnny.org/dev'
// const BASE_NAME = 'zohnny'

// const BASE_URL = 'http://zohnny.org/prod'
// const BASE_NAME = 'coby'

// const BASE_URL = 'http://zohnny.org/test'
// const BASE_NAME = 'james'

// 2、根据process.env.NODE_ENV
// definePlugin会根据不同环境注入不同的值
// 开发环境：development
// 生产环境：production
// 测试环境：test

// let BASE_URL = ''
// let BASE_NAME = ''

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://zohnny.org/dev'
//   BASE_NAME = 'zohnny'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'http://zohnny.org/prod'
//   BASE_NAME = 'cobe'
// } else {
//   BASE_URL = 'http://zohnny.org/test'
//   BASE_NAME = 'james'
// }

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://zohnny.org/prod'
} else {
  BASE_URL = 'http://zohnny.org/test'
}

export { BASE_URL, TIME_OUT }
