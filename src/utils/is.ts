const toString = Object.prototype.toString

/**
 * 类型检测
 *
 * @param {any} val 检测对象
 * @param {any} type 类型
 * @returns {boolean} 是否属于 type 类型
 */
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}
/**
 * undefined 检测
 *
 * @param {any} val 检测对象
 * @returns {boolean} val is undefined
 */
export function isUnDef(val?: unknown): val is undefined {
  return is(val, 'Undefined')
}

/**
 * 对象检测
 *
 * @example  <caption>类型保护示例</caption>
 * interface TT { aa: string }
 * let a: TT | string = ''
 * if (Math.random() > 0.5) {
 *  a = { aa: 'dd' }
 * } else {
 *  a = 'aa'
 * }
 * if (isObject(a)) {
 *  console.log(a.aa);// a 在这个条件分支被保护为a: TT
 * } else {
 *  console.log(a);// a 在这个条件分支被保护为a: string
 * }
 * @param {any} val 检测对象
 * @returns {boolean} val is Object
 */
export function isObject<T = unknown, U = T extends object ? T : object>(val: unknown): val is U {
  return val !== null && is(val, 'Object')
}

/**
 * 数组检测
 *
 * @param {any}  val 检测对象
 * @returns  {boolean} val is Array
 */
export function isArray<T = unknown>(val: T | T[]): val is Array<T> {
  return val && Array.isArray(val)
}
/**
 * 字符串检测
 *
 * @param {any}  val 检测对象
 * @returns {boolean} val is String
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}
/**
 * 空检测
 *
 * @param {any}  val 检测对象
 * @returns {boolean} val is Empty
 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}
/**
 * Date检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is Date
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

/**
 * null检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is null
 */
export function isNull(val: unknown): val is null {
  return val === null
}

/**
 * null | undefined 检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is null | undefined
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

/**
 * number检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is number
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export type FunctionType = (...arg: unknown[]) => unknown
/**
 * Function检测
 *
 * @example <caption>类型保护示例</caption>
 * let a: FunctionType | string = ''
 * if (Math.random() > 0.5) {
 *  a = () => {return 'a'}
 * } else {
 *  a = 'aa'
 * }
 * if (isFunction(a)) {
 *  console.log(a());// a 在这个条件分支被保护为a: FunctionType
 * } else {
 *  console.log(a);// a 在这个条件分支被保护为a: string
 * }
 * @param  {any} val 检测对象
 * @returns {boolean} val is Function
 */
export function isFunction<T = unknown, U = T extends FunctionType ? T : FunctionType>(val: unknown): val is U {
  return is(val, 'Function')
}

/**
 * Promise检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is Promise
 */
export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
  return is(val, 'Promise')
}

/**
 * 序列化检测
 *
 * @param  {string} val 检测对象
 * @returns {boolean} val is string
 */
export function isJsonObjectString(val: string): val is string {
  if (!val) {
    return false
  }
  return val.startsWith('{') && val.endsWith('}')
}

/**
 * boolean检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is boolean
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * boolean检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is boolean
 */
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

/**
 * Map检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is Map
 */
export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}
/**
 * Element检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is Element
 */
export function isElement(val: unknown): val is Element {
  return val instanceof Element
}

/**
 * Map检测
 *
 * @param  {any} val 检测对象
 * @returns {boolean} val is Map
 */
export function isMap<K, V>(val: unknown): val is Map<K, V> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

/**
 * Url检测
 *
 * @param  {string} path 检测对象
 * @returns {boolean} val is Url
 */
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

  return reg.test(path)
}

/**
 * 是否存在属性
 *
 * @param {any} target target
 * @param {string} key  key
 * @returns {boolean} key is T
 */
export function hasOwnProperty<T, U = keyof T>(target: T, key: unknown): key is U {
  return Object.prototype.hasOwnProperty.call(target, key)
}
/**
 * 对象是否有同属性
 *
 * @param {object} a 对象a
 * @param {object} b 对象a
 * @param {string} key 属性
 * @returns {boolean} key 是否同时是a和b的属性
 */
export function hasSameKey<T, U, M = keyof T & keyof U>(a: T, b: U, key: unknown): key is M {
  return hasOwnProperty(a, key) && hasOwnProperty(b, key)
}
