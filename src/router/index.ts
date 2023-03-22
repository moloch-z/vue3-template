import { $t } from '@/i18n'
import { apiTokenSession } from '@/utils'
import { notification } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routeRecordRaw'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (['/login'].includes(to.path)) {
    next()
  } else {
    // 判断token是否失效

    if (apiTokenSession()) {
      next()
    } else {
      notification.info({
        message: $t('pleaseLogin'),
        duration: 2
      })
      next({ path: '/login' })
    }
  }
})

export default router
