import type { AxiosPromise } from 'axios'
import request from '../request'

const prefix = '/user'

export interface UserInfo {
  id: number
  userName: string
}
/**
 * 获取用户信息
 *
 * @param {FormData} data 表单信息
 * @returns {AxiosPromise} TokenData
 */
export function getAppUserInfo(): AxiosPromise<ServerResponse<UserInfo>> {
  return request({ url: `${prefix}/userInfo`, method: 'GET' })
}
