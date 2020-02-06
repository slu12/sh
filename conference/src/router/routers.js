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

export default [
  // {
  //   path: '/',
  //   name: 'SCRN',
  //   meta: {
  //     title: '超級管理',
  //     hideInMenu: true
  //   },
  //   component: () => import('@/scrn')
  // }
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
    path: '/',
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
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  /*{
    path: '/system_setting',
    name: 'SYSTEM-SETTING',
    meta: {
      icon: 'logo-buffer',
      title: '----'
    },
    component: Main,
    children: [
      {
        path: 'setting',
        name: 'setting',
        meta: {
          icon: 'md-person',
          title: '基础配置',
        },
        component: () => import('@/viewConference/setting')
      },
    ]
  },*/
  {
    path: '/system-video',
    name: 'SYSTEM-VIDEO',
    meta: {
      icon: 'logo-buffer',
      title: '视频会议'
    },
    component: Main,
    children: [
      {
        path: 'video',
        name: 'VIDEO',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '视频会议'
        },
        component: () => import('@/viewConference/video')
      },
    ]
  },
  {
    path: '/room',
    name: 'ROOM',
    meta: {
      title: '会议直播',
      hideInMenu: true
    },
    component: () => import('@/viewConference/video/videoMess.vue')
  },
  {
    path: '/system-hisvideo',
    name: 'SYSTEM-HISVIDEO',
    meta: {
      icon: 'logo-buffer',
      title: '视频会议'
    },
    component: Main,
    children: [
      {
        path: 'hisvideo',
        name: 'HISVIDEO',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '历史会议'
        },
        component: () => import('@/viewConference/hisVideo')
      },
      {
        path: '/hisroom',
        name: 'HISROOM',
        meta: {
          title: '会议回看',
          hideInMenu: true
        },
        component: () => import('@/viewConference/hisVideo/videoMess.vue')
      }
    ]
  },

  {
    path: '/video-postpone',
    name: 'VIDEO-POSTPONE',
    meta: {
      icon: 'logo-buffer',
      title: '网络申请'
    },
    component: Main,
    children: [
      {
        path: 'postpone',
        name: 'POSTPONE',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '延期申请'
        },
        component: () => import('@/viewConference/postpone')
      },
    ]
  },
  {
    path: '/video-evidence',
    name: 'VIDEO-EVIDENCE',
    meta: {
      icon: 'logo-buffer',
      title: '网络申请'
    },
    component: Main,
    children: [
      {
        path: 'evidence',
        name: 'EVIDENCE',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '提交证据'
        },
        component: () => import('@/viewConference/evidence')
      },
    ]
  },
  {
    path: '/video-record',
    name: 'VIDEO-RECORD',
    meta: {
      icon: 'logo-buffer',
      title: '网络申请'
    },
    component: Main,
    children: [
      {
        path: 'record',
        name: 'RECORD',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '在线立案'
        },
        component: () => import('@/viewConference/record')
      },
    ]
  }
]
