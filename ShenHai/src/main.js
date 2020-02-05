// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import * as esriLoader from 'esri-loader'

Vue.prototype.esriLoader = esriLoader
import 'v-org-tree/dist/v-org-tree.css'
//**********************************************************************************************************************
//弹性布局公用样式引入
import '@/assets/css/boxSty.less'
//元素边距公用样式引入
import '@/assets/css/boxGauge.less'
//iview组件替换样式引入
import '@/assets/css/iviewSty.less'
import 'video.js/dist/video-js.css'
/**
 *自定义全局组件
 */
import pagerTit from './components/A_components/pagerTit'
Vue.component('pagerTit',pagerTit)
import tabPager from './components/A_components/tabPager'
Vue.component('tabPager',tabPager)

//**********************************************************************************************************************
/**
 *网络数据请求 参数配置
 */
import apis from './axios/api';
Vue.prototype.apis = apis;
/**
 *时间转换
 */
import moment from 'moment'
Vue.prototype.moment = moment
/**
 * 网络数据请求
 */
import http from './axios/index';
Vue.prototype.$http = http;
import swal from 'sweetalert2'
Vue.prototype.swal = swal;
/**
 *util全局方法
 */
import util from './libs/util2'
Vue.prototype.util = util;
/**
 * 内封装字典存储与获取
 */
import dictUtil from './libs/dictUtil'
Vue.prototype.dictUtil = dictUtil;
/**
 * 注册全局的自定义方法
 */
import AF from './libs/publicMethods'
Vue.prototype.AF = AF;
/**
 * session 缓存
 */
import session from './libs/session';
Vue.prototype.session = session
//**********************************************************************************************************************

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})
