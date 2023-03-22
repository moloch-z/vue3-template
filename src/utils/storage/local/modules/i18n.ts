import type { LacaleOption } from '@/i18n'
import { local, removeLocal } from '../base'
import { defaultLacaleOption } from '@/i18n'

const _I18N_LOCALE_ = '_I18N_LOCALE_'

export function i18nLocal(): LacaleOption
export function i18nLocal(value: LacaleOption): void
/**
 *  i18n 语言-当前使用的语言
 *
 * @param {string} value value
 * @returns { LocalDB } LocalDB
 */
export function i18nLocal(value?: LacaleOption): LacaleOption | void {
  if (value !== undefined) {
    local(_I18N_LOCALE_, JSON.stringify(value))
    return
  }
  const db = local(_I18N_LOCALE_)
  if (db) {
    return JSON.parse(db)
  }
  return defaultLacaleOption
}

/**
 *  移除 i18n 语言-当前使用的语言 信息
 *
 * @returns { void }
 */
export function removeI18nLocal(): void {
  removeLocal(_I18N_LOCALE_)
}
