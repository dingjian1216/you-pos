<template>
  <div class="firmOrder_main orderDetail_main" v-if="isShow">
    <div class="header">
      <x-header slot="header" :left-options="{showBack: false}">
        <a @click="goBack()" slot="left" class="backBox">
          <i class="iconfont icon-back"></i>
        </a>
        订单详情
      </x-header>
    </div>
    <confirm v-model="showquxiao" :close-on-confirm="false" @on-confirm="confirm1">
      <p style="text-align:center;">您确定要取消该订单？</p>
    </confirm>
    <div class="mescrollBox">
      <div class="content" style="margin-top: 0">
        <div class="content_status">
          <div class="left">{{status.title}}</div>
          <div class="right">
            <img :src="status.img || './static/img/under/111.png'" alt />
          </div>
        </div>
        <div class="content_top">
          <div class="div1">
            <div class="left_name">
              <i class="iconfont icon-wode1"></i>
              <span>收货人：{{obj.sr_name}}</span>
            </div>
            <div class="right_phone">{{obj.sr_mobile }}</div>
          </div>
          <div class="div2">
            <i class="iconfont icon-locationfill"></i>
            <span>{{obj.sr_adress}}</span>
          </div>
        </div>
        <div>
          <div class="content_main">
            <div class="list">
              <div class="mail">
                <div class="left">
                  <img v-lazy="obj.goods_img" alt />
                </div>
                <div class="right">
                  <div class="div1">{{obj.goods_name}}</div>
                  <div class="div2">
                    <div>×{{obj.goods_num}}</div>
                  </div>
                  <div class="div3">
                    <div class="price_main">
                      <span>¥</span>
                      {{obj.goods_price}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="li_main">
                <div class="title_left">实付款</div>
                <div class="title_right_span">¥{{obj? obj.total_money : ''}}</div>
              </div>
            </div>
          </div>
          <div class="content_main" style="margin-top:0.1rem;">
            <div class="list">
              <div class="li_main">
                <div class="title_left">订单号</div>
                <div class="title_right">{{obj.order_number}}</div>
              </div>
              <div class="li_main">
                <div class="title_left">下单时间</div>
                <div class="title_right">{{obj ? parseInt(obj.create_time) : 0 | formatDate}}</div>
              </div>
              <div class="li_main" v-if="obj.payed_time">
                <div class="title_left">支付时间</div>
                <div class="title_right">{{obj ? parseInt(obj.payed_time) : 0 | formatDate}}</div>
              </div>
              <div class="li_main" v-if="obj.kd_name">
                <div class="title_left">快递名称</div>
                <div class="title_right">{{obj.kd_name}}</div>
              </div>
              <div class="li_main" v-if="obj.kd_number">
                <div class="title_left">快递单号</div>
                <div class="title_right">{{obj.kd_number}}</div>
              </div>
              <!-- <div class="refund">
                <div
                  class="btns"
                  v-if="payStatus === '1' && obj.order.orderStatus === '1'"
                  @click="receipt(obj.order.orderSn)"
                >确认收货</div>
                <div
                  class="btns btn1s"
                  v-if="payStatus === '0' && obj.order.orderStatus === '0'"
                  @click="handShow(obj.order.orderSn)"
                >取消订单</div>
                <div
                  class="btns"
                  v-if="payStatus === '0' && obj.order.orderStatus === '0'"
                  @click="jumpTo({name:'mallPayMent',query:{orderId:obj.order.orderId}})"
                >去支付</div>
              </div> -->
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Confirm } from "vux";
import * as apiHttp from "../../api/index";
import { formatDate } from "../../plugin/data";
import MescrollVue from "mescroll.js/mescroll.vue";
import Clipboard from "clipboard";
export default {
  name: "orderDetail",
  components: {
    Confirm,
    MescrollVue
  },
  data() {
    return {
      shopList: [],
      obj: {},
      status: {},
      order: null,
      showquxiao: false,
      payStatus: "",
      page: 1,
      isShow: false
    };
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  mounted: function() {
    // 删除
    this.getDtails();
  },
  methods: {
    getDtails() {
      apiHttp.orderDetail(this.$route.query.orderId).then(response => {
        if (response.code === 1) {
          this.isShow = true;
          this.obj = response.data;
          this.payStatus = response.data.order_status;
          if (response.data.order_status == 0) {
            this.status = {
              title: "待付款",
              img: "./static/libs/img/yifukuan.png"
            };
          } else if (response.data.order_status == 1) {
            this.status = {
              title: "待发货",
              img: "./static/libs/img/daifahuo.png"
            };
          } else if (response.data.order_status == 2) {
            this.status = {
              title: "待收货",
              img: "./static/libs/img/yifukuan.png"
            };
          } else if (response.data.order_status == 3) {
            this.status = {
              title: "已完成",
              img: "./static/libs/img/order_status.png"
            };
          } else if (response.data.order_status == -1) {
            this.status = {
              title: "已取消",
              img: "./static/libs/img/yifukuan.png"
            };
          }
        }
      });
    },
 

    handShow(order) {
      this.order = order;
      this.showquxiao = true;
    },
    confirm1() {
    },

  }
};
</script>

<style lang="less">
@import "../../assets/less/common";
.orderDetail_main {
  height: 100%;
  position: relative;
  .mescrollBox {
    width: 100%;
    position: absolute;
    top: 0.9rem;
    bottom: 0;
    height: auto !important;
  }
}
.orderDetail_main {
  ._v-container {
    //top: 1.7rem;
    height: 100% !important;
  }
  ._v-content {
    padding-bottom: 40px;
  }
  .content {
    height: calc(100% - 0.9rem);
    .content_status {
      height: 1.8rem;
      background: url("../../assets/img/my/orderDetail_header.png");
      background-size: cover;
      display: flex;
      padding: 0 0.9rem 0 0.7rem;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 0.3rem;
      .right {
        width: 1.38rem;
        height: 1.38rem;
        img {
          width: 1.38rem;
          height: 1.38rem;
        }
      }
    }
    .content_top {
      margin-top: 0;
    }
    .title_img {
      margin-top: 0.2rem;
      background: #fff;
      height: 1rem;
      text-align: center;
      img {
        width: 4.45rem;
        height: 0.31rem;
        margin-top: 0.34rem;
      }
    }
    .li_main {
      .title_right_span {
        font-size: @font-nomal;
        span {
          font-size: @font-nomal;
          color: @font-light-color;
          padding-left: 0.1rem;
        }
        color: @main-red-color;
      }
    }
    .refund {
      height: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btns {
        width: 1.6rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        border: 1px solid @main-red-color;
        border-radius: 20px;
        color: @main-red-color;
      }
      .btn1s {
        margin-right: 0.1rem !important;
        border: 1px solid #c6c6c6 !important;
        color: #999999 !important;
      }
    }
  }
}
.firmOrder_main {
  .content {
    .content_top {
      padding: 0.35rem 0.3rem;
      background: #fff;
      font-size: @font-nomal;
      .div1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @font-big;
        color: @font-main-color;
        i {
          color: @font-light-color;
          font-size: 0.35rem;
          position: relative;
          top: 2px;
          padding-right: 0.1rem;
        }
        .right_phone {
          font-size: @font-nomal;
          color: #666;
        }
      }
      .div2 {
        position: relative;
        margin-top: 0.3rem;
        display: flex;
        font-size: @font-nomal;
        align-items: start;
        text-align: justify;
        line-height: 20px;
        color: @font-light-color;

        i {
          color: @font-light-color;
          font-size: 0.35rem;
          position: relative;
          padding-right: 0.1rem;
          top: 0.05rem;
        }
        i.left {
          position: absolute;
          right: 0;
          bottom: 0;
          padding-right: 0;
        }
      }
    }
    .border {
      width: 100%;
      height: 0.06rem;

      img {
        width: 100%;
        height: 0.06rem;
        position: relative;
        top: -10px;
      }
    }
    .one-shop-order:last-child {
      margin-bottom: 1.6rem;
    }
    .content_main {
      padding: 0 0.3rem;
      background: #fff;
      margin-top: 0.2rem;
      .jifen-box {
        padding: 0.3rem 0;
        .line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            flex-grow: 1;
            font-size: 0.3rem;
          }
          img {
            width: 0.4rem;
            height: 0.4rem;
          }
          img:first-child {
            margin-right: 0.1rem;
          }
        }
        input {
          background: #f4f4f4;
          border: none;
          text-indent: 1em;
          border-radius: 4px;
          line-height: 2em;
          font-size: 0.3rem;
          width: 100%;
          margin-top: 0.2rem;
        }
      }
      .header {
        height: 1rem;
        display: flex;
        align-items: center;
        font-size: @font-more-big;
        border-bottom: 1px solid @border-color;
        img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          margin-right: 0.15rem;
        }
      }
      .mail {
        padding: 0.3rem 0;
        display: flex;
        border-bottom: 1px solid @border-color;
        .left {
          img {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 5px;
            margin-right: 0.25rem;
          }
        }
        .right {
          width: 4.8rem;
          .div1 {
            text-align: left;
            line-height: 20px;
            color: @font-main-color;
            font-size: @font-big;
          }
          .div2 {
            margin-top: 0.1rem;
            color: @font-light-color;
            display: flex;
            font-size: @font-nomal;
            justify-content: space-between;
          }
          .div3 {
            text-align: left;
            margin-top: 0.1rem;
            font-size: @font-big;
            color: @main-red-color;
            span {
              font-size: @font-small;
            }
          }
        }
      }
      .li_main {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid @border-color;
        height: 1rem;
        align-items: center;
        .title_left {
          font-size: @font-big;
          color: @font-main-color;
        }
        .title_right {
          font-size: @font-nomal;
          color: @font-light-color;
          input {
            outline: none;
            border: 0;
            text-align: right;
          }
        }
        .title_right_red {
          color: @main-red-color;
          font-size: @font-big;
        }
      }
      .li_main2 {
        justify-content: start;
        input {
          border: none;
          outline: none;
          text-indent: 10px;
        }
      }
    }
  }
  .footer {
    font-size: @font-big;
    border-top: 1px solid @border-color;
    height: 1.1rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .footer_main {
      width: 100%;
      justify-content: space-between;
      align-items: center;
      display: flex;
    }

    .div1 {
      color: @main-red-color;
      font-size: @font-more-big;
      label {
        color: @font-light-color;
        padding-right: 0.2rem;
        font-size: @font-nomal;
      }
      span {
        font-size: @font-small;
      }
    }
    .div_btn {
      width: 2rem;
      height: 0.75rem;
      text-align: center;
      line-height: 0.75rem;
      font-size: @font-more-big;
      background: @main-red-color;
      color: #fff;
      border-radius: 20px;
    }
  }
}
</style>
