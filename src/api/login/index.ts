import type { AxiosPromise } from 'axios'
import request from '../request'

const prefix = '/login'

export const loginUrl = `${prefix}/oauth/token`

export interface TokenResponse {
  access_token: string
  expires_in: number
}

export interface LoginFormData {
  username: string
  password: string
  remember: boolean
}
/**
 * 登录
 *
 * @param {FormData} data 表单信息
 * @returns {AxiosPromise} TokenData
 */
export function login(data: FormData): AxiosPromise<ServerResponse<TokenResponse>> {
  return request({
    url: loginUrl,
    method: 'POST',
    data,
    headers: {
      Authorization: 'Basic d2ViQXB=='
    }
  })
}

export const logoutUrl = `${prefix}/logout`
/**
 * 注销
 *
 * @returns {AxiosPromise} logout res
 */
export function logout(): AxiosPromise<ServerResponse<null>> {
  return request({ url: logoutUrl, method: 'GET' })
}
