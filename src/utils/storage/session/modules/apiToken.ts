import type { TokenResponse } from '@/api'
import type { SessionDB } from '../base'
import { session, removeSession } from '../base'

// -------------api token-------------
const _API_TOKEN_ = '_API_TOKEN_'
export interface TokenSession extends TokenResponse {
  startTime: number
}
/**
 * 清空apiToken缓存
 *
 * @returns {SessionDB} SessionDB
 */
export function removeApiTokenSession(): SessionDB {
  return removeSession(_API_TOKEN_)
}

/**
 * 用户token
 *
 * @param {string} value value
 * @returns {SessionDB} SessionDB
 */
export function apiTokenSession(value?: TokenResponse): SessionDB {
  if (value !== undefined) {
    return session(_API_TOKEN_, JSON.stringify({ ...value, startTime: Date.now() }))
  }

  const db = session(_API_TOKEN_)
  if (db) {
    const token = JSON.parse(db) as TokenSession
    const { startTime, expires_in } = token
    if (Date.now() - startTime > expires_in) {
      removeApiTokenSession()
      return
    }
    return token.access_token
  }

  return
}
