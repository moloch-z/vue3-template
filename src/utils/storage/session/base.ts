export type SessionDB = string | null | void

export function session(name: string): string | null
export function session(name: string, value: string): void

/**
 * sessionStorage
 *
 * @param {string} key 数据标识
 * @param {string} value 数据
 * @returns {SessionDB} SessionDB
 */
export function session(key: string, value?: string): SessionDB {
  if (value !== undefined) {
    return sessionStorage.setItem(key, value)
  }
  return sessionStorage.getItem(key)
}

/**
 * 清空sessionStorage
 */
export function clearAllSession(): void {
  sessionStorage.clear()
}

/**
 * 根据key值，删除对应的sessionStorage
 *
 * @param {string} key Session key
 */
export function removeSession(key: string): void {
  sessionStorage.removeItem(key)
}
