import type { UserInfo } from '@/api'
import type { SessionDB } from '../base'
import { session, removeSession } from '../base'

// ------------------userinfo--------------------------------
const _USER_INFO_ = '_USER_INFO_'
export type UserInfoSessionDB = UserInfo | void

export function userInfoSession(): UserInfo
export function userInfoSession(value: string): void
/**
 * 用户信息
 *
 * @param {string} value value
 * @returns {SessionDB} SessionDB
 */
export function userInfoSession(value?: string): UserInfoSessionDB {
  if (value !== undefined) {
    return session(_USER_INFO_, value)
  }
  const db = session(_USER_INFO_)

  if (db) {
    return JSON.parse(db) as UserInfo
  }
  return {
    id: -1,
    userName: 'init test'
  }
}
/**
 * 清空userInfo缓存
 *
 * @returns {SessionDB} SessionDB
 */
export function removeUserInfoSessionDB(): SessionDB {
  return removeSession(_USER_INFO_)
}
