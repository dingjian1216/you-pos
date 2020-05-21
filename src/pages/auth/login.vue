<template>
  <div id="login">

    <i class="iconfont icon-close" @click="goBack()"></i>
    <div class="login_img">
      <img src="../../assets/img/logo.png" alt />
    </div>
    <div class="input_list login_input">
      <div class="label1">
        <input type="tel" placeholder="请输入手机号" v-model="mobile" />
      </div>
      <div class="label2">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
      </div>
    </div>
    <div class="edit_button btn_login">
      <button
        class="btn_bright_red"
        :style="{background: $store.state.global.theme.mainColor}"
        @click="login"
      >登录</button>
    </div>
    <div class="edit_button btn_register">
      <button
        class="btn_bright_red"
        @click="jumpTo('/register')"
        :style="{borderColor: $store.state.global.theme.mainColor}"
      >注册</button>
    </div>
    <div class="login_enroll_div">
      <ul class="login_enroll">
        <li
          class="li1"
          @click="jumpTo('/forget')"
          :style="{color: $store.state.global.theme.mainColor}"
        >忘记密码?</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
export default {
  name: "wechat_login",
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  inject: ["reload"],
  methods: {
    login() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      let that = this;
      apiHttp.login(this.mobile,this.password).then(res => {
          console.log(res);
          if (res.code === 1) {
            that.$store.commit("setToken", res.data.token);
            that.$store.commit("setUserInfo", res.data);
            that.reload();
            that.$router.push("/home");
          }
        });
    }
  },
  mounted: function() {
    // 删除
  }
};
</script>

<style scoped lang="less">
#login {
  overflow-x: hidden;
  height: 100%;
  background: #fff;
  overflow-y: auto;
}
.icon-close {
  position: absolute;
  right: 0.5rem;
  top: 0.7rem;
  font-size: 0.3rem;
}
.vux-header {
  position: relative !important;
}
</style>
<!--<style lang="less">-->
  <!--#login{-->
    <!--.vux-header {-->
      <!--.vux-header-left {-->
        <!--left: 0;-->
        <!--top: 0;-->
        <!--.backBox {-->
          <!--display: block;-->
          <!--height: 0.88rem;-->
          <!--line-height: .88rem;-->
          <!--padding: 0 .2rem;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
