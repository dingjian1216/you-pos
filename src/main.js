// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import { XHeader, ToastPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin } from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import Vue2TouchEvents from 'vue2-touch-events'
require('./api/mock.js')
Vue.use(Clipboard).use(Vuex).use(ToastPlugin, { position: 'bottom' }).use(ConfirmPlugin).use(DatetimePlugin).use(LoadingPlugin).use(VueScroller)
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$video = Video
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
  loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
  preLoad: 2,
  error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
  adapter: 1
})
Vue.prototype.$logo = utils.storage.get('appLoginLogo') ? utils.storage.get('appLoginLogo') : ''


Vue.component('x-header', XHeader)

Vue.use(plugin, { router: router })
Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false
Vue.prototype.link = 'https://kd.youxiangdui.net/'
Vue.prototype.$logo = '../../assets/img/logo.png'

// 测试环境代码 —————————————start—————————————————

// vueObj 为了方便别的webview调用此vue对象
// window.vueObj = new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {App},
//   template: '<App/>'
// })

// 测试环境代码 —————————————end—————————————————

window.apiready = function () {
  var app
  app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
  // vueObj 为了方便别的webview调用此vue对象
  window.vueObj = app
  let time = 0
  let getData = false
  let timer = setInterval(() => {
    time++
    if (time >= 5) {
      if (!getData) {
        getDesign()
      }
      clearInterval(timer)
    }
  }, 1000)
  function getDesign() {
    let home =  '/home'
    // 返回
    let now = false
    let time = null
    api.addEventListener({
      name: 'keyback'
    }, function (ret, err) {
      if (window.api && api.pageParam.backToWin) {
        // 当此window的backToWin为true，则直接返回上一个window
        api.closeWin()
        return
      }
      if (ret) {
        if (app.$route.path === home || app.$route.path === '/login') {
          clearInterval(time)
          if (now) {
            now = false
            api.closeWidget({
              silent: true
            })
          } else {
            now = true
            api.toast({
              msg: '再按一次返回键退出',
              duration: 2000,
              location: 'bottom'
            })
            time = setTimeout(() => {
              now = false
            }, 1000)
          }
          // 如果是内页则执行路由返回操作
        } else {
          router.go(-1)
        }
      }
    })
  }
  getDesign()
}
