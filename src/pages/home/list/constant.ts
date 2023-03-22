/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { $t } from '@/i18n'

export const listConfig = {
  formItems: [
    {
      label: 'name',
      name: 'name',
      is: 'a-input',
      layout: { span: 6 },
      componentProps: { allowClear: true, placeholder: '' }
    },
    {
      label: 'age',
      name: 'age',
      is: 'a-input-number',
      componentProps: { allowClear: true, min: 1, max: 150 },
      layout: { span: 6 }
    },
    {
      label: 'tag',
      name: 'tag',
      is: 'a-select',
      layout: { span: 6 },
      componentProps: {
        allowClear: true,
        options: () => [
          { label: $t('NICE'), value: 'NICE' },
          { label: $t('NICEDEVELOPER'), value: 'NICEDEVELOPER' },
          { label: $t('LOSER'), value: 'LOSER' },
          { label: $t('TEACHER'), value: 'TEACHER' },
          { label: $t('COOL'), value: 'COOL' }
        ]
      }
    },
    {
      label: 'createTime',
      name: 'createTime',
      is: 'a-range-picker',
      layout: { span: 6 },
      componentProps: {
        allowClear: true,
        format: 'YYYY/MM/DD'
      }
    },
    {
      label: 'address',
      name: 'address',
      is: 'a-input',
      layout: { span: 6 },
      componentProps: {
        allowClear: true
      }
    },
    {
      is: 'FilterFormButton',
      layout: { span: 18 }
    }
  ]
}
