import type { Component } from 'vue'
import { shallowMount } from '@vue/test-utils'
import pinia from '@/store'
import * as Antd from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import { setActivePinia } from 'pinia'

export function shallowMountComponent(App: Component, props = {}) {
  setActivePinia(pinia)
  const stubs = {}

  for (const i in Icons) {
    if (Object.prototype.hasOwnProperty.call(Icons, i)) {
      const Icon = Icons[i]
      if (Icon.name) {
        stubs[Icon.name] = Icon
      }
    }
  }
  for (const key in Antd) {
    if (Object.prototype.hasOwnProperty.call(Antd, key)) {
      const AComponent = Antd[key]

      if (AComponent.name && AComponent.name.startsWith('A')) {
        stubs[AComponent.name] = AComponent
      }
    }
  }

  return shallowMount(
    App,
    Object.assign(
      {
        global: {
          pinia: pinia,
          stubs
        }
      },
      props
    )
  )
}
