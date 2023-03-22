import { createI18n } from 'vue-i18n'
import messages from './langs'
import { locale } from 'dayjs'
export type LocaleType = keyof typeof messages

const lacaleKeys = Object.keys(messages)
export const lacaleList = lacaleKeys.map((key: LocaleType) => {
  return { name: messages[key].localeName, key }
})

export type LacaleOption = PickArrayItem<typeof lacaleList>

export const localeTypes = Object.keys(messages) as Array<LocaleType>
export const fallbackLocale = 'zh-CN' as LocaleType
export const defaultLacaleOption = { name: messages[fallbackLocale].localeName, key: fallbackLocale }

const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  locale: fallbackLocale,
  fallbackLocale, // 默认语言
  messages
})

export const $t = i18n.global.t

/**
 * 切换语言
 *
 * @param {string} newlocale  locale
 * @returns {void}
 */
export function changeLocale(newlocale = fallbackLocale): void {
  i18n.global.locale.value = newlocale
  // 为了这里能正常运作，langs里的命名要按照dayjs的命名来
  locale(newlocale.toLocaleLowerCase())
}

export type LangsLocale = (typeof messages)['zh-CN']

/**
 * 获取ant-design-vue多语言
 *
 * @returns {LangsLocale} 语言配置
 */
export function getLocale(localeName: LocaleType): LangsLocale {
  return messages[localeName]
}

export default i18n
