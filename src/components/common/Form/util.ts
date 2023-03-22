/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropType, VNode } from 'vue'
import type { FormListItem } from './form'
import { useI18nProps } from './hooks'
import { getSlot } from '@/utils'

export const _baseFormProps = Object.freeze({
  formList: {
    type: Array as PropType<FormListItem[]>,
    required: true,
    default: (): FormListItem[] => []
  },
  modelValue: {
    type: Object,
    default: (): object => ({})
  },
  formProps: {
    type: Object,
    default: (): object => ({})
  },
  layout: {
    type: Object,
    default: (): object => ({})
  }
})

export type BaseFormPropsType = typeof _baseFormProps

/**
 * 匿名组件
 *
 * @param {string} slotName slotName
 * @param {any} ctx 父组件 setup return
 * @returns {JSX.Element} vnode
 */
export function renderSlot(slotName: string, ctx: any): VNode[] | undefined {
  return getSlot(ctx.slots, slotName)
}

/**
 * 匿名组件
 *
 * @param {object} ctx setup return
 * @param {FormListItem} componentData 匿名组件数据
 * @returns {JSX.Element | void} vnode
 */
export function renderComponent(ctx: any, componentData: FormListItem): JSX.Element | void {
  const { is, componentProps, name } = componentData

  if (is) {
    const newComponentProps = { ...useI18nProps(componentProps) }

    // console.log(ctx.formState)

    if (name) {
      Object.assign(newComponentProps, {
        value: ctx.modelValue[name as string],
        'onUpdate:value': value => {
          ctx.modelValue[name as string] = value
        }
      })
    }

    return h(resolveComponent(is), { ...newComponentProps })
  }
}

/**
 * 匿名组件,支持渲染slot
 *
 * @param {any} ctx 父组件 setup return
 * @param {FormListItem} componentData 匿名组件数据
 * @returns {JSX.Element} vnode
 */
export function baseRenderComponents(ctx: any, componentData: FormListItem): JSX.Element | VNode[] | void {
  if (componentData.is) {
    return renderComponent(ctx, componentData)
  }

  return renderSlot(componentData.slotName || '', ctx)
}

export type RenderComponents = typeof baseRenderComponents
