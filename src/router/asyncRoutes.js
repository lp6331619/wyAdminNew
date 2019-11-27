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
tabs:{}                           权限列表所用
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
    name: 'member',
    priv: '_menu:member', // 会员列表
    meta: { title: '会员管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'memberList',
        priv: 'user:member:list',
        component: () => import('@/views/member/list/list'),
        meta: { title: '会员列表', icon: 'table' },
        children: [{
          path: 'detail',
          hidden: true,
          name: 'memberDetail',
          priv: 'user:member:list',
          meta: { title: '会员详情', icon: 'table' },
          component: () => import('@/views/member/list/detail')
        }],
        tabs: {
          child: [{
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
                hidden: true,
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
          {
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
          {
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
          {
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
          {
            title: '产品统计',
            actions: {
              'member.member.product_count:detail': {
                title: '产品统计',
                priv: 'user:member:product_counter'
              }
            }
          },
          {
            title: '财务信息',
            actions: {
              'member.member.finance:detail': {
                title: '详情',
                priv: 'finance:record:chains'
              }
            }
          },
          {
            title: '登录日志',
            actions: {
              'member.member.login_log:search': {
                title: '登录日志',
                priv: 'log:member_login_log'
              },
              'member.member.login_log:export': {
                hidden: true,
                title: '导出Excel',
                priv: '_special:export_csv'
              }
            }
          },
          {
            title: '操作日志',
            actions: {
              'member.member.operational_log:search': {
                title: '列表/查询',
                priv: 'log:op_log'
              },
              'member.member.oplog:export': {
                hidden: true,
                title: '导出Excel',
                priv: '_special:export_csv'
              }
            }
          }]
        }
      }, {
        path: 'realinfo',
        name: 'realinfo',
        priv: 'user:member:realinfo_list',
        component: () => import('@/views/tree/index'),
        meta: { title: '实名审核', icon: 'tree' },
        tabs: {
          child: [
            {
              title: '列表页',
              actions: {
                'member.realinfo.list:search': {
                  title: '列表/查询',
                  priv: 'user:member:realinfo_list'
                },
                'member.realinfo.list:export': {
                  hidden: true,
                  title: '导出Excel',
                  priv: '_special:export_csv'
                },
                'member.realinfo.list:detail': {
                  title: '查看',
                  priv: 'user:member:realinfo_detail'
                }
              }
            },
            {
              title: '详情页',
              actions: {
                'member.realinfo.info:detail': {
                  title: '实名认证详情',
                  priv: 'user:member:realinfo_detail'
                },
                'member.realinfo.info:audit': {
                  title: '实名审核',
                  priv: 'user:member:realInfo_audit'
                },
                'member.realinfo.info:log': {
                  title: '实名日志',
                  priv: 'user:member:realinfo_log'
                }
              }
            }
          ]
        }
      }, {
        path: 'passport',
        name: 'passport',
        priv: 'user:passport:list',
        component: () => import('@/views/tree/index'),
        meta: { title: '通行证', icon: 'tree' },
        tabs: {
          child: [
            {
              title: '列表页',
              actions: {
                'member.passport.list:search': {
                  title: '列表/查询',
                  priv: 'user:passport:list'
                },
                'member.passport.list:export': {
                  hidden: true,
                  title: '导出Excel',
                  priv: '_special:export_csv'
                },
                'member.passport.list:create': {
                  title: '创建',
                  priv: 'user:passport:create'
                },
                'member.passport.list:detail': {
                  title: '详情',
                  priv: 'user:passport:detail'
                }
              }
            },
            {
              title: '详情页',
              actions: {
                'member.passport.info:detail': {
                  title: '查看详情',
                  priv: 'user:passport:detail'
                },
                'member.realinfo.info:update': {
                  title: '修改通行证',
                  priv: 'user:passport:update'
                }
              }
            }
          ]
        }
      }, {
        path: 'level',
        name: 'level',
        priv: 'user:level:discount_detail',
        component: () => import('@/views/tree/index'),
        meta: { title: '会员等级管理', icon: 'tree' },
        actions: {
          'member.level:detail': {
            title: '等级/折扣详情',
            priv: 'user:level:discount_detail'
          },
          'member.level:update_discount': {
            title: '编辑折扣',
            priv: 'user:level:update_discount'
          },
          'member.level:create': {
            title: '创建会员等级',
            priv: 'user:level:create'
          },
          'member.level:update': {
            title: '修改会员等级',
            priv: 'user:level:update'
          },
          'member.level:delete': {
            title: '删除会员等级',
            priv: 'user:level:delete'
          },
          'member.level:change_level': {
            title: '迁移会员',
            priv: 'user:level:move'
          }
        }
      }, {
        path: 'oplog',
        name: 'oplog',
        priv: 'log:op_log',
        component: () => import('@/views/tree/index'),
        meta: { title: '操作日志', icon: 'tree' },
        actions: {
          'member.oplog:search': {
            title: '列表/查询',
            priv: 'log:op_log'
          },
          'member.oplog:export': {
            hidden: true,
            title: '导出Excel',
            priv: '_special:export_csv'
          }
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/priv',
    name: 'system',
    priv: '_menu:system',
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        path: 'priv',
        name: 'priv',
        priv: 'system:privilege:detail',
        component: () => import('@/views/system/priv/index'),
        meta: { title: '权限管理', icon: 'table' },
        actions: {
          'system.priv:detail': {
            title: '权限信息',
            priv: 'system:privilege:detail'
          },
          'system.priv:config': {
            title: '设置权限',
            priv: 'system:privilege:set'
          }
        }
      },
      {
        path: 'setting',
        name: 'setting',
        priv: 'system:setting:detail',
        component: () => import('@/views/system/setting/index'),
        meta: { title: '参数设置', icon: 'table' },
        actions: {
          'system.setting:detail': {
            title: '参数信息',
            priv: 'system:setting:detail'
          },
          'system.setting:config': {
            title: '设置参数',
            priv: 'system:setting:set'
          }
        }
      }
    ]
  }
]

// 递归获取有权限的子菜单
function recursion(item, role) {
  if (item.children && item.children.length > 0) {
    item.children = item.children.filter(child => {
      recursion(child, role)
      return role[child.priv]
    })
  }
  return role[item.priv]
}
// 筛选有权限的路由
export function screenRoutes(role) {
  let routeBox = []
  routeBox = asyncRoutes.filter(item => {
    return recursion(item, role)
  })
  routeBox.push({ path: '*', redirect: '/404', hidden: true })
  return routeBox
}
