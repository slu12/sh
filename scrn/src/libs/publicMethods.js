import moment from 'moment'

let Met = {}
Met.getRandom =(val)=> {//取随机数
  let line = 1
  if (val && val > 1) {
    line = val
  }
  let num = ''
  for (var i = 0; i < line; i++) {
    num += Math.floor(Math.random() * 10)
  }
  return num
}
/**
 *零时区时间转换
 *
 * 获取零时区  转当前时区
 * Get_zero_UTC()
 * 当前时区 转 零时区
 * Set_zero_UTC()
 */

Met.Get_zero_UTC = (T, typ) => {
  let z = parseInt(moment(new Date()).format('Z').split(':')[0])
  let a = moment(T).add(z, 'h')
  let b = moment(a).format(typ)
  return b
}
Met.Set_zero_UTC = (T) => {
  let z = parseInt(moment(new Date()).format('Z').split(':')[0])
  let a = moment(T).add(-z, 'h')
  let b = moment(a).format('YYYY-MM-DD HH:mm:ss')
  return b
}
/**
 ***********************************************************************************************************************
 */

Met.WindowListener = (callback) => {
  // window.onresize = function(val) {
  //   // 浏览器窗口变化后需要做的事情
  // }

  window.addEventListener('resize', function (val) {
    // 变化后需要做的事
    callback && callback()
  })
}

Met.getBody_W = () => {
  return document.body.clientWidth
}
Met.getBody_H = () => {
  return document.body.clientHeight
}

Met.getDom_H = (id) => {
  return document.getElementById(id).offsetHeight
}
Met.getDom_W = (id) => {
  return document.getElementById(id).offsetWidth
}
/**
 网页可见区域宽： document.body.clientWidth
 网页可见区域高： document.body.clientHeight
 网页可见区域宽： document.body.offsetWidth (包括边线的宽)
 网页可见区域高： document.body.offsetHeight (包括边线的高)
 网页正文全文宽： document.body.scrollWidth
 网页正文全文高： document.body.scrollHeight
 网页被卷去的高： document.body.scrollTop
 网页被卷去的左： document.body.scrollLeft
 元素的实际高度：document.getElementById("div").offsetHeight
 元素的实际宽度：document.getElementById("div").offsetWidth
 元素的实际距离左边界的距离：document.getElementById("div").offsetLeft
 元素的实际距离上边界的距离：document.getElementById("div").offsetTop
 */
export default Met
