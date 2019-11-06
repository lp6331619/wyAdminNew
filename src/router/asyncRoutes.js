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
 * priv :'_menu:member'           该路由的权限
 * tabs :{}                       权限映射表
 * meta : {
roles: ['admin','editor']         控制页面角色（可以设置多个角色）
title: 'title'                    侧边栏和面包屑中显示的名称（推荐设置)
icon: 'svg-name'                  图标显示在侧栏中
breadcrumb: false                 如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
activeMenu: '/example/list'       如果设置路径，侧边栏将突出显示您设置的路径
}
*/

/**
 * constantRoutes
 * a base page that does not have permission requirements 没有权限要求的基页
 * all roles can be accessed 可以访问所有角色
 */
/* Layout */
import Layout from '@/layout'
export const asyncRoutes = [
  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    priv: '_menu:member', // 会员列表
    meta: { title: '会员管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        priv: 'user:member:list',
        component: () => import('@/views/member/list/list'),
        meta: { title: '会员列表', icon: 'table' },
        children: [{
          path: 'detail',
          hidden: true,
          name: 'MemberDetail',
          component: () => import('@/views/member/list/detail'),
          meta: { title: '会员详情' }
        }],
        tabs: {
          'member.member.list': {
            title: '列表页',
            actions: {
              'member.member.list:search': {
                title: '列表/查询',
                priv: 'user:member:list'
              },
              'member.member.list:count': {
                title: '表头统计',
                priv: 'user:member:count'
              },
              'member.member.list:sale_info': {
                title: '销售统计',
                priv: 'user:member:sale_info'
              },
              'member.member.list:export': {
                hidePriv: true,
                title: '导出Excel',
                priv: '_special:export_csv'
              },
              'member.member.list:assoc_saler': {
                title: '销售关联用户',
                priv: 'user:member:add_association'
              },
              'member.member.list:detail': {
                title: '管理',
                priv: 'user:member:detail'
              },
              'member.member.list:login_user': {
                title: '登录账号',
                priv: 'user:member:admin_login'
              },
              'member.member.list:batch_change_level': {
                title: '修改会员等级',
                priv: 'user:member:update_level'
              },
              'member.member.list:batch_change_saler': {
                title: '修改所属销售',
                priv: 'user:member:update_saler'
              },
              'member.member.list:account': {
                title: '会员财务账户详情',
                priv: 'user:member:account'
              }
            }
          },
          'member.member.info': {
            title: '账号信息',
            actions: {
              'member.member.info:detail': {
                title: '账号信息',
                priv: 'user:member:detail'
              },
              'member.member.info:login_user': {
                title: '登录账号',
                priv: 'user:member:admin_login'
              },
              'member.member.info:change_status': {
                title: '禁用/启用',
                priv: 'user:member:update_status'
              },
              'member.member.info:realinfo': {
                title: '查看实名',
                priv: 'user:member:realinfo_detail'
              },
              'member.member.info:change_mobile': {
                title: '修改手机号',
                priv: 'user:member:update_mobile'
              },
              'member.member.info:change_email': {
                title: '修改邮箱',
                priv: 'user:member:update_email'
              },
              'member.member.info:change_level': {
                title: '修改会员等级',
                priv: 'user:member:update_level'
              },
              'member.member.info:set_password': {
                title: '修改密码',
                priv: 'user:member:set_password'
              },
              'member.member.info:change_saler': {
                title: '修改销售',
                priv: 'user:member:update_saler'
              },
              'member.member.info:finance': {
                title: '查看财务流水',
                priv: 'finance:record:list'
              },
              'member.member.info:order': {
                title: '查看订单',
                priv: 'business:order:list'
              },
              'member.member.info:invoice': {
                title: '查看发票',
                priv: 'finance:invoice:list'
              },
              'member.member.info:product': {
                title: '查看即将到期产品',
                priv: 'product:cloud_vm:list'
              },
              'member.member.info:note_list': {
                title: '备注信息',
                priv: 'user:member:note_list'
              },
              'member.member.info:add_note': {
                title: '添加备注',
                priv: 'user:member:add_note'
              },
              'member.member.info:del_note': {
                title: '删除备注',
                priv: 'user:member:del_note'
              },
              'member.member.info:update_region': {
                title: '修改区域',
                priv: 'user:member:update_region'
              },
              'member.member.info:update_importance': {
                title: '修改重要程度',
                priv: 'user:member:update_importance'
              },
              'member.member.info:update_business_type': {
                title: '修改商业类型',
                priv: 'user:member:update_business_type'
              },
              'member.member.info:update_industry': {
                title: '修改所属行业',
                priv: 'user:member:update_industry'
              }
            }
          },
          'member.member.contact': {
            title: '联系信息',
            actions: {
              'member.member.contact:detail': {
                title: '详情',
                priv: 'user:member:detail'
              },
              'member.member.contact:update': {
                title: '修改联系信息',
                priv: 'user:member:update_contact'
              }
            }
          },
          'member.member.realinfo': {
            title: '实名认证',
            actions: {
              'member.member.realinfo:detail': {
                title: '实名信息',
                priv: 'user:member:realinfo_detail'
              },
              'member.member.realinfo:picture': {
                title: '查看实名图片',
                priv: 'user:member:get_real_info_picture'
              },
              'member.member.realinfo:list': {
                title: '实名记录',
                priv: 'user:member:realinfo_list'
              }
            }
          },
          'member.member.product_count': {
            title: '产品统计',
            actions: {
              'member.member.product_count:detail': {
                title: '产品统计',
                priv: 'user:member:product_counter'
              }
            }
          },
          'member.member.finance': {
            title: '财务信息',
            actions: {
              'member.member.finance:detail': {
                title: '详情',
                priv: 'finance:record:chains'
              }
            }
          },
          'member.member.login_log': {
            title: '登录日志',
            actions: {
              'member.member.login_log:search': {
                title: '登录日志',
                priv: 'log:member_login_log'
              },
              'member.member.login_log:export': {
                hidePriv: true,
                title: '导出Excel',
                priv: '_special:export_csv'
              }
            }
          },
          'member.member.operational_log': {
            title: '操作日志',
            actions: {
              'member.member.operational_log:search': {
                title: '列表/查询',
                priv: 'log:op_log'
              },
              'member.member.oplog:export': {
                hidePriv: true,
                title: '导出Excel',
                priv: '_special:export_csv'
              }
            }
          }
        }
      },
      {
        path: 'realinfo',
        name: 'realinfo',
        priv: 'user:member:realinfo_list',
        component: () => import('@/views/tree/index'),
        meta: { title: '实名审核', icon: 'tree' }
      }
    ]
  }
]
// 筛选有权限的路由
export function screenRoutes(role) {
  const routeBox = []
  asyncRoutes.forEach((item, index) => {
    role[item.priv] ? routeBox.push(item) : ''
    if (item.children) {
      item.children.forEach((child, childIndex) => {
        role[item.priv] ? routeBox[index].children.push(item) : ''
      })
    }
  })
  routeBox.push({ path: '*', redirect: '/404', hidden: true })
  return routeBox
}
