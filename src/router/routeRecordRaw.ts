// const LAYOUT = (): Promise<typeof import('@/components/layouts/home.vue')> => import('@/components/layouts/home.vue')
import Home from '@/pages/home/Index.vue'

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/monitor',
    children: [
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('../pages/home/monitor/Index.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('../pages/home/list/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/Index.vue')
  }
]
