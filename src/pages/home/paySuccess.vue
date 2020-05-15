<template>
  <div class="paySuccess_main">
    <div class="header">
      <x-header slot="header" :left-options="{showBack: false}">支付成功</x-header>
    </div>
    <div class="mescrollBox">
      <div class="content_main">
        <div class="content">
          <img src="../../assets/img/home/paySuccess.png" alt />
          <p>支付成功</p>
        </div>
        <div class="btns">
          <div class="left" @click="jumpTo({name:'home'})">返回商城</div>
          <div class="right" @click="handOrder">查看订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
import * as utils from "../../utils";
export default {
  name: "paySuccess",
  data() {
    return {
      shopList: [],
      page: 1,
      loading: false
    };
  },
  methods: {
    handOrder() {
      utils.storage.set("orderId", 2);
      this.$router.push({
        name: "order"
      });
    }
  },
  mounted() {
    apiHttp.getAgentDetall().then(res => {
      if (res.code === 1) {
        this.$store.commit("setUserInfo", res.data);
      }
    });
  }
};
</script>

<style lang="less" scope>
@import "../../assets/less/common";
.paySuccess_main {
  text-align: center;
  .mescrollBox {
    width: 100%;
    position: absolute;
    top: 0.9rem;
    bottom: 0;
    height: auto !important;
  }
}
.paySuccess_main {
  .content_main {
    margin-top: 1.5rem;
    .content {
      img {
        height: 1.68rem;
        width: 1.47rem;
      }
      p {
        margin-top: 0.1rem;
        text-align: center;
        font-size: @font-big;
      }
    }

    .btns {
      display: flex;
      justify-content: space-around;
      div {
        width: 1.8rem;
        height: 0.6rem;
        border-radius: 20px;
        font-size: @font-more-big;
        text-align: center;
        line-height: 0.6rem;
        box-sizing: border-box;
        margin-top: 0.5rem;
      }
      .left {
        background: #d8d8d8;
        color: #666666;
      }
      .right {
        background: @main-btn1-color;
        color: #fff;
      }
    }
  }
}
</style>
