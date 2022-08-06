import { createRouter, createWebHashHistory } from 'vue-router'

import NProgress from 'nprogress'
import type { RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/buttonDemo'
  },
  {
    path: '/buttonDemo',
    name: 'ButtonDemo',
    component: () =>
      import(/* webpackChunkName: "buttonDemo" */ '@/views/ButtonDemo.vue')
  },
  {
    path: '/checkboxDemo',
    name: 'CheckboxDemo',
    component: () =>
      import(/* webpackChunkName: "checkboxDemo" */ '@/views/CheckboxDemo.vue')
  },
  {
    path: '/listDemo',
    name: 'ListDemo',
    component: () =>
      import(/* webpackChunkName: "listDemo" */ '@/views/ListDemo.vue')
  },
  {
    path: '/inputDemo',
    name: 'InputDemo',
    component: () =>
      import(/* webpackChunkName: "inputDemo" */ '@/views/InputDemo.vue')
  },
  {
    path: '/selectDemo',
    name: 'SelectDemo',
    component: () =>
      import(/* webpackChunkName: "selectDemo" */ '@/views/SelectDemo.vue')
  },
  {
    path: '/paginationDemo',
    name: 'paginationDemo',
    component: () =>
      import(/* webpackChunkName: "testPinia" */ '@/views/paginationDemo.vue')
  },
  {
    path: '/iconDemo',
    name: 'IconDemo',
    component: () => import('@/views/iconDemo.vue')
  },
  {
    path: '/dropDownDemo',
    name: 'DropDownDemo',
    component: () => import('@/views/dropDownDemo.vue')
  },
  {
    path: '/modalDemo',
    name: 'modalDemo',
    component: () =>
      import(/* webpackChunkName: "testPinia" */ '@/views/modalDemo.vue')
  },
  {
    path: '/treeDemo',
    name: 'TreeDemo',
    component: () => import('@/views/TreeDemo.vue')
  },
  {
    path: '/treeSelectDemo',
    name: 'TreeSelectDemo',
    component: () => import('@/views/TreeSelectDemo.vue')
  },
  {
    path: '/confirmDemo',
    name: 'confirmDemo',
    component: () => import('@/views/confirmDemo.vue')
  },
  {
    path: '/messageDemo',
    name: 'messageDemo',
    component: () => import('@/views/messageDemo.vue')
  },
  {
    path: '/noticeDemo',
    name: 'noticeDemo',
    component: () => import('@/views/noticeDemo.vue')
  },
  {
    path: '/badgeDemo',
    name: 'badgeDemo',
    component: () => import('@/views/badgeDemo.vue')
  },
  {
    path: '/tabsDemo',
    name: 'TabsDemo',
    component: () => import('@/views/tabsDemo.vue')
  },
  {
    path: '/switchDemo',
    name: 'switchDemo',
    component: () => import('@/views/switchDemo.vue')
  },
  {
    path: '/drawerDemo',
    name: 'DrawerDemo',
    component: () => import('@/views/DrawerDemo.vue')
  },
  {
    path: '/radioDemo',
    name: 'radioDemo',
    component: () => import('@/views/radioDemo.vue')
  },
  {
    path: '/tagDemo',
    name: 'TagDemo',
    component: () => import('@/views/TagDemo.vue')
  },
  {
    path: '/cardDemo',
    name: 'cardDemo',
    component: () => import('@/views/cardDemo.vue')
  },
  {
    path: '/tooltipDemo',
    name: 'tooltipDemo',
    component: () => import('@/views/TooltipDemo.vue')
  },
  {
    path: '/popoverDemo',
    name: 'popoverDemo',
    component: () => import('@/views/PopoverDemo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
