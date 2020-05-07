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
          meta: {title: '绑定手机号'}
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
          meta: {title: '首页', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
       
        {
          path: '/classify',
          name: 'classify',
          component: resolve => require(['@/pages/home/classify'], resolve),
          meta: {title: '分类', keepAlive: true, isShowSearch: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/otherclassify',
          name: 'otherclassify',
          component: resolve => require(['@/pages/home/otherclassify'], resolve),
          meta: {title: '分类', keepAlive: true, isShowSearch: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/home/search'], resolve),
          meta: {title: '搜索', keepAlive: false, isShowSearch: true, isShowTab: false, routerZindex: 2}
        },

      
        {
          path: '/my',
          name: 'my',
          component: resolve => require(['@/pages/my'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/my1',
          name: 'my1',
          component: resolve => require(['@/pages/my/index1'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/my2',
          name: 'my2',
          component: resolve => require(['@/pages/my/index2'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/my3',
          name: 'my3',
          component: resolve => require(['@/pages/my/index3'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/my4',
          name: 'my4',
          component: resolve => require(['@/pages/my/index4'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/info',
          name: 'info',
          component: resolve => require(['@/pages/my/info'], resolve),
          meta: {title: '个人信息', keepAlive: false, isShowSearch: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/revise',
          name: 'revise',
          component: resolve => require(['@/pages/my/revise'], resolve),
          meta: {title: '修改密码', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/contact',
          name: 'contact',
          component: resolve => require(['@/pages/my/contact'], resolve),
          meta: {title: '联系客服', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: resolve => require(['@/pages/my/contacts'], resolve),
          meta: {title: '联系客服', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/beginnerGuider',
          name: 'beginnerGuider',
          component: resolve => require(['@/pages/my/beginnerGuider'], resolve),
          meta: {title: '新手指南', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
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
          path: '/binding',
          name: 'binding',
          component: resolve => require(['@/pages/my/binding'], resolve),
          meta: {title: '绑定微信', keepAlive: true, isShowHead: true, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: resolve => require(['@/pages/my/withdraw'], resolve),
          meta: {title: '提现', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },
 
        {
          path: '/withdrawlist',
          name: 'withdrawlist',
          component: resolve => require(['@/pages/my/withdrawlist'], resolve),
          meta: {title: '提现明细', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3}
        },
        {
          path: '/join',
          name: 'join',
          component: resolve => require(['@/pages/my/join'], resolve),
          meta: {title: '加入运营商', isShowHead: true}
        },
        {
          path: '/upgradeAgency',
          name: 'upgradeAgency',
          component: resolve => require(['@/pages/my/upgradeAgency'], resolve),
          meta: {title: '升级运营总监', isShowHead: true, routerZindex: 9}
        },
        {
          path: '/freeUpgrade',
          name: 'freeUpgrade',
          component: resolve => require(['@/pages/my/freeUpgrade'], resolve),
          meta: {title: '升级运营商', isShowHead: false, routerZindex: 9}
        },

        {
          path: '/partnership',
          name: 'partnership',
          component: resolve => require(['@/pages/my/partnership'], resolve),
          meta: {title: '申请代理', isShowHead: true, routerZindex: 2}
        },

 
        {
          path: '/homeFirmOrder',
          name: 'firmOrder',
          component: resolve => require(['@/pages/firmOrder/index'], resolve),
          meta: {title: '确认订单', isShowHead: false, routerZindex: 11}
        },
        {
          path: '/addOrder',
          name: 'addOrder',
          component: resolve => require(['@/pages/firmOrder/addOrder'], resolve),
          meta: {title: '添加地址', isShowHead: false, routerZindex: 12}
        },
        {
          path: '/updateOrder',
          name: 'updateOrder',
          component: resolve => require(['@/pages/firmOrder/updateOrder'], resolve),
          meta: {title: '修改地址', isShowHead: false, routerZindex: 13}
        },
        {
          path: '/payGiftBag',
          name: 'payGiftBag',
          component: resolve => require(['@/pages/firmOrder/payGiftBag'], resolve),
          meta: {title: '支付方式', isShowHead: false, routerZindex: 12}
        },
        {
          path: '/payGiftBagSuccess',
          name: 'payGiftBagSuccess',
          component: resolve => require(['@/pages/firmOrder/paySuccess'], resolve),
          meta: {title: '支付成功', isShowHead: false, routerZindex: 13}
        },
        {
          path: '/team',
          name: 'team',
          component: resolve => require(['@/pages/my/team'], resolve),
          meta: {title: '团队', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },

        {
          path: '/invite',
          name: 'invite',
          component: resolve => require(['@/pages/my/invite'], resolve),
          meta: {title: '邀请', keepAlive: true, isShowHead: true, isShowTab: false, routerZindex: 10}
        },
    
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/pages/my/order'], resolve),
          meta: {title: '我的订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2}
        },
        {
          path: '/orderlist',
          name: 'orderlist',
          component: resolve => require(['@/pages/my/orderlist'], resolve),
          meta: {title: '订单列表', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3}
        },
 
        {
          path: '/materials',
          name: 'materials',
          component: resolve => require(['@/pages/materials'], resolve),
          meta: {title: '素材', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
        {
          path: '/materials1',
          name: 'materials1',
          component: resolve => require(['@/pages/materials/index1'], resolve),
          meta: {title: '素材', keepAlive: true, isShowSearch: false, isShowTab: true, routerZindex: 1}
        },
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

const whiteList = ['login', 'about', 'register', 'newIndex', 'forget', 'mobileLogin', 'wechatLogin', 'guide', 'wxbind', 'sort', 'super', 'my', 'my1', 'my2', 'my3', 'my4', 'materials', 'materials1', 'materials2', 'supergoods', 'supergoods2', 'search', 'results', 'list', 'fastrob', 'personSpeak', 'personArticle', 'discounts', 'circle', 'otherclassify', 'classify', 'liveBroadcast', 'dayingList', 'daying', 'comment', 'mallHome', 'mallHomeDetail', 'mallBusiness', 'mallSeller', 'mallUnderShop', 'mallUnderdetail', 'mallProductList', 'mallShopProductList', 'mallCategory', 'mallSecthList', 'mallNews', 'mallSearch', 'mallArticleList', 'mallArticleInfo', 'select','home']
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
  // if (!utils.storage.get('Uquanyun')) {
  //   utils.storage.set('Uquanyun', 'gone')
  //   next({
  //     path: '/guide'
  //   })
  // } else
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
