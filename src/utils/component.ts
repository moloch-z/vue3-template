import type { Slots, VNode } from 'vue'
import type { App, Plugin } from 'vue'

const wrapperKey = Symbol()

export type PropWrapper<T> = { [wrapperKey]: T }

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
