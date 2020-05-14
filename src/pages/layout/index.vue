<template>
  <view-box
    ref="viewBox"
    :body-padding-top="$route.meta.isShowHead ? '.88rem' : '0'"
    :body-padding-bottom="$route.meta.isShowTab ? '1.06rem' : '0'"
  >
    <x-header
      v-show="$route.meta.isShowHead"
      slot="header"
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    >
      <a slot="left" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <transition >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <tabbar slot="bottom" class="tabbarBox" v-show="$route.meta.isShowTab">
      <tabbar-item :selected="$route.name === 'home'" link="/home">
        <img slot="icon" src="../../assets/img/layout/home.png" alt />
        <img slot="icon-active" src="../../assets/img/layout/home1.png" alt />
        <span slot="label">主页</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name === 'machine'" link="/machine">
        <img slot="icon" src="../../assets/img/layout/machine.png" alt />
        <img slot="icon-active" src="../../assets/img/layout/machine1.png" alt />
        <span slot="label">设备</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name === 'team'" link="/team">
        <img slot="icon" src="../../assets/img/layout/team.png" alt />
        <img slot="icon-active" src="../../assets/img/layout/team1.png" alt />
        <span slot="label">团队</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name === 'material'" link="/material">
        <img slot="icon" src="../../assets/img/layout/school.png" alt />
        <img slot="icon-active" src="../../assets/img/layout/school1.png" alt />
        <span slot="label">商学院</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name === 'my'" link="/my">
        <img slot="icon" src="../../assets/img/layout/my.png" alt />
        <img slot="icon-active" src="../../assets/img/layout/my1.png" alt />
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, XHeader } from "vux";
export default {
  name: "index",
  data() {
    return {
      h: 49 + Number((window.api && api.safeArea.bottom) || 0) + "px",
      transitionName: "",
      pageName: ["home", "my"],
      bot: (window.api && api.safeArea.bottom) || 0
    };
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XHeader
  },
  mounted() {
    if (window.api) {
      document.getElementById("tabbarBox") &&
        (document.getElementById("tabbarBox").style.paddingBottom =
          api.safeArea.bottom + "px")
    }
  },
  // 此段添加内容
};
</script>

<style scoped lang="less">


</style>
<style lang="less">
  .tabbarBox {
    z-index: 2000;
    box-shadow: 0 4px 8px #525252;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 49px;
    padding-top: 5px;
    box-sizing: content-box;
    width: 100%;
    display: flex;
    .tabbar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tabbarIcon {
        width: 23px;
        height: 23px;
        display: inline-block;
        margin-bottom: 1px;
        img {
          width: 23px;
          height: 23px;
          display: inline-block;
        }
      }
      .tabbarName {
        font-size: 12px;
        color: #999;
        line-height: 1.8;
        text-align: center;
      }
    }
  }
</style>
