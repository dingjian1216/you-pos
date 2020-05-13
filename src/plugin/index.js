import {formatDate} from './data'
import * as utils from '../utils'
export default {
  install (Vue, options) {
    Vue.prototype.jumpLink = function (link) {
      if (typeof link === 'string') {
        link = JSON.parse(link)
      }
    }
    Vue.prototype.jumpTo = function (path) {
      options.router.push(path)
    }
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({type: 'cancel', text: '功能即将开放，敬请期待'})
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }

  }
}
