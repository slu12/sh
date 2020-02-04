import axios from 'axios';
import qs from 'qs';
import ajaxUrl from './api'
import { getToken,getAppid } from '@/libs/util'

// 订单分配权限
let url = ajaxUrl.url

let httpInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  withCredentials: true
});
httpInstance.url = '';
// 添加请求拦截器 数据请求之前
httpInstance.interceptors.request.use((config) => {
  console.log('数据拦截',config);
  // if(config.method == 'get'){
  //   if (config.url.indexOf('?') < 0){
  //       config.url += '?t='+ new Date().getTime()
  //   }else{
  //       config.url += '&t='+ new Date().getTime()
  //   }
  // }else if(config.method == 'post' && ((config.params && config.params.timers == undefined) || (config.data && config.data.timers == undefined))) {
  //   if(config.params){
  //     config.params['timers'] = new Date().getTime()
  //   }else if(config.data){
  //     config.data['timers'] = new Date().getTime()
  //   }
  // }
  //   if (!(config.data && config.data.notShowLoading && config.data.notShowLoading == 'true')
  //   && !(config.params && config.params.notShowLoading && config.params.notShowLoading == 'true')){
  // }


  var headers = config.headers;
  var contentType = headers['Content-Type'];
  if (config.url == '/serverless/api/addRoom') {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  } else {
  }
  if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
    try {
      // 如果是数组对象，将转换出来的数组字符串中的[]关键字替换，这样方便后台接收数据
      config.data = config.data.replace(/(%5B\d%5D)/g, '');
    } catch (e) {

    }
  }
  // 在发送请求之前做些什么
  // if (Cookies.get('accessToken')) {
  //   let accessToken = JSON.parse(Cookies.get('accessToken'));
  // config.headers.token = accessToken.token;
  let token = ""
  token = '7WaPE1EcreVDHylMXiNsohekym3oDkd31XVYvo0S8EyHsMxkUFDPuv+7zfp4opAU7b6LiTCNXwN+GeXAcZnuI9G2mXByByPpEF0XqdKB8yh/0Zu73YikeOr2ZG9mujHrRfh8avCvOurZO8K/hDDVfNU8lG9cIQh2VgRA0L8x1FM='
  if(getToken()){
    config.headers.token = getToken()
  }
  if(getAppid()){
    config.headers.appid = getAppid();//'A0001'
  }
  // }
  console.log(config);
  return config;
}, function (error) {
  console.log(error);
  // 对请求错误做些什么
  return Promise.reject(error);
  // iView.Spin.hide()
});

// 添加响应拦截器 数据响应之后
httpInstance.interceptors.response.use((response) => {
  var v = this;
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  return Promise.reject(error.response.data);
});
export default httpInstance;
