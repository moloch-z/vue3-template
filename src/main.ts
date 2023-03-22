import VueDOMPurifyHTML from 'vue-dompurify-html'
import components from '@/components'
import directive from '@/directive'
import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import pinia from '@/store'
import i18n from '@/i18n'
// 匿名组件需要
import Antd from 'ant-design-vue'

import '@/assets/style/index.less'
// unplugin-auto-import 没处理插件，需要单独处理样式
// import 'ant-design-vue/es/notification/style/css'
// import 'ant-design-vue/es/message/style/css'

/**
 * bootstrap
 */
async function bootstrap(): Promise<void> {
  const app = createApp(App)

  app.use(pinia).use(i18n).use(Antd).use(components).use(router).use(VueDOMPurifyHTML).use(directive).mount('#app', true)
}

bootstrap()
