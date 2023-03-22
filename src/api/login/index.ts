import type { AxiosPromise } from 'axios'
import request from '../request'

const prefix = '/login'

export interface TokenResponse {
  access_token: string
  expires_in: number
}

export interface LoginFormData {
  username: ''
  password: ''
  remember: true
}
/**
 * 登录
 *
 * @param {FormData} data 表单信息
 * @returns {AxiosPromise} TokenData
 */
export function login(data: FormData): AxiosPromise<ServerResponse<TokenResponse>> {
  return request({
    url: `${prefix}/oauth/token`,
    method: 'POST',
    data,
    headers: {
      Authorization: 'Basic d2ViQXB=='
    }
  })
}

/**
 * 注销
 *
 * @returns {AxiosPromise} logout res
 */
export function logout(): AxiosPromise<ServerResponse<null>> {
  return request({ url: `${prefix}/logout`, method: 'GET' })
}
