import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'historyTarck',
      title: '历史轨迹',
      name: 'historyTarck_new',
      component: () => import('@/viewDevelop/historyTarck')
    },
  ]
};
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: !true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: !true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        // component: () => import('@/view/mapDemo')
        component: () => import('@/viewDevelop/home')

        // component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/',
    name: 'ship-Track',
    redirect: '/ship-Track',
    meta: {
      hideInMenu: !true,
      notCache: true
    },
    component: Main,
    children: [
      {
        path: '/ship-Track',
        name: 'ship-Track',
        meta: {
          hideInMenu: !true,
          notCache: true,
          icon: 'ios-cog',
          title: '船舶监控',

        },
        component: () => import('@/viewDevelop/Shipmanagement/ship-Track')
      },
    ]
  },


  {
    path: '/system',
    name: 'SYSTEM',
    meta: {
      icon: 'logo-buffer',
      title: '系统管理'
    },
    component: Main,
    children: [
      // {
      //   path: 'system-user',
      //   name: 'SYSTEM-USER',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '用户管理'
      //   },
      //   component: () => import('@/viewDevelop/system/systemUser')
      // },
      // {
      //   path: 'organization',
      //   name: 'ORGANIZATION',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '组织架构'
      //   },
      //   component: () => import('@/viewDevelop/system/organization')
      // },
      {
        path: 'system-user',
        name: 'system-user',
        meta: {
          icon: 'md-person',
          title: '用户管理',
        },
        component: () => import('@/viewDevelop/system/system-user')
      },
      {
        path: 'system-role',
        name: 'system-role',
        meta: {
          icon: 'md-contacts',
          title: '角色管理',
        },
        component: () => import('@/viewDevelop/system/system-role')
      },
      // {
      //   path: 'system-framework',
      //   name: 'system-framework',
      //   meta: {
      //     icon: 'md-contacts',
      //     title: '厂商管理',
      //   },
      //
      //   component: () => import('@/viewDevelop/system/system-framework')
      // },
      {
        path: 'system-dictionary',
        name: 'system-dictionary',
        meta: {
          icon: 'md-contacts',
          title: '字典管理',
        },
        component: () => import('@/viewDevelop/system/system-dictionary')
      },
      {
        path: 'terminal-car',
        name: 'terminal-car',
        meta: {
          icon: 'ios-cog',
          title: '北斗终端管理',
        },
        component: () => import('@/viewDevelop/terminal/terminal-car')
      },
      {
        path: 'system-video',
        name: 'system-video',
        meta: {
          icon: 'ios-cog',
          title: '北斗视频终端',
        },
        component: () => import('@/viewDevelop/system/system-video')
      },
      {
        path: 'system-framework',
        name: 'system-framework',
        meta: {
          icon: 'md-contacts',
          title: '组织机构',
        },
        component: () => import('@/viewDevelop/system/system-framework')
      },
      // {
      //   path: 'system-function',
      //   icon: 'android-clipboard',
      //   name: 'system-function',
      //   title: '功能管理',
      //   component: () => import('@/viewDevelop/system/system-function')
      // },
      // {
      //   path: 'system-daily',
      //   name: 'system-daily',
      //   meta: {
      //     icon: 'md-contacts',
      //     title: '日志管理',
      //   },
      //   component: () => import('@/viewDevelop/system/system-daily')
      // },
      // {
      //   path: 'system-suggestions',
      //   icon: 'android-clipboard',
      //   name: 'system-suggestions',
      //   title: '意见反馈',
      //   component: () => import('@/viewDevelop/system/system-suggestions')
      // },
      // {
      //   path: 'system-notice',
      //   icon: 'android-clipboard',
      //   name: 'system-notice',
      //   title: '设备终端',
      //   component: () => import('@/viewDevelop/system/system-notice')
      // },
      // {
      //   path: 'system-propelling',
      //   icon: 'android-clipboard',
      //   name: 'system-propelling',
      //   title: '智能站牌',
      //   component: () => import('@/viewDevelop/system/system-propelling')
      // },
      // {
      //   path: 'system-advertising',
      //   icon: 'android-clipboard',
      //   name: 'system-advertising',
      //   title: '活动管理',
      //   component: () => import('@/viewDevelop/system/system-advertising')
      // }
    ]
  },
  // {
  //   path: '/terminal',
  //   name: 'terminal',
  //   meta: {
  //     icon: 'ios-cog',
  //     title: '终端管理',
  //     showAlways:true
  //   },
  //   component: Main,
  //   children:[
  //
  //     // {
  //     //   path: 'terminal_OBD',
  //     //   name: 'terminal_OBD',
  //     //   meta: {
  //     //     icon: 'ios-cog',
  //     //     title: '终端拔出管理',
  //     //   },
  //     //   component: () => import('@/viewDevelop/terminal/terminal_OBD')
  //     // },
  //     // {
  //     //   path: 'terminal_GPS',
  //     //   name: 'terminal_GPS',
  //     //   meta: {
  //     //     icon: 'ios-cog',
  //     //     title: '终端数据库对接',
  //     //   },
  //     //   component: () => import('@/viewDevelop/terminal/terminal_GPS')
  //     // },
  //     // {
  //     //   path: 'terminal-station',
  //     //   icon: 'android-clipboard',
  //     //   name: 'terminal-station',
  //     //   title: '智能站牌',
  //     //   component: () => import('@/viewDevelop/terminal/terminal-station')
  //     // },
  //   ]
  // },
  {
    path: '/Shipmanagement',
    name: 'Shipmanagement',
    meta: {
      icon: 'ios-cog',
      title: '船舶管理',
    },
    component: Main,
    children: [
      {
        path: 'ship-mess',
        name: 'ship-mess',
        meta: {
          icon: 'ios-cog',
          title: '船舶详情',
        },
        component: () => import('@/viewDevelop/Shipmanagement/ship-mess')
      },
      // {
      //   path: 'ship-Track',
      //   name: 'ship-Track',
      //   meta: {
      //     icon: 'ios-cog',
      //     title: '船舶监控',
      //     hideInMenu: !true,
      //     notCache: true,
      //   },
      //   component: () => import('@/viewDevelop/Shipmanagement/ship-Track')
      // },
      {
        path: 'historyTarck',
        name: 'historyTarck_new',
        meta: {
          icon: 'ios-cog',
          title: '查看历史轨迹',
          hideInMenu: true
        },
        component: () => import('@/viewDevelop/historyTarck')
      },
      {
        path: 'watch-video',
        name: 'WATCH_VIDEO',
        meta: {
          icon: 'ios-cog',
          title: '视频查看',
          hideInMenu: true
        },
        component: () => import('@/viewDevelop/Shipmanagement/watchVideo')
      },
      {
        path: 'ship-trajectory',
        name: 'ship-trajectory',
        meta: {
          icon: 'ios-cog',
          title: '轨迹管理',
        },
        component: () => import('@/viewDevelop/Shipmanagement/ship-trajectory')
      },
      {
        path: 'ship-Video',
        name: 'ship-Video',
        meta: {
          icon: 'ios-cog',
          title: '视频监控',
        },
        component: () => import('@/viewDevelop/Shipmanagement/ship-Video')
      },
      // {
      //   path: 'ship-Video-html',
      //   name: 'ship-Video-html',
      //   meta: {
      //     icon: 'ios-cog',
      //     title: '视频监控(html)',
      //   },
      //   component: () => import('@/viewDevelop/Shipmanagement/ship-Video-html')
      // },
      {
        path: 'CloudPhoto',
        name: 'CloudPhoto',
        meta: {
          icon: 'ios-cog',
          title: '云图片库',
        },
        component: () => import('@/viewDevelop/Shipmanagement/CloudPhoto')
      },
      {
        path: 'CloudVideo',
        name: 'CloudVideo',
        meta: {
          icon: 'ios-cog',
          title: '云视频库',
        },
        component: () => import('@/viewDevelop/Shipmanagement/CloudVideo')
      },
      // {
      //   path: 'ship-team',
      //   name: 'ship-team',
      //   meta: {
      //     icon: 'ios-cog',
      //     title: '船队管理',
      //   },
      //   component: () => import('@/viewDevelop/Shipmanagement/ship-team')
      // },
      // {
      //   path: 'ship-certificate',
      //   name: 'ship-certificate',
      //   meta: {
      //     icon: 'ios-cog',
      //     title: '证书管理',
      //   },
      //   component: () => import('@/viewDevelop/Shipmanagement/ship-certificate')
      // },
      {
        path: 'ElectronicFence',
        name: 'ElectronicFence',
        meta: {
          icon: 'ios-cog',
          title: '电子围栏',
        },
        component: () => import('@/viewDevelop/Shipmanagement/ElectronicFence')
      },
      {
        path: 'tiaojianji',
        name: 'tiaojianji',
        meta: {
          icon: 'ios-cog',
          title: '船队管理',
        },
        component: () => import('@/viewDevelop/Shipmanagement/tiaojianji')
      },
      // {
      //   path: 'ship-Up',
      //   name: 'ship-Up',
      //   meta: {
      //     icon: 'ios-cog',
      //     title: '船舶数据上传',
      //   },
      //   component: () => import('@/viewDevelop/Shipmanagement/ship-Up')
      // }

    ]
  },
  // {
  //   path: '/Personnel',
  //   name: 'Personnel',
  //   meta: {
  //     icon: 'ios-cog',
  //     title: '人事管理',
  //   },
  //   component: Main,
  //   children:[
  //     {
  //       path: '/boatman',
  //       name: 'boatman',
  //       meta: {
  //         icon: 'ios-cog',
  //         title: '船员管理',
  //       },
  //       component: () => import('@/viewDevelop/Personnel/boatman')
  //     },
  //     {
  //       path: '/Ship-Manning',
  //       name: 'Ship-Manning',
  //       meta: {
  //         icon: 'ios-cog',
  //         title: '船舶配员',
  //       },
  //       component: () => import('@/viewDevelop/Personnel/Ship-Manning')
  //     },
  //     {
  //       path: '/certificate',
  //       name: 'certificate',
  //       meta: {
  //         icon: 'ios-cog',
  //         title: '船员证书',
  //       },
  //       component: () => import('@/viewDevelop/Personnel/certificate')
  //     },
  //   ]
  //
  // },
  {
    path: '/security',
    name: 'security',
    meta: {
      icon: 'ios-cog',
      title: '安全管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: '/rule',
        name: 'rule',
        meta: {
          icon: 'ios-cog',
          title: '规则管理',
        },
        component: () => import('@/viewDevelop/security/rule')
      },
    ]

  },


  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: !true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tree_select_page',
  //       name: 'tree_select_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '树状下拉选择器'
  //       },
  //       component: () => import('@/view/components/tree-select/index.vue')
  //     },
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'drag_drawer_page',
  //       name: 'drag_drawer_page',
  //       meta: {
  //         icon: 'md-list',
  //         title: '可拖拽抽屉'
  //       },
  //       component: () => import('@/view/components/drag-drawer')
  //     },
  //     {
  //       path: 'org_tree_page',
  //       name: 'org_tree_page',
  //       meta: {
  //         icon: 'ios-people',
  //         title: '组织结构树'
  //       },
  //       component: () => import('@/view/components/org-tree')
  //     },
  //     {
  //       path: 'tree_table_page',
  //       name: 'tree_table_page',
  //       meta: {
  //         icon: 'md-git-branch',
  //         title: '树状表格'
  //       },
  //       component: () => import('@/view/components/tree-table/index.vue')
  //     },
  //     {
  //       path: 'cropper_page',
  //       name: 'cropper_page',
  //       meta: {
  //         icon: 'md-crop',
  //         title: '图片裁剪'
  //       },
  //       component: () => import('@/view/components/cropper/cropper.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: !true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: !true,
  //     title: 'argu'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal',
  //
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true,
      title: '401'
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true,
      title: '500'
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true,
      title: '404'
    },
    component: () => import('@/view/error-page/404.vue')
  },
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
  // { path: 'historyTarck', title: '历史轨迹', name: 'historyTarck_new', component: () => import('@/viewDevelop/historyTarck') },
  // { path: 'historyPath', title: '历史轨迹', name: 'historypath', component: () => import('@/views/whdx/OperationMonitoring/VehicleMonitoring/HistoryPath') },

]

