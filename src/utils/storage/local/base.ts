export type LocalDB = string | null | void

export function local(name: string): string | null
export function local(name: string, value: string): void
/**
 * localStorage
 *
 * @param {string} key 数据标识
 * @param {string} value 数据
 * @returns {LocalDB} LocalDB
 */
export function local(key: string, value?: string): LocalDB {
  if (value !== undefined) {
    return localStorage.setItem(key, value)
  }
  return localStorage.getItem(key)
}

/**
 * 清空 localStorage
 */
export function clearAllLocal(): void {
  localStorage.clear()
}

/**
 * 根据key值，删除对应的 localStorage
 *
 * @param {string} key localStorage key
 */
export function removeLocal(key: string): void {
  localStorage.removeItem(key)
}
