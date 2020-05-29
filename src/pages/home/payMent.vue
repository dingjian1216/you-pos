<template>
  <div class="payMent">
    <div class="header">
      <x-header slot="header" :left-options="{showBack: false}">
        <a @click="goBack()" slot="left" class="backBox">
          <i class="iconfont icon-back"></i>
        </a>
        支付
      </x-header>
    </div>
    <div class="content">
      <div class="payMent_parse">
        <div class="left">订单金额</div>
        <div class="right">
          <span>¥</span>
          {{total_money ? total_money : 0}}
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">选择支付方式</div>
        <div class="list" @click="handChange('yue')">
          <div class="img_box">
            <img src="../../assets/img/home/yue.png" alt />
            <span>余额</span>
          </div>
          <div class="checkbox">
            <img
              :src="active == 'yue' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'"
              alt
            />
          </div>
        </div>
         <div class="list" @click="handChange('kuan')">
          <div class="img_box">
            <img src="../../assets/img/home/kuan.png" alt />
            <span>购物款</span>
          </div>
          <div class="checkbox">
            <img
              :src="active == 'kuan' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'"
              alt
            />
          </div>
        </div>
        <div class="list" @click="handChange('alipay')">
          <div class="img_box">
            <img src="../../assets/img/home/apliy.png" alt />
            <span>支付宝</span>
          </div>
          <div class="checkbox">
            <img
              :src="active == 'alipay' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'"
              alt
            />
          </div>
        </div>
        <!-- <div class="list" @click="handChange('wechat')">
          <div class="img_box">
            <img src="../../assets/img/home/wechat.png" alt />
            <span>微信</span>
          </div>
          <div class="checkbox">
            <img
              :src="active == 'wechat' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'"
              alt
            />
          </div>
        </div> -->
      </div>
      <div class="btns">
        <div class="btn" @click="handBuy">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
import axios from "axios";
export default {
  name: "payMent",
  data() {
    return {
      active: "credit",
      order_number: this.$route.query.order_number,
      total_money: this.$route.query.total_money,
      orderId: this.$route.query.orderId,
      index: ""
    };
  },
  mounted: function() {
    // 删除
  },
  methods: {
    handChange(key) {
      this.active = key;
    },
    handBuy() {
      let that = this;
      if (this.active === "yue") {
        apiHttp.goYEpay(this.orderId, this.total_money).then(res => {
          if (res.code === 1) {
            this.$router.push({
              name: "paySuccess"
            });
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
      } else if (this.active === "alipay") {
        apiHttp.goZFBPay(this.orderId, this.total_money).then(res => {
          if (res.code === 1) {
            let aliPayPlus = api.require("aliPayPlus");
            aliPayPlus.payOrder(
              {
                orderInfo: res.data
              },
              function(ret, err) {
                console.log(JSON.stringify(err));
                switch (ret.code) {
                  case "9000":
                    that.$vux.toast.text("支付成功");
                    that.$router.push({
                      name: "paySuccess"
                    });
                    break;
                  case "6001":
                    that.$vux.toast.text("取消支付");
                    break;
                  case "8000":
                    that.$vux.toast.text("正在处理中");
                    break;
                  default:
                    that.$vux.toast.text("支付失败");
                }
              }
            );
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
      } else if (this.active === "wechat") {
        apiHttp.goWXPay(this.orderId, this.total_money).then(res => {
          if (res.code === 1) {
            let wxPay = api.require("wxPay");
            let info = {
              apiKey: data.appid,
              orderId: data.prepayid,
              mchId: data.partnerid,
              nonceStr: data.noncestr,
              timeStamp: data.timestamp,
              sign: data.sign
            };
            wxPay.payOrder(info, function(ret, err) {
              if (ret.status) {
                that.$vux.toast.text("支付成功");
                that.$router.push({
                  name: "mallPaySuccess"
                });
              } else {
                console.log(JSON.stringify(err));
                if (err.code === -2) {
                  that.$vux.toast.text("取消支付");
                } else {
                  that.$vux.toast.text("支付失败");
                }
              }
            });
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
      }else if (this.active === "kuan") {
        apiHttp.goGHKpay(this.orderId, this.total_money).then(res => {
          if (res.code === 1) {
            this.$router.push({
              name: "paySuccess"
            });
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
      } 
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/common";

.payMent {
  .content {
    .payMent_parse {
      padding: 0 0.3rem;
      height: 1.1rem;
      background: #fff;
      display: flex;
      align-items: center;
      font-size: @font-big;
      justify-content: space-between;
      color: @font-main-color;
      .right {
        color: @main-red-color;
        font-size: @font-more-big;
        span {
          font-size: @font-small;
        }
      }
    }
    .payMent_list {
      margin-top: 0.2rem;
      padding: 0 0.3rem;
      background: #fff;
      .list_title {
        height: 1rem;
        border-bottom: 1px solid @border-color;
        line-height: 1rem;
        font-size: 0.28rem;
        text-align: left;
      }
      .list {
        display: flex;
        height: 1.2rem;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @border-color;
        .img_box {
          font-size: @font-big;
          height: 100%;
          display: flex;
          align-items: center;
          img {
            width: 0.7rem;
            margin-right: 0.3rem;
          }
        }
        .checkbox {
          img {
            width: 0.4rem;
          }
        }
      }
    }
    .btns {
      padding: 0 0.6rem;
      margin-top: 1.2rem;
      .btn {
        width: 100%;
        height: 0.9rem;
        background: @main-red-color;
        text-align: center;
        line-height: 0.9rem;
        font-size: @font-more-big;
        border-radius: 10px;
        color: #fff;
      }
    }
  }
}
</style>
