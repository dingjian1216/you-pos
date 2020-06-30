import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/pages/layout/'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/wechatLogin',
          name: 'wechatLogin',
          component: resolve => require(['@/pages/auth/wechat_login'], resolve),
          meta: {title: '微信登录', keepAlive: true}
        },
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
          meta: {title: '登录'}
        },
        {
          path: '/wxbind',
          name: 'wxbind',
          component: resolve => require(['@/pages/auth/wxbind'], resolve),
          meta: {title: '微信注册'}
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/pages/auth/register'], resolve),
          meta: {title: '注册'}
        },
        {
          path: '/forget',
          name: 'forget',
          component: resolve => require(['@/pages/auth/forget'], resolve),
          meta: {title: '忘记密码'}
        },
        {
          path: '/mobileLogin',
          name: 'mobileLogin',
          component: resolve => require(['@/pages/auth/mobile_login'], resolve),
          meta: {title: '手机登录'}
        },
        {
          path: '/guide',
          name: 'guide',
          component: resolve => require(['@/pages/layout/guide'], resolve)
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/pages/home/'], resolve),
          meta: {title: '首页', keepAlive: false, isShowSearch: true, isShowTab: true, isShowHead: false}
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/home/search'], resolve),
          meta: {title: '搜索', keepAlive: false, isShowSearch: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/goodDetails',
          name: 'goodDetails',
          component: resolve => require(['@/pages/home/goodDetails'], resolve),
          meta: {title: '商品详情', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 2}
        },
        {
          path: '/confirmOrder',
          name: 'confirmOrder',
          component: resolve => require(['@/pages/home/confirmOrder'], resolve),
          meta: {title: '确认订单', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 3}
        },
        {
          path: '/payMent',
          name: 'payMent',
          component: resolve => require(['@/pages/home/payMent'], resolve),
          meta: {title: '支付方式', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 3}
        },
        {
          path: '/paySuccess',
          name: 'paySuccess',
          component: resolve => require(['@/pages/home/paySuccess'], resolve),
          meta: {title: '支付成功', isShowHead: false, routerZindex: 13}
        },
        {
          path: '/material',
          name: 'material',
          component: resolve => require(['@/pages/material/'], resolve),
          meta: {title: '商学院', keepAlive: true, isShowSearch: false, isShowTab: true, isShowHead: false }
        },
        {
          path: '/plist',
          name: 'plist',
          component: resolve => require(['@/pages/material/plist'], resolve),
          meta: {title: '商学院', keepAlive: false, isShowSearch: false, isShowHead: true, routerZindex: 2 }
        },
        {
          path: '/plist',
          name: 'plist',
          component: resolve => require(['@/pages/material/plist'], resolve),
          meta: {title: '商学院', keepAlive: false, isShowSearch: false, isShowHead: true, routerZindex: 2 }
        },
        {
          path: '/materialDetails',
          name: 'materialDetails',
          component: resolve => require(['@/pages/material/materialDetails'], resolve),
          meta: {title: '详情', keepAlive: false, isShowSearch: false, isShowHead: true, routerZindex: 2}
        },
        {
          path: '/machine',
          name: 'machine',
          component: resolve => require(['@/pages/machine'], resolve),
          meta: {title: '设备', keepAlive: true, isShowSearch: false, isShowTab: true, isShowHead: false}
        },
        {
          path: '/machineOrder',
          name: 'machineOrder',
          component: resolve => require(['@/pages/machine/machineOrder'], resolve),
          meta: {title: '报单订单', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 2}
        },
        {
          path: '/machineOrderDetails',
          name: 'machineOrderDetails',
          component: resolve => require(['@/pages/machine/machineOrderDetails'], resolve),
          meta: {title: '报单详情', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 3}
        },
        {
          path: '/achievement',
          name: 'achievement',
          component: resolve => require(['@/pages/machine/achievement'], resolve),
          meta: {title: '达标详情', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true, routerZindex: 4}
        },
        {
          path: '/my',
          name: 'my',
          component: resolve => require(['@/pages/my'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, isShowHead: false}
        },
        {
          path: '/info',
          name: 'info',
          component: resolve => require(['@/pages/my/info'], resolve),
          meta: {title: '个人信息', keepAlive: false, isShowSearch: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/realName',
          name: 'realName',
          component: resolve => require(['@/pages/my/realName'], resolve),
          meta: {title: '实名认证', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/revise',
          name: 'revise',
          component: resolve => require(['@/pages/my/revise'], resolve),
          meta: {title: '修改密码', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/linkman',
          name: 'linkman',
          component: resolve => require(['@/pages/my/linkman'], resolve),
          meta: {title: '联系我们', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/notice',
          name: 'notice',
          component: resolve => require(['@/pages/my/notice'], resolve),
          meta: {title: '消息', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/noticeDetail',
          name: 'noticeDetail',
          component: resolve => require(['@/pages/my/noticeDetail'], resolve),
          meta: {title: '消息详情', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: resolve => require(['@/pages/my/withdraw'], resolve),
          meta: {title: '提现', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/record',
          name: 'record',
          component: resolve => require(['@/pages/my/record'], resolve),
          meta: {title: '提现记录', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/donation',
          name: 'donation',
          component: resolve => require(['@/pages/my/donation.vue'], resolve),
          meta: {title: '转赠', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/withdrawlist',
          name: 'withdrawlist',
          component: resolve => require(['@/pages/my/withdrawlist'], resolve),
          meta: {title: '资金明细', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/price',
          name: 'price',
          component: resolve => require(['@/pages/my/price'], resolve),
          meta: {title: '机主价格表', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3}
        },

        {
          path: '/team',
          name: 'team',
          component: resolve => require(['@/pages/team'], resolve),
          meta: {title: '团队', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/teamDetails',
          name: 'teamDetails',
          component: resolve => require(['@/pages/team/teamDetails'], resolve),
          meta: {title: '团队详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/invite',
          name: 'invite',
          component: resolve => require(['@/pages/my/invite'], resolve),
          meta: {title: '邀请', keepAlive: true, isShowHead: true, isShowTab: false, routerZindex: 10}
        },
        {
          path: '/about',
          name: 'about',
          component: resolve => require(['@/pages/my/about'], resolve),
          meta: {title: '用户协议', keepAlive: true, isShowHead: true, isShowTab: false, routerZindex: 10}
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/pages/my/order'], resolve),
          meta: {title: '我的订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/orderDetails',
          name: 'orderDetails',
          component: resolve => require(['@/pages/my/orderDetails'], resolve),
          meta: {title: '订单详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4}
        },
        {
          path: '/address',
          name: 'address',
          component: resolve => require(['@/pages/my/address'], resolve),
          meta: {title: '收货地址', isShowHead: false, routerZindex: 13}
        },
        {
          path: '/addAddress',
          name: 'addAddress',
          component: resolve => require(['@/pages/my/addAddress'], resolve),
          meta: {title: '添加地址', isShowHead: false, routerZindex: 14}
        },
        {
          path: '/addressUpdate',
          name: 'addressUpdate',
          component: resolve => require(['@/pages/my/addressUpdate'], resolve),
          meta: {title: '修改地址', isShowHead: false, routerZindex: 14}
        },
        {
          path: '/binding',
          name: 'binding',
          component: resolve => require(['@/pages/my/binding'], resolve),
          meta: {title: '绑定微信', keepAlive: true, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/shopMoney',
          name: 'shopMoney',
          component: resolve => require(['@/pages/my/shopMoney'], resolve),
          meta: {title: '购物款', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/shopMoneyList',
          name: 'shopMoneyList',
          component: resolve => require(['@/pages/my/shopMoneyList'], resolve),
          meta: {title: '购物款明细', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

const whiteList = ['login', 'about', 'register',  'forget',  'guide',  'home','wechatLogin','wxbind']
router.beforeEach(function (to, from, next) {
  var firstPage = ['/home', '/newIndex', '/sort', '/fastrobNew', '/materials', '/materials2', '/super', '/materials1', '/my', '/newIndex', '/mall/home', '/mall/business', '/mall/underShop', '/mall/underShop', '/mall/my', '/mall/cart', '/upgradeOperator']
  var currentRoute = to.path
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false
  } else {
    window.canRightSlipBack = true
  }
  // 登录拦截
  store.commit('hide')
    if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/wechatLogin'
    })
  } else {
    next()
  }
})

export default router
