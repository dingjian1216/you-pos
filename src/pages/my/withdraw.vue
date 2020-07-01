<template>
  <div class="withdraw">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      提现
      <span class="save" slot="right" @click="jumpTo('/record')">明细</span>
    </x-header>
    <div class="box">
      <div class="head">
        <p>
          账户余额
          <span>(元)</span>
        </p>
        <p class="money">
          <span>¥</span>
          {{profit.ktx || '0.00'}}
        </p>
      </div>
      <div class="high"></div>
      <div class="info">
        <div>
          <span>可提现金额（元）</span>
          <span :style="{color: $store.state.global.theme.mainColor}">{{profit.ktx || '0.00'}}</span>
        </div>
        <div>
          <span>不提现金额（元）</span>
          <span :style="{color: $store.state.global.theme.mainColor}">{{profit.bktx || '0.00'}}</span>
        </div>
      </div>
      <div class="high"></div>
      <div class="count">
        <div
          class="countBox"
          @click="jumpTo({name: 'donation',query: {ktx: profit.ktx,type: 2}})"
        >
          <div class="div1">
            <img src="../../assets/img/my/changeMoney.png" alt />
            <span>转赠</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
      <div class="high"></div>
      <div class="account">
        <p class="t">提现到</p>
        <div class="number" @click="jumpTo('/realName')">
          <img src="../../assets/img/my/zfb.png" alt v />
          <div class="info">
            <p class="name" v-if="alipay">支付宝</p>
            <p class="mobile" v-if="alipay">{{alipay.alipay}}</p>
            <p class="mobile" v-else>还没有支付宝账号，去添加</p>
          </div>
        </div>
      </div>
      <div class="inputBox">
        <input type="number" placeholder="请输入提取金额" v-model="money" />
<!--        <span :style="{color: $store.state.global.theme.mainColor}" @click="money = profit.ktx">全部</span>-->
      </div>
      <div
        class="primary_btn"
        :style="{background: $store.state.global.theme.mainColor}"
        @click="widthdraw"
      >提现</div>
      <div class="tips" style="border-radius: .05rem;margin: .2rem;color: #999;">
        提现说明:
        机主每天免费提现1笔,之后每笔收取2元；
        机主单笔提现10-10000元；
        机主每天累计提现最高限额10000元；
        每天提现时间9:00-17:00；
        提现不收取任何手续费。
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XHeader, Actionsheet } from 'vux'
import * as apiHttp from '../../api/index'
export default {
  name: 'withdraw',
  components: {
    Group,
    XInput,
    XHeader,
    Actionsheet
  },
  data () {
    return {
      profit: '',
      show1: false,
      show: false,
      money: '',
      alipay: ''
    }
  },
  methods: {
    // 提现
    widthdraw () {
      let that = this
      if (!that.alipay) {
        this.$vux.toast.text('请先绑定账户')
        return
      }
      if (Number(that.money) > Number(that.profit.ktx)) {
        this.$vux.toast.text('账户金额不足')
        return
      }

      this.$vux.confirm.show({
        title: '提示',
        content: '您确认要提现吗',
        onConfirm () {
          apiHttp
            .getApply(that.alipay.name, that.alipay.alipay, that.money)
            .then(res => {
              if ((res.code = 1)) {
                that.$vux.toast.text(res.msg)
                that.getProfit()
              } else {
                that.$vux.toast.text(res.msg)
              }
            })
        }
      })
    },
    getProfit () {
      apiHttp.getMyReward().then(res => {
        if (res.code == 1) {
          this.profit = res.data
        }
      })
    },
    getAlipay () {
      apiHttp.getAgentPayData().then(res => {
        if (res.code == 1) {
          this.alipay = res.data
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getProfit()
    this.getAlipay()
  }
}
</script>
<style lang="less">
  .withdraw {
    .vux-header {
      position: absolute !important;
    }
    .weui-cells {
      margin-top: 0;
      font-size: 12px;
      .weui-cell:before {
        right: 15px;
      }
      .weui-input {
        font-size: 14px;
        color: #999;
      }
      .weui-label {
        font-size: 14px;
      }
      /*.weui-cell__bd{*/
      /*display: flex;*/
      /*}*/
    }
    .weui-cells:after,
    .weui-cells:before {
      left: 15px;
      right: 15px;
    }
    .weui-mask {
      background: rgba(0, 0, 0, 0.4);
    }
    .weui-actionsheet_toggle {
      bottom: 30px;
      width: 90%;
      left: 5%;
      background: none;
      .weui-actionsheet__menu {
        border-radius: 5px;
      }
      .weui-actionsheet__action {
        border-radius: 5px;
      }
      .vux-actionsheet-menu-default {
        color: #666;
        font-size: 0.28rem;
      }
      .weui-actionsheet__cell {
        font-size: 0.3rem;
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .hint {
    font-size: 0.22rem;
    padding-left: 0.4rem;
    color: #666;
  }
  .withdraw {
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
      .info {
        display: flex;
        div {
          position: relative;
          flex: 1;
          height: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          span {
            font-size: 0.24rem;
            color: #666;
          }
          span:last-of-type {
            font-size: 0.32rem;
          }
        }
        div:first-of-type:after {
          content: "";
          position: absolute;
          top: 0.2rem;
          height: 1rem;
          right: 0;
          width: 1px;
          border-right: 1px solid #dedede;
          transform-origin: 0 0;
          transform: scaleX(0.5);
        }
      }
      .high {
        overflow: hidden;
        width: 100%;
        height: 0.1rem;
        background: #f4f4f4;
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
      .account {
        padding: 0.3rem 0.3rem 0;
        .t {
          color: #333;
          font-size: 0.3rem;
          margin-bottom: 0.2rem;
          span {
            float: right;
            font-size: 0.26rem;
          }
        }
        .number {
          display: flex;
          align-items: center;
          position: relative;
          padding-bottom: 0.3rem;
          img {
            width: 0.85rem;
            height: 0.85rem;
            margin-right: 0.25rem;
          }
          .info {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            .name {
              font-size: 0.3rem;
              color: #666;
            }
            .mobile {
              color: #999;
              font-size: 0.24rem;
            }
          }
        }
        .number:before {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #c8c8cd;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 2px;
        }
        .number:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid #e9e8e8;
          transform-origin: 0 0;
          transform: scaleY(0.5);
        }
      }
      .inputBox {
        background: #f4f4f4;
        border-radius: 0.05rem;
        display: flex;
        padding-right: 0.2rem;
        align-items: center;
        height: 0.9rem;
        margin: 0.2rem;
        input {
          flex: 1;
          height: 0.6rem;
          line-height: 0.6rem;
          padding-left: 0.2rem;
          background: #f4f4f4;
          border: none;
          outline: none;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .explain {
        padding: 0.3rem;
      }
    }
  }
</style>
