<template>
  <div class="firmOrder_main">
    <x-header slot="header" :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      确认订单
    </x-header>
    <div class="content">
      <div class="content_top" @click="handAddress()" v-show="address == ''">点击添加默认地址</div>
      <div class="content_top" @click="jumpTo({name:'address'})" v-show="address">
        <div class="div1">
          <div class="left_name">
            <i class="iconfont icon-wode1"></i>
            <span>收货人：{{address ? address.name : ''}}</span>
          </div>
          <div class="right_phone">{{address ? address.mobile : ''}}</div>
        </div>
        <div class="div2">
          <i class="iconfont icon-locationfill"></i>
          <span>{{address ? address.province + address.city + address.county + address.detail_address: ''}}</span>
          <i class="iconfont icon-right1 left"></i>
        </div>
      </div>
      <div class="border">
        <img src="../../assets/img/border.png" alt />
      </div>
      <div class="one-shop-order">
        <div class="content_main">
          <div class="list">
            <div class="mail">
              <div class="left">
                <img v-lazy="obj.goods_img" alt />
              </div>
              <div class="right">
                <div class="div1">{{obj.goods_name}}</div>
                <div class="div2">
                  <div></div>
                  <div>×{{num}}</div>
                </div>
                <div class="div3">
                    <div class="price_main"><span>¥</span>{{obj.price}}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content_main" style="margin-top:0.1rem;">
          <div class="list">
            <div class="li_main">
              <div class="title_left">商品总计</div>
              <div class="title_right_red">
                <span>¥</span>
                {{sumPrice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_main">
        <div class="div1">
          <label>合计</label>
          <span>¥</span>
          {{sumPrice}}
        </div>
        <div class="div_btn" @click="queryOrder()">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
export default {
  name: "firmOrder",
  data() {
    return {
      obj: {},
      address: "",
      goods_id: this.$route.query.id,
      num: this.$route.query.num
    };
  },
  mounted: function() {
    this.getDetail();
  },
  computed: {
    sumPrice() {
      // 计算合计
      let sumPrice = this.obj.price * this.num;
      return sumPrice;
    }
  },
  methods: {
    getDetail(type, data) {
      let that = this;
      apiHttp.getGoodsDetail(this.$route.query.id).then(res => {
        if (res.code == 1) {
          this.obj = res.data;
        }
        apiHttp.getAddressList().then(res => {
          if (res.code == 1) {
            let data = res.data.data;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].is_default == 1) {
                  that.address = data[i];
                }
              }
            } else {
              this.address = "";
            }
          }
        });
      });
    },
    handAddress() {
      this.$router.push({
        name: "address"
      });
    },
    queryOrder() {
      let that = this;
      if (!this.address) {
        // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
          title: "提示",
          content: "暂无收货地址,去添加收货地址",
          onConfirm() {
            that.$router.push({
              name: "address"
            });
          }
        });
        return;
      }
      apiHttp
        .buildOrder(this.goods_id, this.num, this.address.id)
        .then(response => {
          if (response.code === 1) {
            this.$router.push({
              name: "payMent",
              query: {
                order_number: response.data.order_number,
                total_money: response.data.total_money,
                orderId: response.data.orderId
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/common";
.firmOrder_main {
  .content {
    height: calc(100% - 2rem);
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
