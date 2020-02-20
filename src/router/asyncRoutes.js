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
    title: 'title'                    侧边栏和面包屑中显示的名称（推荐设置)
    icon: 'svg-name'                  图标显示在侧栏中
    breadcrumb: false                 如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'       如果设置路径，侧边栏将突出显示您设置的路径
 *}
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
import store from '@/store'
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
        name: 'list',
        priv: 'user:member:list',
        component: () => import('@/views/member/list/list/list.vue'),
        meta: { title: '会员列表', icon: 'table' },
        children: [{
          path: 'detail/:id',
          hidden: true,
          name: 'detail',
          priv: 'user:member:detail',
          meta: { title: '会员详情', activeMenu: '/member/list' },
          component: () => import('@/views/member/list/detail/detail.vue')
        }, {
          path: 'realInfo/:id',
          hidden: true,
          name: 'realInfo',
          priv: 'user:member:detail',
          meta: { title: '实名认证', activeMenu: '/member/list' },
          component: () => import('@/views/member/list/realinfo/realinfo.vue')
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
      },
      {
        path: 'realinfo',
        name: 'realinfo',
        priv: 'user:member:realinfo_list',
        meta: { title: '实名审核', icon: 'tree' },
        component: () => import('@/views/member/realinfo/list/list.vue'),
        children: [{
          path: 'authentication/:id',
          hidden: true,
          name: 'authentication',
          priv: 'user:member:detail',
          meta: { title: '审核详情', activeMenu: '/member/realinfo' },
          component: () => import('@/views/member/realinfo/detail/detail.vue')
        }],
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
        component: () => import('@/views/member/passport/list/list.vue'),
        meta: { title: '通行证', icon: 'tree' },
        children: [{
          path: 'update/:id',
          hidden: true,
          name: 'update',
          priv: 'user:member:detail',
          meta: { title: '详情', activeMenu: '/member/passport' },
          component: () => import('@/views/member/passport/detail/detail.vue')
        }],
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
        component: () => import('@/views/member/level/detail/detail.vue'),
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
        component: () => import('@/views/member/opLog/list/list.vue'),
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
    path: '/combo',
    redirect: '/information/new',
    name: 'combo',
    priv: '_menu:combo',
    component: Layout,
    meta: { title: '套餐管理', icon: 'example' },
    children: [
      {
        path: 'business',
        name: 'business',
        priv: 'business:combo:list',
        meta: { title: '套餐', icon: 'example' },
        component: () => import('@/views/setMeal/business/list/list.vue'),
        children: [{
          path: 'detail/:id',
          hidden: true,
          name: 'businessDetail',
          priv: 'business:combo:detail',
          meta: { title: '套餐详情', activeMenu: '/setMeal/business' },
          component: () => import('@/views/setMeal/business/detail/detail.vue')
        }],
        actions: {
          'combo.combo:search': {
            title: '套餐列表',
            priv: 'business:combo:list'
          },
          'combo.combo:create': {
            title: '套餐规则',
            priv: 'business:combo:create'
          },
          'combo.combo:detail': {
            title: '套餐信息',
            priv: 'business:combo:detail'
          },
          'combo.combo:update': {
            title: '编辑套餐',
            priv: 'business:combo:update'
          },
          'combo.combo:delete': {
            title: '删除套餐',
            priv: 'business:combo:delete'
          }
        }
      }
    ]
  },
  {
    path: '/resource',
    name: 'resource',
    priv: '_menu:resource',
    component: Layout,
    meta: { title: '资源管理', icon: 'example' },
    children: [
      {
        path: 'cloud',
        name: 'resourceCloud',
        priv: 'resource:cloud:node:list',
        redirect: '/resource/cloud/node/node/list',
        meta: { title: '云服务器资源', icon: 'table' },
        component: () => import('@/views/resource/cloud/list/list.vue'),
        children: [{
          path: ':type',
          hidden: true,
          name: 'resourceCloudNode',
          priv: 'resource:cloud:node:list',
          meta: { title: '节点', activeMenu: '/resource/cloud' },
          component: () => import('@/views/resource/cloud/node/list.vue'),
          children: [{
            path: 'node/list',
            hidden: true,
            name: 'resourceCloudNode',
            priv: 'resource:cloud:node:list',
            meta: { title: '节点', activeMenu: '/resource/cloud' },
            component: () => import('@/views/resource/cloud/node/node/node.vue')
          }, {
            path: 'line/list',
            hidden: true,
            name: 'resourceCloudLine',
            priv: 'resource:cloud:line:list',
            meta: { title: '线路', activeMenu: '/resource/cloud' },
            component: () => import('@/views/resource/cloud/node/line/line.vue')
          }, {
            path: 'image/list',
            hidden: true,
            name: 'resourceCloudImage',
            priv: 'resource:cloud:node:image:list',
            meta: { title: '线路', activeMenu: '/resource/cloud' },
            component: () => import('@/views/resource/cloud/node/image/image.vue')
          }, {
            path: 'diskType/list',
            hidden: true,
            name: 'resourceCloudImage',
            priv: 'resource:cloud:node:disk_type:list',
            meta: { title: '磁盘类型', activeMenu: '/resource/cloud' },
            component: () => import('@/views/resource/cloud/node/diskType/diskType.vue')
          }, {
            path: 'cpuMem/list',
            hidden: true,
            name: 'resourceCloudImage',
            priv: 'resource:cloud:node:cpu_mem:list',
            meta: { title: '磁盘类型', activeMenu: '/resource/cloud' },
            component: () => import('@/views/resource/cloud/node/cpuMem/cpuMem.vue')
          }]
        }, {
          path: ':type/list',
          hidden: true,
          name: 'resourceCloudDiskType',
          priv: 'resource:cloud:node:disk_type:list',
          meta: { title: '磁盘类型', activeMenu: '/resource/cloud' },
          component: () => import('@/views/resource/cloud/diskType/diskType.vue')
        }],
        tabs: {
          child: [
            {
              title: '节点',
              actions: {
                'resource.cloud.node:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:node:list'
                },
                'resource.cloud.node:create': {
                  title: '新增',
                  priv: 'resource:cloud:node:create'
                },
                'resource.cloud.node:detail': {
                  title: '详情',
                  priv: 'resource:cloud:node:detail'
                },
                'resource.cloud.node:update': {
                  title: '修改',
                  priv: 'resource:cloud:node:update'
                }
              }
            },
            {
              title: '线路',
              actions: {
                'resource.cloud.node_line:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:node:line:list'
                },
                'resource.cloud.node_line:export': {
                  hidden: true,
                  title: '导出Excel',
                  priv: '_special:export_csv'
                },
                'resource.cloud.node_line:create': {
                  title: '新增',
                  priv: 'resource:cloud:node:line:create'
                },
                'resource.cloud.node_line:detail': {
                  title: '详情',
                  priv: 'resource:cloud:node:line:detail'
                },
                'resource.cloud.node_line:update': {
                  title: '修改',
                  priv: 'resource:cloud:node:line:update'
                }
              }
            },
            {
              title: '镜像',
              actions: {
                'resource.cloud.node_image:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:node:image:list'
                },
                'resource.cloud.node_image:create': {
                  title: '新增',
                  priv: 'resource:cloud:node:image:create'
                },
                'resource.cloud.node_image:detail': {
                  title: '详情',
                  priv: 'resource:cloud:node:image:detail'
                },
                'resource.cloud.node_image:update': {
                  title: '修改',
                  priv: 'resource:cloud:node:image:update'
                }
              }
            },
            {
              title: '硬盘类型',
              actions: {
                'resource.cloud.node_disktype:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:node:disk_type:list'
                },
                'resource.cloud.node_disktype:create': {
                  title: '新增',
                  priv: 'resource:cloud:node:disk_type:create'
                },
                'resource.cloud.node_disktype:detail': {
                  title: '详情',
                  priv: 'resource:cloud:node:disk_type:detail'
                },
                'resource.cloud.node_disktype:update': {
                  title: '修改',
                  priv: 'resource:cloud:node:disk_type:update'
                }
              }
            },
            {
              title: 'CPU内存',
              actions: {
                'resource.cloud.node_cpumem:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:node:cpu_mem:list'
                },
                'resource.cloud.node_cpumem:create': {
                  title: '新增',
                  priv: 'resource:cloud:node:cpu_mem:create'
                },
                'resource.cloud.node_cpumem:detail': {
                  title: '详情',
                  priv: 'resource:cloud:node:cpu_mem:detail'
                },
                'resource.cloud.node_cpumem:update': {
                  title: '修改',
                  priv: 'resource:cloud:node:cpu_mem:update'
                }
              }
            },
            {
              title: 'IP',
              actions: {
                'resource.cloud.ip:search': {
                  title: '列表/查询',
                  priv: 'resource:cloud:ip:list'
                },
                'resource.cloud.ip:create': {
                  title: '新增',
                  priv: 'resource:cloud:ip:create'
                },
                'resource.cloud.ip:detail': {
                  title: '详情',
                  priv: 'resource:cloud:ip:detail'
                },
                'resource.cloud.ip:update': {
                  title: '修改',
                  priv: 'resource:cloud:ip:update'
                }
              }
            }]
        }
      }
      // {
      //   title: 'DDoS资源',
      //   route: '/resource/ddos/region/list',
      //   mark: 'resource:ddos',
      //   priv: 'resource:ddos:region:list',
      //   tabs: {
      //     'resource.ddos.region': {
      //       title: '区域',
      //       actions: {
      //         'resource.ddos.region:search': {
      //           title: '列表/查询',
      //           priv: 'resource:ddos:region:list'
      //         },
      //         'resource.ddos.region:create': {
      //           title: '新增',
      //           priv: 'resource:ddos:region:create'
      //         },
      //         'resource.ddos.region:detail': {
      //           title: '详情',
      //           priv: 'resource:ddos:region:detail'
      //         },
      //         'resource.ddos.region:update': {
      //           title: '修改',
      //           priv: 'resource:ddos:region:update'
      //         }
      //       }
      //     },
      //     'resource.ddos.region_line': {
      //       title: '线路',
      //       actions: {
      //         'resource.ddos.region_line:search': {
      //           title: '列表/查询',
      //           priv: 'resource:ddos:region:line:list'
      //         },
      //         'resource.ddos.region_line:create': {
      //           title: '新增',
      //           priv: 'resource:ddos:region:line:create'
      //         },
      //         'resource.ddos.region_line:detail': {
      //           title: '详情',
      //           priv: 'resource:ddos:region:line:detail'
      //         },
      //         'resource.ddos.region_line:update': {
      //           title: '修改',
      //           priv: 'resource:ddos:region:line:update'
      //         }
      //       }
      //     },
      //     'resource.ddos.ip': {
      //       title: 'IP',
      //       actions: {
      //         'resource.ddos.ip:search': {
      //           title: '列表/查询',
      //           priv: 'resource:ddos:ip:list'
      //         },
      //         'resource.ddos.ip:create': {
      //           title: '新增',
      //           priv: 'resource:ddos:ip:create'
      //         },
      //         'resource.ddos.ip:detail': {
      //           title: '详情',
      //           priv: 'resource:ddos:ip:detail'
      //         },
      //         'resource.ddos.ip:update': {
      //           title: '修改',
      //           priv: 'resource:ddos:ip:update'
      //         }
      //       }
      //     }
      //   }
      // },
      // {
      //   title: 'IDC资源',
      //   route: '/resource/idc/region/list',
      //   mark: 'resource:idc',
      //   priv: 'resource:idc:room:list',
      //   tabs: {
      //     'resource.idc.region': {
      //       title: '区域',
      //       actions: {
      //         'resource.idc.region:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:region:list'
      //         },
      //         'resource.idc.region:create': {
      //           title: '新增',
      //           priv: 'resource:idc:region:create'
      //         },
      //         'resource.idc.region:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:region:detail'
      //         },
      //         'resource.idc.region:update': {
      //           title: '修改',
      //           priv: 'resource:idc:region:update'
      //         },
      //         'resource.idc.region:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:region:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.room': {
      //       title: '机房',
      //       actions: {
      //         'resource.idc.room:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:room:list'
      //         },
      //         'resource.idc.room:create': {
      //           title: '新增',
      //           priv: 'resource:idc:room:create'
      //         },
      //         'resource.idc.room:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:room:detail'
      //         },
      //         'resource.idc.room:update': {
      //           title: '修改',
      //           priv: 'resource:idc:room:update'
      //         },
      //         'resource.idc.room:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:room:delete'
      //         },
      //         'resource.idc.room:getRoom': {
      //           title: '获取机房信息',
      //           priv: 'resource:idc:room:get_room'
      //         }
      //       }
      //     },
      //     'resource.idc.room_line': {
      //       title: '机房线路',
      //       actions: {
      //         'resource.idc.room_line:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:room_line:list'
      //         },
      //         'resource.idc.room_line:create': {
      //           title: '新增',
      //           priv: 'resource:idc:room_line:create'
      //         },
      //         'resource.idc.room_line:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:room_line:detail'
      //         },
      //         'resource.idc.room_line:update': {
      //           title: '修改',
      //           priv: 'resource:idc:room_line:update'
      //         },
      //         'resource.idc.room_line:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:room_line:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.ip_zone': {
      //       title: 'IP分组',
      //       actions: {
      //         'resource.idc.ip_zone:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:ip_zone:list'
      //         },
      //         'resource.idc.ip_zone:create': {
      //           title: '新增',
      //           priv: 'resource:idc:ip_zone:create'
      //         },
      //         'resource.idc.ip_zone:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:ip_zone:detail'
      //         },
      //         'resource.idc.ip_zone:update': {
      //           title: '修改',
      //           priv: 'resource:idc:ip_zone:update'
      //         },
      //         'resource.idc.ip_zone:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:ip_zone:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.ip': {
      //       title: 'IP',
      //       actions: {
      //         'resource.idc.ip:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:ip:list'
      //         },
      //         'resource.idc.ip:create': {
      //           title: '新增',
      //           priv: 'resource:idc:ip:create'
      //         },
      //         'resource.idc.ip:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:ip:detail'
      //         },
      //         'resource.idc.ip:update': {
      //           title: '修改',
      //           priv: 'resource:idc:ip:update'
      //         },
      //         'resource.idc.ip:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:ip:delete'
      //         },
      //         'resource.idc.ip:block': {
      //           title: '封停',
      //           priv: 'resource:idc:ip:block'
      //         },
      //         'resource.idc.ip:un_block': {
      //           title: '解封',
      //           priv: 'resource:idc:ip:un_block'
      //         }
      //       }
      //     },
      //     'resource.idc.cidr': {
      //       title: 'IP段',
      //       actions: {
      //         'resource.idc.cidr:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:cidr:list'
      //         },
      //         'resource.idc.cidr:create': {
      //           title: '新增',
      //           priv: 'resource:idc:cidr:create'
      //         },
      //         'resource.idc.cidr:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:cidr:detail'
      //         },
      //         'resource.idc.cidr:update': {
      //           title: '修改',
      //           priv: 'resource:idc:cidr:update'
      //         },
      //         'resource.idc.cidr:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:cidr:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.cabinet': {
      //       title: '机柜',
      //       actions: {
      //         'resource.idc.cabinet:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:cabinet:list'
      //         },
      //         'resource.idc.cabinet:create': {
      //           title: '新增',
      //           priv: 'resource:idc:cabinet:create'
      //         },
      //         'resource.idc.cabinet:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:cabinet:detail'
      //         },
      //         'resource.idc.cabinet:update': {
      //           title: '修改',
      //           priv: 'resource:idc:cabinet:update'
      //         },
      //         'resource.idc.cabinet:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:cabinet:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.device': {
      //       title: '设备管理',
      //       actions: {
      //         'resource.idc.device:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:device:list'
      //         },
      //         'resource.idc.device:create': {
      //           title: '新增',
      //           priv: 'resource:idc:device:create'
      //         },
      //         'resource.idc.device:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:device:detail'
      //         },
      //         'resource.idc.device:update': {
      //           title: '修改',
      //           priv: 'resource:idc:device:update'
      //         },
      //         'resource.idc.device:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:device:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.device.type': {
      //       title: '设备类型',
      //       actions: {
      //         'resource.idc.device.type:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:device:type:list'
      //         },
      //         'resource.idc.device.type:create': {
      //           title: '新增',
      //           priv: 'resource:idc:device:type:create'
      //         },
      //         'resource.idc.device.type:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:device:type:detail'
      //         },
      //         'resource.idc.device.type:update': {
      //           title: '修改',
      //           priv: 'resource:idc:device:type:update'
      //         },
      //         'resource.idc.device.type:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:device:type:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.device.spec': {
      //       title: '设备规格',
      //       actions: {
      //         'resource.idc.device.spec:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:device:spec:list'
      //         },
      //         'resource.idc.device.spec:create': {
      //           title: '新增',
      //           priv: 'resource:idc:device:spec:create'
      //         },
      //         'resource.idc.device.spec:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:device:spec:detail'
      //         },
      //         'resource.idc.device.spec:update': {
      //           title: '修改',
      //           priv: 'resource:idc:device:spec:update'
      //         },
      //         'resource.idc.device.spec:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:device:spec:delete'
      //         }
      //       }
      //     },
      //     'resource.idc.device.oem': {
      //       title: '设备品牌',
      //       actions: {
      //         'resource.idc.device.oem:search': {
      //           title: '列表/查询',
      //           priv: 'resource:idc:device:oem:list'
      //         },
      //         'resource.idc.device.oem:create': {
      //           title: '新增',
      //           priv: 'resource:idc:device:oem:create'
      //         },
      //         'resource.idc.device.oem:detail': {
      //           title: '详情',
      //           priv: 'resource:idc:device:oem:detail'
      //         },
      //         'resource.idc.device.oem:update': {
      //           title: '修改',
      //           priv: 'resource:idc:device:oem:update'
      //         },
      //         'resource.idc.device.oem:delete': {
      //           title: '删除',
      //           priv: 'resource:idc:device:oem:delete'
      //         }
      //       }
      //     }
      //   }
      // },
      // {
      //   title: '操作系统',
      //   route: '/resource/os/version/list',
      //   mark: 'resource:os',
      //   priv: 'resource:os:version:list',
      //   actions: {
      //     'resource.os:search': {
      //       title: '列表/查询',
      //       priv: 'resource:os:version:list'
      //     },
      //     'resource.os:create': {
      //       title: '新增',
      //       priv: 'resource:os:version:create'
      //     },
      //     'resource.os:detail': {
      //       title: '详情',
      //       priv: 'resource:os:version:detail'
      //     },
      //     'resource.os:update': {
      //       title: '修改',
      //       priv: 'resource:os:version:update'
      //     }
      //   }
      // },
      // {
      //   title: '线路',
      //   route: '/resource/idc/line/list',
      //   mark: 'resource:idc:line',
      //   priv: 'resource:idc:line:list',
      //   actions: {
      //     'resource.line:search': {
      //       title: '列表/查询',
      //       priv: 'resource:idc:line:list'
      //     },
      //     'resource.line:create': {
      //       title: '新增',
      //       priv: 'resource:idc:line:create'
      //     },
      //     'resource.line:detail': {
      //       title: '详情',
      //       priv: 'resource:idc:line:detail'
      //     },
      //     'resource.line:update': {
      //       title: '修改',
      //       priv: 'resource:idc:line:update'
      //     },
      //     'resource.line:delete': {
      //       title: '删除',
      //       priv: 'resource:idc:line:delete'
      //     }
      //   }
      // }
    ]
  },
  {
    path: '/information',
    component: Layout,
    redirect: '/information/new',
    name: 'information',
    meta: { title: '网站管理', icon: 'example' },
    children: [
      {
        path: 'news',
        name: 'informationNew',
        priv: 'site:article:list',
        meta: { title: '新闻公告', icon: 'table' },
        component: () => import('@/views/information/news/list/list.vue'),
        children: [{
          path: 'detail',
          hidden: true,
          name: 'informationNewDetail',
          priv: 'site:article:detail',
          meta: { title: '新闻详情', activeMenu: '/information/news' },
          component: () => import('@/views/information/news/detail/detail.vue')
        }, {
          path: 'create',
          hidden: true,
          name: 'informationNewCreate',
          priv: 'site:article:create',
          meta: { title: '创建新闻', activeMenu: '/information/news' },
          component: () => import('@/views/information/news/create/create.vue')
        }],
        actions: {
          'site.news:search': {
            title: '列表/查询',
            priv: 'site:article:list'
          },
          'site.news:type': {
            title: '分类管理',
            priv: 'site:article_cate:list'
          },
          'site.news:create': {
            title: '创建新闻',
            priv: 'site:article:create'
          },
          'site.news:upload': {
            title: '上传附件',
            priv: 'site:article:upload'
          },
          'site.news:detail': {
            title: '查看',
            priv: 'site:article:detail'
          },
          'site.news:update': {
            title: '编辑',
            priv: 'site:article:update'
          },
          'site.news:delete': {
            title: '删除',
            priv: 'site:article:delete'
          }
        }
      },
      {
        path: 'help',
        name: 'informationHelp',
        priv: 'site:article:help',
        meta: { title: '帮助中心', icon: 'table' },
        component: () => import('@/views/information/help/list/list.vue'),
        children: [{
          path: 'detail',
          hidden: true,
          name: 'informationNewDetail',
          priv: 'site:article:detail',
          meta: { title: '帮助详情', activeMenu: '/information/help' },
          component: () => import('@/views/information/help/detail/detail.vue')
        }, {
          path: 'create',
          hidden: true,
          name: 'informationNewCreate',
          priv: 'site:article:create',
          meta: { title: '创建新文章', activeMenu: '/information/help' },
          component: () => import('@/views/information/help/create/create.vue')
        }],
        actions: {
          'site.help:search': {
            title: '列表/查询',
            priv: 'site:article:help'
          },
          'site.help:type': {
            title: '分类管理',
            priv: 'site:article_cate:list'
          },
          'site.help:create': {
            title: '新增帮助',
            priv: 'site:article:create'
          },
          'site.help:upload': {
            title: '上传附件',
            priv: 'site:article:upload'
          },
          'site.help:detail': {
            title: '查看',
            priv: 'site:article:detail'
          },
          'site.help:update': {
            title: '编辑',
            priv: 'site:article:update'
          },
          'site.help:delete': {
            title: '删除',
            priv: 'site:article:delete'
          }
        }
      },
      {
        path: 'group',
        name: 'informationGroup',
        priv: 'site:article:group',
        meta: { title: '集团新闻', icon: 'table' },
        component: () => import('@/views/information/group/list/list.vue'),
        children: [{
          path: 'detail',
          hidden: true,
          name: 'informationNewDetail',
          priv: 'site:article:detail',
          meta: { title: '帮助详情', activeMenu: '/information/group' },
          component: () => import('@/views/information/group/detail/detail.vue')
        }, {
          path: 'create',
          hidden: true,
          name: 'informationNewCreate',
          priv: 'site:article:create',
          meta: { title: '创建新文章', activeMenu: '/information/group' },
          component: () => import('@/views/information/group/create/create.vue')
        }],
        actions: {
          'site.bloc:search': {
            title: '列表/查询',
            priv: 'site:article:group'
          },
          'site.bloc:type': {
            title: '分类管理',
            priv: 'site:article_cate:list'
          },
          'site.bloc:create': {
            title: '创建新闻',
            priv: 'site:article:create'
          },
          'site.bloc:upload': {
            title: '上传附件',
            priv: 'site:article:upload'
          },
          'site.bloc:detail': {
            title: '查看',
            priv: 'site:article:detail'
          },
          'site.bloc:update': {
            title: '编辑',
            priv: 'site:article:update'
          },
          'site.bloc:delete': {
            title: '删除',
            priv: 'site:article:delete'
          }
        }
      },
      {
        priv: 'site:article_cate:list',
        path: 'class',
        name: 'informationClass',
        meta: { title: '分类管理', icon: 'table' },
        component: () => import('@/views/information/class/list/list.vue'),
        actions: {
          'site.news_category:search': {
            title: '列表/查询',
            priv: 'site:article_cate:list'
          },
          'site.news_category:create': {
            title: '添加分类',
            priv: 'site:article_cate:create'
          },
          'site.news_category:detail': {
            title: '查看',
            priv: 'site:article_cate:detail'
          },
          'site.news_category:update': {
            title: '编辑',
            priv: 'site:article_cate:update'
          },
          'site.news_category:delete': {
            title: '删除',
            priv: 'site:article_cate:delete'
          }
        }
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    priv: '_menu:message',
    component: Layout,
    redirect: '/message/template',
    meta: { title: '消息模版', icon: 'example' },
    children: [
      {
        path: 'template',
        name: 'messageTemplate',
        priv: 'message:template:list',
        meta: { title: '消息模板', icon: 'example' },
        component: () => import('@/views/message/template/list/list.vue'),
        children: [{
          path: 'detail/:id',
          hidden: true,
          name: 'templateDetail',
          priv: 'message:template:detail',
          meta: { title: '更新内容', activeMenu: '/message/template' },
          component: () => import('@/views/message/template/detail/detail.vue')
        }],
        actions: {
          'message.template:search': {
            title: '模版列表',
            priv: 'message:template:list'
          },
          'message.template:detail': {
            title: '模版信息',
            priv: 'message:template:detail'
          },
          'message.template:content': {
            title: '内容设置',
            priv: 'message:template:content'
          },
          'message.template:create': {
            title: '创建自定义模版',
            priv: 'message:template:create'
          },
          'message.template:delete': {
            title: '删除自定义模版',
            priv: 'message:template:delete'
          }
        }
      },
      {
        path: 'subscribe',
        name: 'messageSubscribe',
        priv: 'message:subscribe:list',
        meta: { title: '消息订阅', icon: 'example' },
        component: () => import('@/views/message/subscribe/list/list.vue'),
        children: [{
          path: 'updateUsers/:id',
          hidden: true,
          name: 'templateupdateUser',
          priv: 'message:subscribe:detail',
          meta: { title: '修改分组用户', activeMenu: '/message/subscribe' },
          component: () => import('@/views/message/subscribe/updateUsers/updateUsers.vue')
        }],
        actions: {
          'message.subscribe:search': {
            title: '分组列表',
            priv: 'message:subscribe:list'
          },
          'message.subscribe:create': {
            title: '创建分组',
            priv: 'message:subscribe:create'
          },
          'message.subscribe:detail': {
            title: '分组信息',
            priv: 'message:subscribe:detail'
          },
          'message.subscribe:update': {
            title: '修改分组',
            priv: 'message:subscribe:update'
          },
          'message.subscribe:delete': {
            title: '删除分组',
            priv: 'message:subscribe:delete'
          },
          'message.subscribe:set_users': {
            title: '设置分组用户',
            priv: 'message:subscribe:set_users'
          }
        }
      }
    ]
  },
  {
    path: '/express',
    name: 'express',
    priv: '_menu:express',
    component: Layout,
    redirect: '/express/list',
    meta: { title: '物流管理', icon: 'example' },
    children: [{
      path: 'list',
      name: 'expressList',
      priv: 'express:express:list',
      meta: { title: '快递列表', icon: 'example' },
      component: () => import('@/views/express/express/list/list.vue'),
      actions: {
        'express.express:search': {
          title: '列表/查询',
          priv: 'express:express:list'
        },
        'express.express:create': {
          title: '添加快递',
          priv: 'express:express:create'
        },
        'express.express:detail': {
          title: '快递信息',
          priv: 'express:express:detail'
        },
        'express.express:update': {
          title: '更新信息',
          priv: 'express:express:update'
        }
      }
    },
    {
      path: 'company',
      name: 'companyList',
      priv: 'express:company:list',
      meta: { title: '快递公司', icon: 'example' },
      component: () => import('@/views/express/company/list/list.vue'),
      actions: {
        'express.company:search': {
          title: '列表/查询',
          priv: 'express:company:list'
        },
        'express.company:create': {
          title: '添加',
          priv: 'express:company:create'
        },
        'express.company:detail': {
          title: '详情',
          priv: 'express:company:detail'
        },
        'express.company:update': {
          title: '更新',
          priv: 'express:company:update'
        },
        'express.company:delete': {
          title: '删除',
          priv: 'express:company:delete'
        }
      }
    }
    ]
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org/user',
    name: 'org',
    priv: '_menu:org',
    meta: { title: '组织架构', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'user',
        priv: 'org:user:list',
        component: () => import('@/views/org/user/list/list.vue'),
        meta: { title: '员工管理', icon: 'table' },
        children: [{
          path: 'detail/:id',
          hidden: true,
          name: 'orgUserDetail',
          priv: 'org:user:detail',
          meta: { title: '员工详情', activeMenu: '/org/user' },
          component: () => import('@/views/org/user/detail/detail.vue')
        }, {
          path: 'updateRoles/:id',
          hidden: true,
          name: 'updateRoles',
          priv: 'org:user:change_role',
          meta: { title: '更新角色', activeMenu: '/org/user' },
          component: () => import('@/views/org/user/roles/roles.vue')
        }],
        actions: {
          'org.user:search': {
            title: '列表/查询',
            priv: 'org:user:list'
          },
          'org.user:create': {
            title: '添加',
            priv: 'org:user:create'
          },
          'org.user:detail': {
            title: '详情',
            priv: 'org:user:detail'
          },
          'org.user:update': {
            title: '修改',
            priv: 'org:user:update'
          },
          'org.user:change_role': {
            title: '变更角色',
            priv: 'org:user:change_role'
          },
          'org.user:change_status': {
            title: '修改状态',
            priv: 'org:user:change_status'
          },
          'org.user:set_password': {
            title: '设置密码',
            priv: 'org:user:set_password'
          },
          'org.user:delete': {
            title: '删除',
            priv: 'org:user:delete'
          }
        }
      },
      {
        path: 'area',
        name: 'area',
        priv: 'org:area:list',
        component: () => import('@/views/org/area/list/list.vue'),
        meta: { title: '分公司', icon: 'table' },
        actions: {
          'org.area:search': {
            title: '列表/查询',
            priv: 'org:area:list'
          },
          'org.area:create': {
            title: '添加',
            priv: 'org:area:create'
          },
          'org.area:detail': {
            title: '详情',
            priv: 'org:area:detail'
          },
          'org.area:update': {
            title: '修改',
            priv: 'org:area:update'
          },
          'org.area:delete': {
            title: '删除',
            priv: 'org:area:delete'
          }
        }
      },
      {
        path: 'dept',
        name: 'dept',
        priv: 'org:dept:list',
        component: () => import('@/views/org/dept/list/list.vue'),
        meta: { title: '事业部', icon: 'table' },
        children: [{
          path: 'detail/:id',
          hidden: true,
          name: 'orgDeptDetail',
          priv: 'org:dept:detail',
          meta: { title: '员工详情', activeMenu: '/org/dept' },
          component: () => import('@/views/org/dept/detail/detail.vue')
        }, {
          path: 'updateRoles/:id',
          hidden: true,
          name: 'orgUpdateRoles',
          priv: 'org:user:change_role',
          meta: { title: '修改角色', activeMenu: '/org/dept' },
          component: () => import('@/views/org/user/roles/roles.vue')
        },
        {
          path: 'addRoles/:id',
          hidden: true,
          name: 'orgAddRoles',
          priv: 'org:user:change_role',
          meta: { title: '新增角色', activeMenu: '/org/dept' },
          component: () => import('@/views/org/dept/addRoles/addRoles.vue')
        }],
        actions: {
          'org.dept:search': {
            title: '列表/查询',
            priv: 'org:dept:list'
          },
          'org.dept:create': {
            title: '添加',
            priv: 'org:dept:create'
          },
          'org.dept:detail': {
            title: '详情',
            priv: 'org:dept:detail'
          },
          'org.dept:update': {
            title: '修改',
            priv: 'org:dept:update'
          },
          'org.dept:delete': {
            title: '删除',
            priv: 'org:dept:delete'
          }
        }
      }, {
        path: 'areaDept',
        name: 'areaDept',
        priv: 'org:area_dept:list',
        component: () => import('@/views/org/areaDept/list/list.vue'),
        meta: { title: '分公司部门', icon: 'table' },
        actions: {
          'org.area_dept:search': {
            title: '列表/查询',
            priv: 'org:area_dept:list'
          },
          'org.area_dept:create': {
            title: '添加',
            priv: 'org:area_dept:create'
          },
          'org.area_dept:detail': {
            title: '详情',
            priv: 'org:area_dept:detail'
          },
          'org.area_dept:update': {
            title: '修改',
            priv: 'org:area_dept:update'
          },
          'org.area_dept:delete': {
            title: '删除',
            priv: 'org:area_dept:delete'
          }
        }
      }, {
        path: 'role',
        name: 'role',
        priv: 'org:role:list',
        component: () => import('@/views/org/role/list/list.vue'),
        meta: { title: '角色管理', icon: 'table' },
        actions: {
          'org.role:search': {
            title: '列表/查询',
            priv: 'org:role:list'
          },
          'org.role:create': {
            title: '添加',
            priv: 'org:role:create'
          },
          'org.role:detail': {
            title: '详情',
            priv: 'org:role:detail'
          },
          'org.role:update': {
            title: '修改',
            priv: 'org:role:update'
          },
          'org.role:delete': {
            title: '删除',
            priv: 'org:role:delete'
          }
        }
      }, {
        path: 'roleLevel',
        name: 'roleLevel',
        priv: 'org:role:list',
        component: () => import('@/views/org/roleLevel/list/list.vue'),
        meta: { title: '角色等级管理', icon: 'table' },
        actions: {
          'org.role_level:search': {
            title: '列表/查询',
            priv: 'org:role_level:list'
          },
          'org.role_level:create': {
            title: '添加',
            priv: 'org:role_level:create'
          },
          'org.role_level:detail': {
            title: '详情',
            priv: 'org:role_level:detail'
          },
          'org.role_level:update': {
            title: '修改',
            priv: 'org:role_level:update'
          },
          'org.role_level:delete': {
            title: '删除',
            priv: 'org:role_level:delete'
          }
        }
      }, {
        path: 'prodRole',
        name: 'prodRole',
        priv: 'org:product:role:detail',
        component: () => import('@/views/org/prodRole/list/list.vue'),
        meta: { title: '事业部角色映射关系', icon: 'table' },
        actions: {
          'org.product_role:detail': {
            title: '详情',
            priv: 'org:product_role:role:detail'
          },
          'org.product_role:update': {
            title: '修改',
            priv: 'org:product_role:role:update'
          }
        }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/ipResourcesLog',
    name: 'log',
    priv: '_menu:log',
    meta: { title: '日志管理', icon: 'example' },
    children: [{
      path: 'ipResourcesLog',
      name: 'ipResourcesLog',
      priv: 'resource:log:owner_log:list',
      component: () => import('@/views/log/ipResourcesLog/list/list.vue'),
      meta: { title: 'IP使用日志', icon: 'table' },
      actions: {
        'log.ipowner:search': {
          title: '列表/查询',
          priv: 'resource:log:owner_log:list'
        }
      }
    },
    {
      path: 'opLog',
      name: 'opLog',
      priv: 'log:op_log',
      meta: { title: '操作日志', icon: 'table' },
      component: () => import('@/views/log/opLog/list/list.vue'),
      actions: {
        'log.oplog:search': {
          title: '列表/查询',
          priv: 'log:op_log'
        },
        'log.oplog:export': {
          hidden: true,
          title: '导出Excel',
          priv: '_special:export_csv'
        }
      }
    },
    {
      path: 'memberLoginLog',
      name: 'memberLoginLog',
      priv: 'log:member_login_log',
      meta: { title: '会员登录日志', icon: 'table' },
      component: () => import('@/views/log/memberLoginLog/list/list.vue'),
      children: [{
        path: 'detail/:id',
        hidden: true,
        name: 'logMember_login_logDetail',
        priv: 'log:member_login_log:detail',
        meta: { title: '会员登录日志详情', activeMenu: '/log/memberLoginLog' },
        component: () => import('@/views/log/memberLoginLog/detail/detail.vue')
      }],
      actions: {
        'log.member_login:search': {
          title: '列表/查询',
          priv: 'log:member_login_log'
        },
        'log.member_login:export': {
          hidden: true,
          title: '导出Excel',
          priv: '_special:export_csv'
        },
        'log.member_login:detail': {
          title: '详情',
          priv: 'log:member_login_log'
        }
      }
    },
    {
      path: 'userLoginLog',
      name: 'userLoginLog',
      meta: { title: '员工登录日志', icon: 'table' },
      priv: 'log:org_user_login_log',
      component: () => import('@/views/log/userLoginLog/list/list.vue'),
      children: [{
        path: 'detail/:id',
        hidden: true,
        name: 'userLoginLogDetail',
        priv: 'log:org_user_login_log',
        meta: { title: '员工登录日志详情', activeMenu: '/log/userLoginLog' },
        component: () => import('@/views/log/userLoginLog/detail/detail.vue')
      }],
      actions: {
        'log.org_user_login:search': {
          title: '列表/查询',
          priv: 'log:org_user_login_log'
        },
        'log.org_user_login:export': {
          hidden: true,
          title: '导出Excel',
          priv: '_special:export_csv'
        },
        'log.org_user_login:detail': {
          title: '详情',
          priv: 'log:org_user_login_log'
        }
      }
    },
    {
      path: 'errorLog',
      name: 'errorLog',
      meta: { title: '错误日志', icon: 'table' },
      priv: 'log:error_log',
      component: () => import('@/views/log/errorLog/list/list.vue'),
      children: [{
        path: 'detail/:id',
        hidden: true,
        name: 'errorLogDetail',
        priv: 'log:error_log',
        meta: { title: '错误日志详情', activeMenu: '/log/errorLog' },
        component: () => import('@/views/log/errorLog/detail/detail.vue')
      }],
      actions: {
        'log.error:search': {
          title: '列表/查询',
          priv: 'log:error_log'
        },
        'log.error:export': {
          hidden: true,
          title: '导出Excel',
          priv: '_special:export_csv'
        }
      }
    },
    {
      path: 'sysTask',
      name: 'sysTask',
      meta: { title: '后台任务', icon: 'table' },
      component: () => import('@/views/log/sysTask/list/list.vue'),
      children: [{
        path: 'detail/:id',
        hidden: true,
        name: 'sysTaskDetail',
        priv: 'log:sys_task',
        meta: { title: '后台任务详情', activeMenu: '/log/sysTask' },
        component: () => import('@/views/log/sysTask/detail/detail.vue')
      }],
      actions: {
        'log.task:search': {
          title: '列表/查询',
          priv: 'log:sys_task'
        },
        'log.task:export': {
          hidden: true,
          title: '导出Excel',
          priv: '_special:export_csv'
        },
        'log.task:detail': {
          title: '详情',
          priv: 'log:sys_task'
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
  if (item.children && item.children.length) {
    item.children = item.children.filter(child => {
      recursion(child, role)
      return role[child.priv]
    })
  }
  return role[item.priv]
}
// 筛选有权限的路由
export function screenRoutes(role) {
  var routeBox = []
  // 是否有全部权限
  if (store.state.user.data.privileges['_special:all']) {
    routeBox = asyncRoutes
  } else {
    const box = JSON.parse(JSON.stringify(asyncRoutes)) // 深拷贝不完全.
    // 深拷贝component
    asyncRoutes.forEach((item, index) => {
      box[index].component = item.component
      if (item.children && item.children.length) {
        item.children.forEach((t, i) => {
          box[index].children[i].component = t.component
          if (t.children && t.children.length) {
            t.children.forEach((t1, i1) => {
              box[index].children[i].children[i1].component = t1.component
            })
          }
        })
      }
    })
    routeBox = box.filter(item => recursion(item, role))
  }
  routeBox.push({ path: '*', redirect: '/404', hidden: true })
  return routeBox
}
