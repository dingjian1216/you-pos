<template>
  <div id="wechat_login">
    <i class="iconfont icon-close" @click="goBack"></i>
    <div class="wechat_login_img">
      <img src="../../assets/img/logo.png" alt />
    </div>
    <div class="edit_button" v-if="wx">
      <button
        class="btn_bright_red"
        @click="wechatLogin()"
        :style="{background: $store.state.global.theme.mainColor}"
      >
        <img src="../../assets/img/auth/wechat.png" alt />
        微信登录
      </button>
    </div>
    <div class="edit_button" v-else>
      <button
        class="btn_bright_red"
        @click="jumpTo('/login')"
        :style="{background: $store.state.global.theme.mainColor}"
      >
        <!--<img src="../../assets/img/auth/wechat.png" alt="">-->
        登录
      </button>
    </div>
    <ul class="wechat_login_enroll">
      <li
        class="li1"
        :style="{color: $store.state.global.theme.mainColor}"
        @click="jumpTo('/register')"
      >注册账号</li>
      <span :style="{color: $store.state.global.theme.mainColor}">|</span>
      <li
        class="li2"
        :style="{color: $store.state.global.theme.mainColor}"
        @click="jumpTo('/login')"
      >手机登录</li>
    </ul>
    <p class="wechat_login_protocol">
      登录注册即表示同意
      <span @click="jumpTo('/about?title=用户使用协议&type=7')">《用户使用协议》</span>
    </p>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
export default {
  name: "wechatLogin",
  data() {
    return {
      wx: false,
      data: "",
      auth: {},
      auths: {},
      authBtns: ["weixin"],
      loading: false,
      vuegConfig: {
        // sameDepthDisable: true,
        // forwardAnim: 'fadeInRight',
        // backAnim: 'fadeOutLeft',
        disable: false
      }
    };
  },
  inject: ["reload"],
  mounted: function() {
    let that = this;
    if (api.systemType === "ios") {
      that.wx = api.appInstalled({
        sync: true,
        appBundle: "weixin://"
      });
    } else {
      that.wx = api.appInstalled({
        sync: true,
        appBundle: "com.tencent.mm"
      });
    }
  },
  methods: {
    wechatLogin() {
      let that = this;
      var wxPlus = api.require('wxPlus');
      wxPlus.auth(
        {
          apiKey: ""
        },
        function(ret, err) {
          if (ret.status) {
            apiHttp.wxLogin(ret.code).then(res => {
              console.log(JSON.stringify(res));
              if (res.code == 1) {
                if (res.data.agent == 2) {
                  that.$router.push({
                    name: "wxbind",
                    query: {
                     token: res.data.wxdata.access_token,
                     openid: res.data.wxdata.openid
                    }
                  });
             
                } else {
                  that.$store.commit("setToken", res.data.agent.token);
                  that.$store.commit("setUserInfo", res.data.agent);
                  that.reload();
                  that.$router.push("/home");
                }
              }
            });
          } else {
            console.log(err.code);
          }
        }
      );
    }
  }
};
</script>

<style scoped lang="less">
#wechat_login {
  height: 100%;
  background: #fff;
  overflow-y: auto;
  .icon-close {
    position: absolute;
    right: 0.5rem;
    top: 0.7rem;
    font-size: 0.3rem;
  }
}
</style>
