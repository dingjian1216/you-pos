<template>
  <div id="app">
    <div id="header" :style="{height: h, background:colors}"></div>

    <div class="viewBox" :style="{top: h}">
      <transition name="fade">
        <router-view v-if="isRouterAlive" />
      </transition>
    </div>

    <!-- 后台添加更新 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="./assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add" v-if="version.remark">
              <p class="t">新版本特性</p>
              <p class="info">{{version.remark}}</p>
            </div>
            <div class="update_btn">
              <span @click="downWgt">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!-- 云修复 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast2" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="./assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn">
              <span @click="showToast2 = false">稍后提醒</span>
              <span @click="startSmart">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 云修复成功 重启 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast3" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="./assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn">
              <span @click="reboot">立即重启</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!-- 下载进度 -->
    <div v-transfer-dom>
      <x-dialog
        v-model="showToast4"
        :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}"
        class="progressBox"
      >
        <div class="progressBg">
          <img src="./assets/img/updateBox.png" alt />
          <span  class="prState">{{progressState}}</span>
          <x-progress :percent="percent" :show-cancel="false"></x-progress>
          <span class="title">新版本正在努力的更新中，请稍等</span>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <confirm
        v-model="showTip"
        title="提示"
        ref="confirm"
        content="你还未成为机主，请先购买设备成为机主"
        @on-confirm="onConfirm"
      ></confirm>
    </div>
  </div>
</template>

