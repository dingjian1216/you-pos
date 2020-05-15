<template>
  <div id="app">
    <div id="header" :style="{height: h, background:colors}"></div>

    <div class="viewBox" :style="{top: h}">
      <transition name="fade">
        <router-view v-if="isRouterAlive" />
      </transition>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showTip"
        title="提示"
        ref="confirm"
        content = '你还未成为机主，请先购买设备成为机主'
        @on-confirm="onConfirm"
      ></confirm>
    </div>
  </div>
</template>

<script>
import * as utils from "./utils";
import {
  XDialog,
  Confirm,
  TransferDomDirective as TransferDom,
  XProgress
} from "vux";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    XDialog,
    Confirm,
    XProgress
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      packet: "",
      isRouterAlive: true,
      showTip: false,
      percent: 0,
      perCon: "0%",
      progressState: "准备中",
      word: "",
      copyWord: "",
      result: "",
      h: "",
      anh: 25,
      iosh: 20,
      colors: "",
      r: true,
      hideTitle: [
        "home",
        "my",
        "team",
        "guide",
        "material",
        "machine",
        "teamDetails"
      ],
      version: "",
      smart: "",
      transitionName: "",
      img: "",
      link: ""
    };
  },

  watch: {
    $route(to, from) {
      if (this.hideTitle.indexOf(to.name) > -1 || !window.api) {
        this.h = 0;
      } else {
        if (api.systemType === "android") {
          this.h = this.anh;
        } else {
          this.h = this.iosh;
        }
      }
      let login = ["login", "wechatLogin", "mobileLogin", "wxbind", "guide"];
      let systemVersion = (window.api && api.systemVersion) || "6.0";
      if (parseFloat(systemVersion) < 6.0) {
        this.colors = "#353034";
      } else {
        this.colors = "#fff";
      }
      if(to.name == 'team'){
       if(this.$store.state.user.userInfo.is_buy_stock == 0){
         this.showTip = true
         this.$router.go(-1);
       }
      }
    }
  },
  created() {
    let that = this;
    // 进入前台
    let size = document.documentElement.clientWidth / 7.5;
    if (window.api) {
      if (api.systemType === "android") {
        this.h = api.safeArea.top / size + "rem";
        this.anh = this.h;
      } else {
        this.h = api.safeArea.top / size + "rem";
        this.iosh = this.h;
      }
    }
    if (this.hideTitle.indexOf(that.$route.name) > -1) {
      this.h = 0;
    }
    window.api &&
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255, 255, 255, 0)"
      });
    let systemVersion = (window.api && api.systemVersion) || "6.0";
    if (parseFloat(systemVersion) < 6.0) {
      that.colors = "#353034";
    } else {
      that.colors = "#fff";
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    onConfirm(){
      this.$router.push('home')
    }
  },
  mounted() {
    if (window.api) {
      api.removeLaunchView();
      if (api.systemType === "android") {
        api.requestPermission(
          {
            list: ["camera", "photos", "location", "notification", "storage"],
            code: 1
          },
          function(ret, err) {}
        );
      }
    }
  }
};
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
}
.copyBox {
  .weui-dialog {
    max-width: 5rem !important;
    width: 5rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
    overflow-y: auto;
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
