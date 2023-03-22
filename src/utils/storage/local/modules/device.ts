import type { LocalDB } from '../base'
import { local, removeLocal } from '../base'

const _DEVICE_ID_ = '_DEVICE_ID_'

/**
 * 游客信息
 *
 * @param {string} value value
 * @returns {LocalDB} LocalDB
 */
export function deviceLocal(value?: string): LocalDB {
  if (value !== undefined) {
    return local(_DEVICE_ID_, value)
  }
  return local(_DEVICE_ID_)
}

/**
 *  移除 游客信息
 *
 * @param {string} key key
 * @returns { void }
 */
export const removedeviceLocal = function (): void {
  removeLocal(_DEVICE_ID_)
}
