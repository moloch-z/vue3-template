/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormListItem } from './form'
import { formFactory, baseLayoutRender, renderItem } from './formFactory'
import { $t } from '@/i18n'
import './style/filterForm.less'
/**
 *  默认按钮
 *
 * @returns {JSX.Element} JSX.Element
 */
export function filterFormButton(): JSX.Element {
  return (
    <div class="filter-form-button">
      <a-button html-type="reset">{$t('Table.filterReset')}</a-button>
      <a-button html-type="search" type="primary">
        {$t('search')}
      </a-button>
    </div>
  )
}

/**
 * a-form-item 渲染函数
 *
 * @param {any} ctx setup return
 * @param {FormListItem} item FormListItem
 * @returns {JSX.Element} vnode
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderFilterFormItem(ctx: any, item: FormListItem): JSX.Element {
  return <a-col {...item.layout}>{renderItem(ctx, item)}</a-col>
}

const UFilterForm = formFactory({
  name: 'UFilterForm',
  components: {
    FilterFormButton: filterFormButton
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layoutRender: (ctx: any) => {
    return (
      <a-row gutter={24} {...ctx.layout}>
        {baseLayoutRender(ctx, renderFilterFormItem)}
      </a-row>
    )
  }
})

export default UFilterForm