<script>
import * as utils from './utils'
import {
  XDialog,
  Confirm,
  TransferDomDirective as TransferDom,
  XProgress
} from 'vux'
import store from './store'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    XDialog,
    Confirm,
    XProgress
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      packet: '',
      isRouterAlive: true,
      showTip: false,
      perCon: '0%',
      progressState: '准备中',
      word: '',
      copyWord: '',
      result: '',
      h: '',
      anh: 25,
      iosh: 20,
      colors: '',
      r: true,
      hideTitle: [
        'home',
        'my',
        'team',
        'guide',
        'material',
        'machine',
        'teamDetails',
        'price'
      ],
      transitionName: '',
      img: '',
      link: '',
      showToast1: false, // 后台提示更新
      showToast2: false, // 云修复
      showToast3: false, // 修复成功描述 重启
      showToast4: false, // 下载进度
      percent: 0,
      version: '',
      smart: ''
    }
  },

  watch: {
    $route (to, from) {
      if (this.hideTitle.indexOf(to.name) > -1 || !window.api) {
        this.h = 0
      } else {
        if (api.systemType === 'android') {
          this.h = this.anh
        } else {
          this.h = this.iosh
        }
      }
      let login = ['login', 'wechatLogin', 'mobileLogin', 'wxbind', 'guide']
      let systemVersion = (window.api && api.systemVersion) || '6.0'
      if (parseFloat(systemVersion) < 6.0) {
        this.colors = '#353034'
      } else {
        this.colors = '#fff'
      }
      if (to.name == 'team') {
        if (this.$store.state.user.userInfo.is_buy_stock == 0) {
          this.showTip = true
          this.$router.go(-1)
        }
      }
    }
  },
  created () {
    let that = this
    // 获取是否有更新 云修复
    that.getVersion()
    that.initJPush()
    // 进入前台
    let size = document.documentElement.clientWidth / 7.5
    // 为获取到状态高度  和 屏幕宽度  重启
    if (api.safeArea.top == 0 && size == 0) {
      api.rebootApp()
    }
    // 设置状态高度
    if (window.api) {
      if (api.systemType === 'android') {
        this.h = api.safeArea.top / size + 'rem'
        this.anh = this.h
      } else {
        this.h = api.safeArea.top / size + 'rem'
        this.iosh = this.h
      }
    }
    // 当设置为全屏时  高度0
    if (this.hideTitle.indexOf(that.$route.name) > -1) {
      this.h = 0
    }
    // 设置状态栏颜色
    window.api &&
      api.setStatusBarStyle({
        style: 'dark',
        color: 'rgba(255, 255, 255, 0)'
      })
    let systemVersion = (window.api && api.systemVersion) || '6.0'
    if (parseFloat(systemVersion) < 6.0) {
      that.colors = '#353034'
    } else {
      that.colors = '#fff'
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },

    initJPush () {
      let that = this
      let ajpush = api.require('ajpush')
      let userId = store.state.user.userInfo.id || ''
      // this.$vux.toast.text(userId)
      if (!userId) {
        return
      }
      if (api.systemType === 'android') {
        ajpush.init(function (ret) {
          let param = {
            alias: userId,
            tags: ['android_user']
          }
          ajpush.bindAliasAndTags(param, function (ret) {})
          ajpush.setListener(jpushListener)
        })
      } else if (api.systemType === 'ios') {
        ajpush.setListener(jpushListener)
        let param = {
          alias: userId,
          tags: ['ios_user']
        }
        ajpush.bindAliasAndTags(param, function (ret) {
          ajpush.onResume()
        })
      }
      api.addEventListener({
        name: 'noticeclicked'
      }, function (ret, err) {})

      // 当页面处于前台页面的时候苹果进行弹窗。只对ios有效，安卓应用不管前后台都会弹窗
      function jpushListener (ret) {
        if (ret) {
          let content = ret.content
          let itemId = ret.extras.itemId
          let itemType = ret.extras.itemType
          api.notification({
            vibrate: [300, 500], // 自定义声音
            notify: {
              title: ret.title, // 标题，默认值为应用名称，只Android有效
              content: content, // 内容，默认值为'有新消息'
              extra: ret.extras, // 传递给通知的数据，在通知被点击后，该数据将通过监听函数回调给网页
              updateCurrent: false // 是否覆盖更新已有的通知，取值范围true|false。只Android有效
            }
          }, function (ret, err) {
            if (ret) {
              //  alert(JSON.stringify(ret));
            } else {
              //  alert(JSON.stringify(err));
            }
          })
        }
      }

      if (api.systemType === 'android') {
        api.addEventListener({
          name: 'appintent'
        }, function (ret, err) {
          if (ret && ret.appParam.ajpush) {
            let ajpush = ret.appParam.ajpush
            let id = ajpush.id
            let title = ajpush.title
            let content = ajpush.content
            let address = ajpush.extra.address
            let jid = ajpush.extra.id
            if (address == 'machineOrder') {
              that.$router.push({
                name: address,
                query: {
                  id: jid
                }
              })
            }
          }
        })
      } else if (api.systemType === 'ios') {
        api.addEventListener({
          name: 'noticeclicked'
        }, function (ret, err) {
          //  alert(JSON.stringify(ret));
          if (ret && ret.value)
          // ret.type=0(0应用后台点进 1应用前台接收到用知道点击进入详情页)
          {
            if (ret.type == '0') {
              let ajpush = ret.appParam.ajpush
              let address = ajpush.extra.address
              let jid = ajpush.extra.id
              that.$router.push({
                name: address,
                query: {
                  id: jid
                }
              })
            } else if (ret.type == '1') {
              let ajpush = ret.appParam.ajpush
              let address = ajpush.extra.address
              let jid = ajpush.extra.id
              that.$router.push({
                name: address,
                query: {
                  id: jid
                }
              })
            }
          }
        })
      }
    },

    onConfirm () {
      this.$router.push('home')
    },
    getVersion () {
      let that = this
      this.$http.post('/login/checkVersion', {
        type: (api.systemType === 'android') ? 0 : 1,
        version: api.appVersion
      }, false, true).then(res => {
        console.log(JSON.stringify(res))
        if (res.code === 1) {
          if (res.data == 0) {
            let mam = api.require('mam')
            mam.checkSmartUpdate(function (ret, err) {
              if (ret && ret.packages.length > 0) {
                // 返回的结果有可能会空数组
                if (ret.packages[0].silent) {
                  that.smart = ret.packages[0]
                  mam.startSmartUpdate(function (ret, err) {
                    if (ret.state === 3) {
                      if (that.smart && that.smart.extra) {
                        api.addEventListener({
                          name: 'smartupdatefinish'
                        }, function (ret, err) {
                          that.showToast3 = true
                        })
                      }
                    } else {
                      console.log(JSON.stringify(err))
                    }
                  })
                } else {
                  that.showToast2 = true
                  that.smart = ret.packages[0]
                }
              }
            })
          } else {
            this.version = res.data
            this.showToast1 = true
          }
        }
      })
    },
    downWgt () {
      let that = this
      if (api.systemType === 'android') {
        this.showToast1 = false
        that.showToast4 = true
        api.download(
          {
            url: that.version.src,
            report: true
          },
          function (ret, err) {
            if (ret && ret.state === 0) {
              that.percent = parseInt(ret.percent)
              // that.perCon = parseInt(ret.percent) + '%'
              that.progressState = '下载中' + that.percent + '%'
            }
            if (ret && ret.state === 1) {
              that.progressState = '安装中'
              let savePath = ret.savePath
              api.installApp({
                appUri: savePath
              })
            }
          }
        )
      }
      if (api.systemType === 'ios') {
        api.installApp({
          appUri: that.version.src
        })
      }
    },
    startSmart () {
      let that = this
      let mam = api.require('mam')
      mam.startSmartUpdate(function (ret, err) {
        if (ret) {
          that.showToast2 = false
          that.showToast4 = true
          that.percent = parseInt(ret.progress)
          console.log(that.percent)
          if (ret.state === 0) {
            that.progressState = '准备中' + that.percent + '%'
          } else if (ret.state === 1) {
            that.progressState = '下载中' + that.percent + '%'
          } else if (ret.state === 2) {
            that.progressState = '解压中' + that.percent + '%'
          } else if (ret.state === 3) {
            api.rebootApp()
          } else if (ret.state === 4) {
            that.showToast4 = false
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    reboot () {
      api.rebootApp()
    }
  },
  mounted () {
    if (window.api) {
      api.removeLaunchView()
      if (api.systemType === 'android') {
        api.requestPermission(
          {
            list: ['camera', 'photos', 'location', 'notification', 'storage'],
            code: 1
          },
          function (ret, err) {}
        )
      }
    }
  }
}
</script>

<style lang="less">
.fade-enter,
.fade-leave-to {
  visibility: hidden;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave {
  visibility: visible;
  opacity: 1;
}

@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "assets/less/app.less";
@import "./assets/less/common";

::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar {
  display: none;
}
.weui-toast.weui-toast_text {
  width: auto !important;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.mescroll-totop {
  bottom: 100px !important;
  right: 0.34rem !important;
}
.mescroll {
  .mescroll-downwarp .downwarp-content {
    height: 75px;
    padding-bottom: 0;
  }
  /*下拉刷新--标语*/
  .mescroll-downwarp .downwarp-slogan {
    padding: 16px 0 0 18px;
    font-size: 13px;
    color: gray;
  }
  /*下拉刷新--进度提示*/
  .mescroll-downwarp .downwarp-text {
    font-size: 11px;
    color: darkgray;
  }
  /*下拉刷新--向下进度动画*/
  .mescroll-downwarp .downwarp-progress {
    position: absolute;
    top: 0;
    left: 50%;
    width: auto;
    height: auto;
    border: none;
    border-radius: 0;
    margin-right: 0;
    margin-left: -90px;
  }
  /*下拉刷新--人*/
  .mescroll-downwarp .downwarp-man {
    width: 40px;
    height: 60px;
    vertical-align: middle;
    -webkit-transform-origin: left 60%;
    transform-origin: left bottom;
  }
  /*下拉刷新--盒子*/
  .mescroll-downwarp .downwarp-box {
    width: 18px;
    margin-top: 10px;
    margin-left: -20px;
    vertical-align: middle;
    -webkit-transform-origin: right -100%;
    transform-origin: right -100%;
  }
  /*下拉刷新--进度条*/
  .mescroll-downwarp .downwarp-loading {
    /*display: none; 不预先隐藏,避免首次显示动画时,图片没及时加载完毕导致短暂的白屏*/
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -20px;
    width: 40px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-animation: animManRun 0.3s steps(1, end) infinite;
    animation: animManRun 0.3s steps(1, end) infinite;
  }
  @-webkit-keyframes animManRun {
    0% {
      background-image: url("./assets/img/loading/4.png");
    }
    50% {
      background-image: url("./assets/img/loading/5.png");
    }
    100% {
      background-image: url("./assets/img/loading/4.png");
    }
  }
  @keyframes animManRun {
    0% {
      background-image: url("./assets/img/loading/4.png");
    }
    50% {
      background-image: url("./assets/img/loading/5.png");
    }
    100% {
      background-image: url("./assets/img/loading/5.png");
    }
  }
  .mescroll-downwarp .downwarp-loading:before {
    position: absolute;
    top: 15px;
    left: 50%;
    margin-left: -50px;
    content: "";
    width: 30px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("./assets/img/loading/6.png");
  }
}

#app {
  height: 100%;
  position: relative;
  #header {
    position: relative;
    z-index: 1000000;
    overflow: hidden;
    width: 100%;
    /*height: 25px;*/
  }
  .viewBox {
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    bottom: 0;
  }
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
.weui-tabbar__icon {
  width: 20px !important;
  height: 20px !important;
}
* {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: ignore;
  -moz-user-select: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
  user-select: none;
}
input,
textarea {
  user-select: auto !important;
}

.vux-loading {
  font-size: 0.3rem;
}
.infinite-loading-container {
  width: 100%;
}
img {
  max-width: 100%;
}
.text-html {
  max-width: 100%;
  overflow: hidden;
  p {
    font-size: 0.3rem;
  }
}

.am-g {
  display: none !important;
}
.updateBox {
  .weui-dialog {
    max-width: 5.4rem !important;
    width: 5.4rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
  }
  .update {
    position: relative;
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%, -50%);*/
    background: rgba(255, 255, 255, 1);
    width: 5.4rem;
    overflow: hidden;
    border-radius: 0.2rem;
    .bg {
      width: 100%;
      float: left;
    }
    .contentBox {
      width: 100%;
      float: left;
      background: #fff;
      padding: 0.2rem 0.4rem 0.4rem;
      box-sizing: border-box;
      /*border-radius:  0 0 0.2rem 0.2rem;*/
    }
    .add {
      width: 100%;
      text-align: center;
      p {
        text-align: center;
        color: #666;
      }
      .t {
        font-size: 0.36rem;
        color: #3c3c3c;
      }
      .info {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #666;
        padding: 0 0.3rem;
        display: flex;
        align-items: flex-start;
        p {
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: left;
        }
        span {
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: linear-gradient(to right, #d479ef, #a282ed);
          transform: rotate(45deg);
          margin-right: 0.1rem;
          margin-top: 0.16rem;
        }
      }
      img {
        margin-top: 0.6rem;
        width: 0.76rem;
        height: 0.76rem;
      }
    }
    .update_btn {
      margin-top: 0.6rem;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
    .close {
      width: 0.76rem;
      height: 0.76rem;
      position: absolute;
      bottom: -0.76rem;
      left: 50%;
      margin-left: -0.38rem;
    }
  }
}

.progressBox {
  .weui-dialog {
    border-radius: 0;
    max-width: 5.35rem !important;
    width: 5.35rem !important;
  }
  /*.title{*/
  /*display: block;*/
  /*margin-bottom: 10px;*/
  /*}*/
  .progressBg {
    position: relative;
    width: 5.35rem;
    height: 4.35rem;
    img {
      width: 100%;
      height: 100%;
    }
    .weui-progress {
      position: absolute;
      left: 6%;
      width: 88%;
      bottom: 0.7rem;
      .weui-progress__bar {
        height: 0.2rem;
        border-radius: 0.1rem;
      }
      .weui-progress__inner-bar {
        background: #ff9b84;
        border-radius: 0.1rem;
      }
    }
    .prState{
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 1rem;
      text-align: center;
      color: #999;
      font-size: 0.28rem;
    }
    .title {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0.14rem;
      text-align: center;
      color: #999;
      font-size: 0.24rem;
    }
    .update_btn {
      position: absolute;
      bottom: 0.3rem;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
  }
}

/*上拉加载无数据的时候图片的样式*/
.mescroll-empty {
  padding-top: 130px !important;
}
.mescroll-empty .empty-icon {
  width: 35% !important;
}
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft 0.2s linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight 0.2s linear forwards;
}
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1 !important;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft 0.2s linear forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight 0.2s linear forwards;
}
</style>
