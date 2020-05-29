<template>
  <div class="goodDetails">
    <div class="detailsBox">
      <div class="top">
        <div class="goodImg">
          <swiper v-if="data.album" :options="swiperOption" ref="mySwiper" style="height:100%;">
            <swiperSlide v-for="(item,index) in goodImgs" :key="index">
              <img :src="item" alt style="width:100%;height:6.2rem;" />
            </swiperSlide>
          </swiper>
        </div>
        <div class="goodMsg">
          <div class="goodName">{{data.goods_name}}</div>
          <div class="price">￥{{data.price}}</div>
        </div>
      </div>
      <div class="down" style="background-color:#fff;">
        <div class="contBox">
          <div class="shuoming">产品说明</div>
          <div class="describe">
            <div v-html="data.describe"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="buyBtn" @click="handModel()">立即购买</div>
    <div v-transfer-dom>
      <popup v-model="show_select" position="bottom" width="100%">
        <div class="detail_model">
          <div class="num_main">
            <x-number
              title="购买数量"
              v-model="changeValue"
              width="0.8rem"
              :min="1"
              button-style="round"
              fillable
            ></x-number>
          </div>
          <div class="footer_buy">
            <div class="btn2" @click="send()">立即购买</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Popup, TransferDom, XNumber, Popover, Confirm } from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import * as apiHttp from "../../api/index";
export default {
  components: {
    Popup,
    XNumber,
    Popover,
    Confirm,
    swiper,
    swiperSlide
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      data: "",
      goodImgs: [],
      show_select: false,
      changeValue: 1,
      id: this.$route.query.id,
      swiperOption: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        hideOnClick: true,
        disabledClass: "my-button-disabled",
        hiddenClass: "my-button-hidden",
        spaceBetween: 5,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        on: {
          sliderMove: function(event) {
            window.canRightSlipBack = false;
          },
          touchEnd: function(event) {
            setTimeout(() => {
              window.canRightSlipBack = true;
            }, 600);
          }
        }
      }
    };
  },
  mounted() {
    apiHttp.getGoodsDetail(this.$route.query.id).then(res => {
      if (res.code == 1) {
        this.data = res.data;
        this.goodImgs = res.data.album.split(",");
      }
    });
  },
  methods: {
    send() {
      this.$router.push({
        name: "confirmOrder",
        query: {
          id: this.id,
          num: this.changeValue
        }
      });
    },
    handModel() {
      this.show_select = true;
    }
  },
};
</script>
<style lang="less" scoped>
.goodDetails {
  height: 100%;
  position: relative;
  background: #f5f5f5;
  .detailsBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1rem;
    overflow-y: auto;
    .top {
      background-color: #fff;
      .goodImg {
        height: 6rem;
        img {
          width: 100%;
          height: 6rem;
        }
      }
      .goodMsg {
        margin: 0.3rem;
        position: relative;
        word-break: break-all;
        .goodName {
          font-size: 0.36rem !important;
        }
        .price {
          color: #e83632;
          font-size: 0.48rem;
        }
      }
    }
    .down {
      background-color: rgb(255, 255, 255);
      color: #757575;
      padding-bottom: 1rem;
      .contBox {
        position: relative;
        word-break: break-all;
        .shuoming {
          font-size: 0.28rem;
          font-weight: 500;
          margin: 0.3rem ;
          border-bottom: 1px solid #999;
          padding: 0.2rem 0;
        }
        .describe {
          padding-top: 0.3rem !important;
          /deep/ img{
              width: 100%;
              vertical-align: middle;
            }
        }
      }
    }
  }
  .buyBtn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1rem;
    z-index: 100;
    line-height: 1rem;
    background: #e83632;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
  }
}
</style>


<style lang="less" >
@import "../../assets/less/common";
.detail_model {
  padding: 0 0.3rem;
  background: #ffffff;
  .num_main {
    padding: 0.4rem 0;
    border-bottom: 1px solid @border-color;
    .vux-number-round .vux-number-selector-sub,
    .vux-number-round .vux-number-selector-plus {
      padding: 0.02rem;
    }
    .svg {
      width: 0.18rem !important;
      height: 0.18rem !important;
    }
    p {
      font-size: @font-big;
    }
    .weui-cell {
      padding: 0;
    }
  }
  .footer_buy {
    padding: 0.25rem 0.6rem;
    display: flex;

    div {
      width: 100%;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #fe6c77;
      color: #fff;
      font-size: 0.32rem;
    }
    .btn2 {
      background: @main-btn1-color;
      border-radius: 20px;
    }
  }
}
</style>
