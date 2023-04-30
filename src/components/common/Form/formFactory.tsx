/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref, Component } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { FormListItem } from './form'
import type { RenderComponents, BaseFormPropsType } from './util'
import { _baseFormProps, baseRenderComponents } from './util'
import { useI18nProps } from './hooks'

/**
 * a-form-item 渲染函数
 *
 * @param {any} ctx setup return
 * @param {FormListItem} item FormListItem
 * @param {RenderComponents} renderComponents RenderComponents
 * @returns {JSX.Element} vnode
 */
export function renderItem(ctx: any, item: FormListItem, renderComponents?: RenderComponents): JSX.Element {
  return (
    <a-form-item {...useI18nProps(item)}>{renderComponents ? renderComponents(ctx, item) : baseRenderComponents(ctx, item)}</a-form-item>
  )
}

export type RenderItem = typeof renderItem

/**
 * 布局
 *
 * @param {any} ctx setup return
 * @param {RenderItem} renderLayoutFormItem LayoutFormItem
 * @returns {JSX.Element} vnode
 */
export function baseLayoutRender(ctx: any, renderLayoutFormItem?: RenderItem): JSX.Element {
  return ctx.formList.map(item => {
    const { renderFormItem, ...rest } = item

    const render = (renderFormItem ? renderFormItem : renderLayoutFormItem) || renderItem

    return render(ctx, rest) as JSX.Element
  }) as JSX.Element
}
export type RenderLayout = typeof baseLayoutRender
export type FormRef = Ref<FormInstance>

export interface FormFactoryOptions {
  name: string
  formProps?: Required<BaseFormPropsType>
  components?: { [name: string]: Component }
  layoutRender?: RenderLayout
}

/**
 * form 工厂函数
 *
 * @param {FormFactoryOptions} options FormFactoryOptions
 * @returns {Component} Component
 */
export function formFactory(options: FormFactoryOptions): Component {
  const { name, components, formProps, layoutRender } = options

  return defineComponent({
    name,
    components,
    props: Object.assign({}, _baseFormProps, formProps),
    emits: ['initFinsh'],
    setup(props, ctx) {
      const { emit } = ctx
      const formRef = ref<FormInstance>()

      /**
       * 重置
       */
      function onReset(): void {
        const formData = props.modelValue

        for (const key in props.modelValue) {
          if (Object.prototype.hasOwnProperty.call(props.modelValue, key)) {
            formData[key] = undefined
          }
        }
        formRef.value?.resetFields()
        formRef.value?.$emit('update:modelValue', formData)
      }

      onMounted(() => {
        if (formRef.value) {
          emit('initFinsh', { ...formRef.value })
        }
      })
      return {
        onReset,
        formRef
      }
    },
    render(): JSX.Element {
      return (
        <a-form modelValue={this.modelValue} onReset={this.onReset} ref={'formRef'} {...this.formProps}>
          {layoutRender ? layoutRender(this) : baseLayoutRender(this)}
        </a-form>
      )
    }
  })
}
