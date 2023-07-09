import type { AxiosPromise } from 'axios'
import request from '../request'

const prefix = '/user'

export interface UserInfo {
  id: number
  userName: string
}

export const getUserInfoUrl = `${prefix}/userInfo`
/**
 * 获取用户信息
 *
 * @param {FormData} data 表单信息
 * @returns {AxiosPromise} TokenData
 */
export function getAppUserInfo(): AxiosPromise<ServerResponse<UserInfo>> {
  return request({ url: getUserInfoUrl, method: 'GET' })
}
