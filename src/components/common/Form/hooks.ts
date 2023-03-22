import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { $t } from '@/i18n'
import { isArray, isFunction } from '@/utils'

export interface FormProps {
  label?: string
  placeholder?: string | string[]
  options?: DefaultOptionType[] | (() => DefaultOptionType[])
}

/**
 * i18n 转换
 *
 * @param {any} prop 表单组件属性
 * @returns {any} any
 */
export function useI18nProps<T extends FormProps>(prop?: T): T | object {
  if (!prop) {
    return {}
  }
  const { label, placeholder, options, ...rest } = prop

  const res = { options } as T

  if (label) {
    res.label = $t(label)
  }
  if (placeholder) {
    if (isArray(placeholder)) {
      res.placeholder = placeholder.map(str => $t(str))
    } else {
      res.placeholder = $t(placeholder)
    }
  }
  if (isFunction(options)) {
    res.options = options()
  }

  return { ...rest, ...res }
}
