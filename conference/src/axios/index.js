import axios from 'axios';
import qs from 'qs';
import ajaxUrl from './api'
import {getToken, getAppid} from '@/libs/util'

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
  console.log('数据拦截', config);
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
  // id: "1232312"
  // phone: "158****9956"
  // idcard: "123456"
  // name: "测试仲裁员"
  // ly: "01"
  // timestamp: 1580909266728
  // role: "video"
  //超级role: "admin"
  token = '6mWz2OD/sgYY0q7rSzRQVcOkkaJIkyu8nA8UfTPzaEtIdCLcrbppzRw8BStYDthDXpYIMIP/2MKukQFs9i3/zBzswhcd58ds5ffehBkd9aO2A9Ki//owqd6gKi6CdxwXoWZgAHtlstezCiEg8lmEj1BOVPh6/nwBPtDF+YokyvLlVOqFMr2FZUltJwxKauZK'
  //视频权限role: "video"
  // token = "tX6u34umHNq10++zPL5POcOkkaJIkyu8nA8UfTPzaEtIdCLcrbppzRw8BStYDthDXpYIMIP/2MKukQFs9i3/zBzswhcd58ds5ffehBkd9aO2A9Ki//owqd6gKi6CdxwXoWZgAHtlstezCiEg8lmEj0f08qmypjHn2Fei3GGI5fXOVS11eeSkjtRNVlq1iRv6"
  //查询权限role: "query"
  // token = "r+AB4hiWOeW9bhdeAYnsQ8OkkaJIkyu8nA8UfTPzaEtIdCLcrbppzRw8BStYDthDXpYIMIP/2MKukQFs9i3/zBzswhcd58ds5ffehBkd9aO2A9Ki//owqd6gKi6CdxwXoWZgAHtlstezCiEg8lmEjyxASe1skibcU9VbkgeHGfoGs/9hTvtU8gx5ARFPUTQq"
  config.headers.token = token
  config.headers.appid = 'A0001';
  // if(getToken()){
  //   config.headers.token = getToken()
  // }
  // if(getAppid()){
  //   config.headers.appid = getAppid();//'A0001'
  // }
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
