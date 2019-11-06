/**
 * Note: 子菜单仅在route children.length>=1时出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时,
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则breadcrumb中不会重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！！！）
 * meta : {
roles: ['admin','editor']    控制页面角色（可以设置多个角色）
title: 'title'               侧边栏和面包屑中显示的名称（推荐设置)
icon: 'svg-name'             图标显示在侧栏中
breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
}
*/

/**
 * constantRoutes
 * a base page that does not have permission requirements 没有权限要求的基页
 * all roles can be accessed 可以访问所有角色
 */
/* Layout */
import Layout from '@/layout'
export default [
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
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
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
