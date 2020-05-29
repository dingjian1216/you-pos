<template>
  <div class="shopMoney">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      购物款
      <span class="save" slot="right" @click="jumpTo('/shopMoneyList')">明细</span>
    </x-header>
    <div class="box">
      <div class="head">
        <p>
          账户余额
          <span>(元)</span>
        </p>
        <p class="money">
          <span>¥</span>
          {{profit.purchase_money || '0.00'}}
        </p>
      </div>
      <div class="count">
        <div class="countBox" @click="jumpTo({name: 'donation',query: {ktx: profit.purchase_money,type: 1}})">
          <div class="div1">
            <img src="../../assets/img/my/changeMoney.png" alt />
            <span>转赠</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XHeader, Actionsheet } from "vux";
import * as apiHttp from "../../api/index";
export default {
  name: "withdraw",
  components: {
    Group,
    XInput,
    XHeader,
    Actionsheet
  },
  data() {
    return {
      profit: "",
      show1: false,
      show: false,
      money: "",
      alipay: ""
    };
  },
  methods: {
    getProfit() {
      apiHttp.getAgentDetall().then(res => {
        if (res.code === 1) {
          this.profit = res.data;
        }
      });
    }
  },
  mounted() {
    // 删除
    this.getProfit();
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";

.shopMoney {
  height: 100%;
  background: #fff;
  overflow-y: auto;
  position: relative;
  .save {
    color: #666;
  }
  .box {
    position: absolute;
    left: 0;
    top: 0.88rem;
    bottom: 0;
    width: 100%;
    background: #f4f4f4;
    .head {
      width: 100%;
      height: 2.2rem;
      background: url("../../assets/img/my/withdraw.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        font-size: 0.3rem;
        color: #fff;
        span {
          margin: 0 0.1rem;
        }
      }
      .money {
        margin-top: 0.2rem;
        font-size: 0.4rem;
        margin-right: 0.3rem;
        span {
          font-size: 0.34rem;
        }
      }
    }
    .count {
      margin-top: 0.2rem;
    }
    .countBox {
      height: 0.88rem;
      padding: 0 0.3rem;
      background: #fff;
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .div1 {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: @font-more-big;
        img {
          width: 0.4rem;
          margin-right: 0.2rem;
        }
        span {
          font-size: @font-big;
        }
      }
      .div2 {
        i {
          color: @font-light-color;
        }
      }
    }
  }
}
</style>
