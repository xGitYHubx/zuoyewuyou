import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    name: 'home',
    redirect: '/zywy',
    children: [{
      path: 'zywy',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '作业无忧', icon: '书2' }
    }]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '分配订单', icon: 'order2' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/record/index'),
        meta: { title: '消费记录', icon: 'order2' }
      }
    ]
  },
  {
    path: '/aboutUs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AboutUs',
        component: () => import('@/views/aboutUs/index'),
        meta: { title: '关于我们', icon: 'aboutUs' }
      }
    ]
  },
  {
    path: '/histOrder',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'histOrder',
        component: () => import('@/views/order/histOrder'),
        meta: { title: '历史订单', icon: 'hist' }
      }
    ]
  },
  {
    path: '/register',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'register',
        component: () => import('@/views/register/index'),
        meta: { title: '注册老师', icon: 'hist' }
      }
    ]
  },
  {
    path: '/exchange',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'exchange',
        component: () => import('@/views/exchange/index'),
        meta: { title: '兑换学币', icon: '结算' }
      }
    ]
  },
  {
    path: '/tchCommand',
    component: Layout,
    // meta: { title: '教师推荐', icon: 'hist' },
    children: [
      {
        path: 'tchcmd',
        name: 'tchcmd',
        component: () => import('@/views/teacherCommand/index'),
        meta: { title: '教师推荐', icon: 'teacher' }
      },
      {
        path: 'addcmd',
        name: 'addcmd',
        hidden: true,
        component: () => import('@/views/teacherCommand/addCommand'),
        meta: { title: '新建推荐', icon: 'hist' }
      },
      {
        path: 'editcmd',
        name: 'editcmd',
        hidden: true,
        component: () => import('@/views/teacherCommand/editCommand'),
        meta: { title: '编辑推荐', icon: 'hist' }
      }
    ]
  },
  {
    path: '/logout',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'logout',
        component: () => import('@/views/logout/index'),
        meta: { title: '注销账户', icon: '结算' }
      }
    ]
  },
  {
    path: '/example',
    hidden: true,
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/configEdit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ConfigEdit',
        component: () => import('@/views/configEdit/configEdit'),
        meta: { title: '参数配置', icon: 'form' }
      }
    ]
  },
  {
    path: '/editPassword',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'EditPassword',
        component: () => import('@/views/editPassword/editpassword'),
        meta: { title: '修改密码', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    hidden: true,

    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    hidden: true,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
