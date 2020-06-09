<template>
    <div class="binding">
      <div class="box">
        <img src="../../assets/img/my/weixin.png" alt="">
      </div>
      <div class="primary_btn" :style="{background: $store.state.global.theme.mainColor}" @click="wechatLogin">绑定微信</div>
    </div>
</template>
<script>
import * as apiHttp from "../../api/index";
export default {
  name: 'binding',
  components: {},
  data () {
    return {
      data: '',
      auth: {},
      auths: {},
      authBtns: ['weixin'],
      loading: false
    }
  },
  methods: {
    wechatLogin () {
      let that = this
      var wxPlus = api.require('wxPlus');
      wxPlus.auth({
        apiKey: ''
      }, function (ret, err) {
        if (ret.status) {
          apiHttp.wxbindUser(ret.code).then(res => {
              console.log(JSON.stringify(res));
              if (res.code == 1) {
                that.$vux.toast.text(res.msg);
                that.$router.go(-2)
              }
            });
        } else {
          console.log(err.code)
        }
      })
    }
  },
  mounted () {
    // 删除
  }
}
</script>
<style scoped lang="less">
@import "../../assets/less/common";
.binding{
  background: #fff;
  height: 100%;
  overflow-y: auto;
  .box{
    padding: .8rem 0 1rem;
    text-align: center;
    img{
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>
