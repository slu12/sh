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
      }
    ]
  },
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
      }
    ]
  },
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
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'ios-cog',
      title: '船舶调度'
    },
    component: Main,
    children: [
      {
        path: 'driver_management',
        name: 'driver_management',
        meta: {
          icon: 'ios-cog',
          title: '驾驶员管理'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/DriverManagement')
      },
      {
        path: 'establish',
        name: 'establish',
        meta: {
          icon: 'ios-cog',
          title: '订单创建'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/Establish')
      },
      {
        path: 'toexamine',
        name: 'toexamine',
        meta: {
          icon: 'ios-cog',
          title: '订单审核'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/ToExamine')
      },
      {
        path: 'dz_confirm',
        name: 'dz_confirm',
        meta: {
          icon: 'ios-cog',
          title: '队长审核'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/dz_Confirm')
      },
      {
        path: 'confirm',
        name: 'confirm',
        meta: {
          icon: 'ios-cog',
          title: '订单确认'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/Confirm')
      },
      {
        path: 'assignment',
        name: 'assignment',
        meta: {
          icon: 'ios-cog',
          title: '订单分派(小船)'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/Assignment')
      },
      {
        path: 'assignment_max',
        name: 'assignment_max',
        meta: {
          icon: 'ios-cog',
          title: '订单分派(大船)'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/Assignment_max')
      },
      {
        path: 'consult',
        name: 'consult',
        meta: {
          icon: 'ios-cog',
          title: '订单查询'
        },
        component: () => import('@/viewDevelop/VehicleScheduling/OrderManagement/Consult')
      }
    ]
  },
  {
    path: '/echarts',
    name: 'echarts',
    meta: {
      icon: 'ios-cog',
      title: '数据报表'
    },
    component: Main,
    children: [
      {
        path: 'safe_driving',
        name: 'safe_driving',
        meta: {
          icon: 'ios-cog',
          title: '安全驾驶'
        },
        component: () => import('@/viewDevelop/Echarts/SafeDriving')
      },
      {
        path: 'collection_statistics',
        name: 'collection_statistics',
        meta: {
          icon: 'ios-cog',
          title: '收款统计'
        },
        component: ()=> import('@/viewDevelop/Echarts/CollectionStatistics')
      },
      {
        path: 'order_statistics',
        name: 'order_statistics',
        meta: {
          icon: 'ios-cog',
          title: '订单统计'
        },
        component: () => import('@/viewDevelop/Echarts/OrderStatistics')
      },
      {
        path: 'overspeed_statistics',
        name: 'overspeed_statistics',
        meta: {
          icon: 'ios-cog',
          title: '超速统计'
        },
        component: () => import('@/viewDevelop/Echarts/OverspeedStatistics')
      },
      {
        path: 'seimbursement_statistics',
        name: 'seimbursement_statistics',
        meta: {
          icon: 'ios-cog',
          title: '报销记账'
        },
        component: () => import('@/viewDevelop/Echarts/ReimbursementStatistics')
      },
      {
        path: 'payment_statistics',
        name: 'payment_statistics',
        meta: {
          icon: 'ios-cog',
          title: '付款统计'
        },
        component: () => import('@/viewDevelop/Echarts/PaymentStatistics')
      },
      {
        path: 'terminal_anomaly',
        name: 'terminal_anomaly',
        meta: {
          icon: 'ios-cog',
          title: '终端异常'
        },
        component: () => import('@/viewDevelop/Echarts/TerminalAnomaly')
      },
      {
        path: 'traffic_statistics',
        name: 'traffic_statistics',
        meta: {
          icon: 'ios-cog',
          title: '出船统计'
        },
        component: () => import('@/viewDevelop/Echarts/TrafficStatistics')
      },
      {
        path: 'vehicle_accident',
        name: 'vehicle_accident',
        meta: {
          icon: 'ios-cog',
          title: '事故管理'
        },
        component: () => import('@/viewDevelop/Echarts/VehicleAccident')
      }
    ]
  },
  {
    path: '/financial_settlement',
    name: 'financial_settlement',
    meta: {
      icon: 'ios-cog',
      title: '财务结算'
    },
    component: Main,
    children: [
      {
        path: 'accounting_formula',
        name: 'accounting_formula',
        meta: {
          icon: 'ios-cog',
          title: '核算公式',
        },
        component: () => import('@/viewDevelop/FinancialSettlement/AccountingFormula')
      },
      {
        path: 'payment_management',
        name: 'payment_management',
        meta: {
          icon: 'ios-cog',
          title: '应付单据',
        },
        component: () => import('@/viewDevelop/FinancialSettlement/PaymentManagement')
      },
      {
        path: 'receivables_management',
        name: 'receivables_management',
        meta: {
          icon: 'ios-cog',
          title: '应收单据',
        },
        component: () => import('@/viewDevelop/FinancialSettlement/ReceivablesManagement')
      },
      {
        path: 'reimbursement',
        name: 'reimbursement',
        meta: {
          icon: 'ios-cog',
          title: '报销记账',
        },
        component: () => import('@/viewDevelop/FinancialSettlement/Reimbursement')
      }
    ]
  },
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
  // { path: 'historyTarck', title: '历史轨迹', name: 'historyTarck_new', component: () => import('@/viewDevelop/historyTarck') },
  // { path: 'historyPath', title: '历史轨迹', name: 'historypath', component: () => import('@/views/whdx/OperationMonitoring/VehicleMonitoring/HistoryPath') },

]

