import type { Slots, VNode } from 'vue'
import type { ExtractPropTypes, PropType } from '@vue/runtime-core'
import type { App, Plugin } from 'vue'

import { warn } from 'vue'
import { isObject } from './is'

const wrapperKey = Symbol()

export type PropWrapper<T> = { [wrapperKey]: T }

export const propKey = '__yiPropsReservedKey'

export type ResolveProp<T> = ExtractPropTypes<{
  key: { type: T; required: true }
}>['key']
type ResolvePropType<T> = ResolveProp<T> extends { type: infer V } ? V : ResolveProp<T>
type ResolvePropTypeWithReadonly<T> = Readonly<T> extends Readonly<Array<infer A>> ? ResolvePropType<A[]> : ResolvePropType<T>

type IfUnknown<T, V> = [unknown] extends [T] ? V : T
type _BuildPropType<T, V, C> =
  | (T extends PropWrapper<unknown> ? T[typeof wrapperKey] : [V] extends [never] ? ResolvePropTypeWithReadonly<T> : never)
  | V
  | C
export type BuildPropType<T, V, C> = _BuildPropType<IfUnknown<T, unknown>, IfUnknown<V, unknown>, IfUnknown<C, unknown>>

export type BuildPropOption<T, D, R, V, C> = {
  type?: T
  values?: readonly V[]
  required?: R
  default?: R extends true ? never : D extends Record<string, unknown> | Array<unknown> ? () => D : (() => D) | D
  validator?: ((val: unknown) => val is C) | ((val: unknown) => boolean)
}

type _BuildPropDefault<T, D> = [T] extends [
  // eslint-disable-next-line @typescript-eslint/ban-types
  Record<string, unknown> | Array<unknown> | Function
]
  ? D
  : D extends () => T
  ? ReturnType<D>
  : D

export type BuildPropDefault<T, D, R> = R extends true
  ? { readonly default?: undefined }
  : {
      readonly default: Exclude<D, undefined> extends never ? undefined : Exclude<_BuildPropDefault<T, D>, undefined>
    }
export type BuildPropReturn<T, D, R, V, C> = {
  readonly type: PropType<BuildPropType<T, V, C>>
  readonly required: IfUnknown<R, false>
  readonly validator: ((val: unknown) => boolean) | undefined
  [propKey]: true
} & BuildPropDefault<BuildPropType<T, V, C>, IfUnknown<D, never>, IfUnknown<R, false>>

/**
 * @param {BuildPropOption} option props类型
 * @param {string} key key
 * @returns {BuildPropReturn} 整合的props类型
 * @description Build prop. It can better optimize prop types
 * @description 生成 prop，能更好地优化类型
 * @example
 * // limited options
 * // the type will be PropType<'light' | 'dark'>
 *buildProp({
 *  type: String,
 *  values: ['light', 'dark'],
 *} as const)
 * @example
 * // limited options and other types
 * // the type will be PropType<'small' | 'large' | number>
 *buildProp({
 *  type: [String, Number],
 *  values: ['small', 'large'],
 *  validator: (val: unknown): val is number => typeof val === 'number',
 *} as const)
 */
export function buildProp<T = unknown, D = unknown, R extends boolean = false, V = unknown, C = unknown>(
  option: BuildPropOption<T, D, R, V, C>,
  key?: string
): BuildPropReturn<T, D, R, V, C> {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(option)) return option
  // || !!option[propKey]
  const { values, required, default: defaultValue, type, validator } = option

  const _validator =
    values || validator
      ? (val: unknown): boolean => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = [...values, defaultValue]
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)].map(value => JSON.stringify(value)).join(', ')

            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`
            )
          }
          return valid
        }
      : undefined
  let t = type

  if (typeof type === 'object') {
    const descriptor = Object.getOwnPropertyDescriptor(type, wrapperKey)

    if (descriptor) {
      t = descriptor.value
    }
  }
  return {
    type: t,
    required: Boolean(required),
    default: defaultValue,
    validator: _validator,
    [propKey]: true
  } as unknown as BuildPropReturn<T, D, R, V, C>
}

/**
 * 声明props类型
 *
 * @param {any} val  any
 * @returns {PropWrapper<any>} 推导出类型
 */
export function definePropType<T>(val: unknown): PropWrapper<T> {
  return { [wrapperKey]: val } as PropWrapper<T>
}

/**
 * 数组下标推成元组类型
 *
 * @param {Array} arr 数组
 * @returns {Array} 下标Tuple
 */
export function keyOf<T extends object>(arr: T): Array<keyof T> {
  return Object.keys(arr) as Array<keyof T>
}

/**
 * 获取插槽
 *
 * @param {Slots[]} slots slots 数组
 * @param {string} prop 参数key
 * @returns {VNode} slots 虚拟节点
 */
export function getSlot(slots: Slots, prop = 'default'): VNode[] | undefined {
  return slots[prop]?.()
}

export type SFCWithInstall<T> = T & Plugin
export const withInstall = <T extends { name?: string }>(component: SFCWithInstall<T>, alias?: string): SFCWithInstall<T> => {
  const comp = component

  comp.install = (app: App): void => {
    if (comp.name) {
      app.component(comp.name, comp)
    }
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as SFCWithInstall<T>
}
