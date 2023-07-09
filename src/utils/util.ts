import { isObject, hasSameKey, hasOwnProperty } from './is'

/**
 *  深度合并对象
 *
 * @param {object} src 原对象
 * @param {object} target 目标对象
 * @returns {object} src & target
 */
export function deepMerge<T, U>(src: T, target: U): DeepMerge<T, U> {
  const res = src as DeepMerge<T, U>

  if (isObject(target) && isObject(src)) {
    for (const key in target) {
      if (hasOwnProperty(res, key)) {
        if (hasSameKey(res, target, key)) {
          const a = res[key]
          const b = target[key]

          if (isObject(b) && isObject(a)) {
            ;(res[key] as unknown) = deepMerge(a, b)
          } else {
            ;(res[key] as unknown) = b
          }
        } else {
          res[key] = target[key]
        }
      }
    }
  }
  return res
}
