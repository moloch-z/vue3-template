import type { LacaleOption } from '@/i18n'
import { defineStore } from 'pinia'
import { i18nLocal } from '@/utils'
import { changeLocale } from '@/i18n'

export const useI18nStore = defineStore('i18n', {
  state: () => {
    const store = i18nLocal()
    changeLocale(store.key)
    return { locale: store }
  },
  actions: {
    changeLocale(locale: LacaleOption) {
      i18nLocal(locale)
      changeLocale(locale.key)
      this.locale = locale
    }
  }
})
