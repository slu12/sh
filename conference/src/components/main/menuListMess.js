export default {
  admin: [
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      meta: {
        notCache: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          icon: 'md-home',
          meta: {
            hideInMenu: false,
            title: '首页',
            notCache: false,
          },
        }
      ]
    },
    {
      path: '/system-video',
      name: 'SYSTEM-VIDEO',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'video',
          name: 'VIDEO',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '视频会议'
          },
        },
      ]
    },
    {
      path: '/system-hisvideo',
      name: 'SYSTEM-HISVIDEO',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'hisvideo',
          name: 'HISVIDEO',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '历史会议'
          },
        },
      ]
    },

    {
      path: '/video-postpone',
      name: 'VIDEO-POSTPONE',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'postpone',
          name: 'POSTPONE',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '延期申请'
          },
        },
      ]
    },
    {
      path: '/video-evidence',
      name: 'VIDEO-EVIDENCE',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'evidence',
          name: 'EVIDENCE',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '提交证据'
          },
        },
      ]
    },
    {
      path: '/video-record',
      name: 'VIDEO-RECORD',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'record',
          name: 'RECORD',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '在线立案'
          },
        },
      ]
    },
  ],
  video:[
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      meta: {
        notCache: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          icon: 'md-home',
          meta: {
            hideInMenu: false,
            title: '首页',
            notCache: false,
          },
        }
      ]
    },
    {
      path: '/system-video',
      name: 'SYSTEM-VIDEO',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'video',
          name: 'VIDEO',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '视频会议'
          },
        },
      ]
    },
    {
      path: '/system-hisvideo',
      name: 'SYSTEM-HISVIDEO',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'hisvideo',
          name: 'HISVIDEO',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '历史会议'
          },
        },
      ]
    },
  ],
  query:[
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      meta: {
        notCache: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          icon: 'md-home',
          meta: {
            hideInMenu: false,
            title: '首页',
            notCache: false,
          },
        }
      ]
    },
    {
      path: '/video-postpone',
      name: 'VIDEO-POSTPONE',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'postpone',
          name: 'POSTPONE',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '延期申请'
          },
        },
      ]
    },
    {
      path: '/video-evidence',
      name: 'VIDEO-EVIDENCE',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'evidence',
          name: 'EVIDENCE',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '提交证据'
          },
        },
      ]
    },
    {
      path: '/video-record',
      name: 'VIDEO-RECORD',
      meta: {
        icon: 'logo-buffer',
        title: '----'
      },
      children: [
        {
          path: 'record',
          name: 'RECORD',
          icon: 'md-arrow-dropdown-circle',
          meta: {
            title: '在线立案'
          },
        },
      ]
    },
  ]
}
