<template>
    <div class="revise">
      <group>
        <x-input placeholder="请输入手机号" v-model="mobile" :max="11" is-type="china-mobile" disabled>
          <img slot="label"   src="../../assets/img/my/phone.png">
        </x-input>
        <x-input  class="weui-vcode" placeholder="请输入旧密码" v-model="old_password">
          <img slot="label"   src="../../assets/img/my/password.png">
        </x-input>
        <x-input placeholder="请输入新密码" v-model="password" type="password">
          <img slot="label"   src="../../assets/img/my/password.png">
        </x-input>
        <x-input placeholder="请确认新密码" v-model="new_password" type="password">
          <img slot="label"   src="../../assets/img/my/password.png">
        </x-input>
      </group>
      <div class="primary_btn" @click="send" :style="{background: $store.state.global.theme.mainColor}">确认修改</div>
    </div>
</template>

<script>
import {Group, XInput, Cell, XHeader, Confirm, XButton} from 'vux'
import * as apiHttp from "../../api/index";
export default {
  name: 'revise',
  components: {
    Group, Cell, XHeader, Confirm, XInput, XButton
  },
  data () {
    return {
      getCode: '获取验证码',
      timerFlag: false,
      mobile: this.$store.state.user.userInfo.username,
      old_password: '',
      password: '',
      new_password: ''
    }
  },
  mounted: function () {
    // 删除
  },
  methods: {
    send () {
      if (this.password !== this.new_password) {
        this.$vux.toast.text('两次密码不一致')
        return
      }
      apiHttp.editAgentPassword(this.old_password,this.password,this.new_password).then(res => {
        if (res.code === 1) {
          this.$vux.toast.text(res.msg)
          this.$store.commit('logout')
          this.$router.replace('/login')
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
  }
}
</script>
<style lang="less">
  @import "../../assets/less/common";
  .revise{
    .weui-cells{
      margin-top: 0;
    }
    .weui-cell__hd{
      display: flex;
      align-items: center;
      img{
        margin-right: .2rem;
        width: .22rem;
        max-height: .36rem;
      }
    }
    .weui-input{
      font-size: .28rem;
    }
    .weui-cell{
      padding: .27rem .3rem;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";

</style>
