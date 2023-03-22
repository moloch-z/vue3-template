import type { AxiosPromise, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosInstance } from 'axios'
import axios from 'axios'
import { $t } from '@/i18n'
import { notification } from 'ant-design-vue'
import { apiTokenSession, removeApiTokenSession } from '@/utils'
import router from '@/router'

const env = import.meta.env

export const prefix = env.MODE === 'development' ? 'dev.com' : ''
const errorMessage = () => $t(500)
const baseURL = ''
const requestInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 10
})
// 请求拦截
requestInstance.interceptors.request.use(<T>(config: InternalAxiosRequestConfig<T>): InternalAxiosRequestConfig<T> => {
  if (config.baseURL) {
    requestInstance.defaults.baseURL = config.baseURL
  } else {
    requestInstance.defaults.baseURL = baseURL
  }

  const token = apiTokenSession()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
// 响应拦截
requestInstance.interceptors.response.use(res => {
  if (res.data.code < 0) {
    removeApiTokenSession()
    notification.info({
      message: $t('loginStatusErr'),
      duration: 2
    })
    // 跳转登录页 or 刷新token
    router.push('/login')
  } else if (res.data.code && res.data.code !== 0) {
    notification.error({
      message: res.data.msg || errorMessage(),
      duration: 2
    })
    return Promise.reject(res)
  }
  return res
})

/**
 * Request
 *
 * @param {AxiosRequestConfig} config Request config
 * @returns {AxiosPromise} Response
 */
function request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  config.url = `${prefix}${config.url}`

  return requestInstance(config)
}

export default request
