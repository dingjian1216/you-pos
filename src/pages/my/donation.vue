<template>
  <div class="donation payMent">
    <x-header slot="header" :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      转赠
    </x-header>
    <div class="donation-body content">
      <div class="body-one">
        <p>手机号码:</p>
        <input type="number" placeholder="请输入要转账的手机号码" v-model="mobile" />
      </div>

      <div class="body-one">
        <p>转赠金额：</p>
        <input type="text" placeholder="请输入转赠金额" v-model="money" />
      </div>
      <div class="ktxMoney">
        <span>当前可用{{name}}：</span>
        <span style="color: #fc3357">￥{{ktx}}</span>
      </div>

      <div class="body-one" style="margin-top: 0.2rem">
        <p>账号密码:</p>
        <input type="password" placeholder="请输入当前账号的密码" v-model="password" />
      </div>
      <div class="btns" @click="confirmDt()">
        <div class="btn" :style="{background: $store.state.global.theme.mainColor}">确定转赠</div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
import * as apiHttp from "../../api/index";
export default {
  components: {
    XHeader
  },
  data() {
    return {
      money: "",
      mobile: "",
      password: "",
      ktx: this.$route.query.ktx,
      name: "",
      type: this.$route.query.type
    };
  },
  mounted() {
    if (this.$route.query.type == 1) {
      this.name = "购物款";
    } else {
      this.name = "余额";
    }
  },
  methods: {
    confirmDt() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (!this.money) {
        this.$vux.toast.text("请输入转增金额");
        return;
      }
      if (!this.password) {
        this.$vux.toast.text("请输入当前账号的密码");
        return;
      }
      console.log(this.money > this.ktx)
      if (Number(this.money) >  Number(this.ktx)) {
        let name = this.name
        this.$vux.toast.text('请输入可用'+name+'');
        return;
      }
      if (this.type == 1) {
        apiHttp
          .ghkTransfer(this.money, this.password, this.mobile)
          .then(res => {
            if (res.code === 1) {
              this.$vux.toast.text(res.data);
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }
          });
      } else {
        apiHttp
          .yueTransfer(this.money, this.password, this.mobile)
          .then(res => {
            if (res.code === 1) {
              this.$vux.toast.text(res.data);
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }
          });
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.donation {
  .donation-body {
    margin-top: @margin-top;
    .body-one {
      height: 1.2rem;
      background: #ffffff;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.3rem;
      p {
        color: @font-main-color;
        font-size: @font-more-big;
      }
      input {
        outline: none;
        border: 0;
        width: 5rem;
        height: 0.8rem;
        background: #eeeeee;
        border-radius: 5px;
        text-align: left;
        padding-left: 0.3rem;
      }
      span {
        width: 1.2rem;
        height: 0.6rem;
        border: 1px solid @main-red-color;
        border-radius: 17px;
        line-height: 0.6rem;
        text-align: center;
        color: @main-red-color;
        font-size: @font-more-big;
      }
    }
    .body-one:nth-child(1) {
      border-bottom: 1px solid @border-color;
    }
    .ktxMoney {
      text-align: right;
      color: @font-light-color;
      font-size: @font-nomal;
      background: #ffffff;
      padding-bottom: 0.2rem;
      padding-right: 0.3rem;
    }

    .btn {
      margin: 0.4rem auto;
      border-radius: 0.2rem;
      width: 6.3rem;
      line-height: 0.9rem;
      text-align: center;
      color: #fff;
      font-size: 0.34rem;
    }
  }
}
</style>
