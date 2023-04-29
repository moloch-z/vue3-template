/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormItemProps } from 'ant-design-vue'

declare interface FormItemModel {
  name: string
  onUpdateName: string
}

declare interface FormItemComponentProps {
  placeholder?: string | string[]
  onChange?: <T = unknown>(...arg: T[]) => void
  onInput?: <T = unknown>(...arg: T[]) => void
  onBlur?: <T = unknown>(...arg: T[]) => void
  onFocus?: <T = unknown>(...arg: T[]) => void
}

declare interface FormListItem<T = FormItemComponentProps> extends FormItemProps {
  models?: FormItemModel[]
  is?: string
  slotName?: string
  layout: any
  /**
   * 匿名组件props
   */
  componentProps?: T
  renderFormItem?: (ComponentData: FormListItem, parentProps: any, ctx: any) => JSX.Element
  renderItem?: (ComponentData: FormListItem, parentProps: any, ctx: any) => JSX.Element
}
