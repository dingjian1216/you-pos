<template>
  <div class="fixing_order">
    <div class="header">
      <x-header slot="header" :left-options="{showBack: false}">
        <a @click="goBack()" slot="left" class="backBox">
          <i class="iconfont icon-back"></i>
        </a>
        订单
      </x-header>
      <div class="tab">
        <tab
          :line-width="2"
          active-color="#ff7512"
          height="700px"
          custom-bar-width=".8rem"
          v-model="index"
        >
          <tab-item
            class="vux-center"
            :selected="index===ind"
            v-for="(item, ind) in tab"
            @on-item-click="getListIn(item.sort)"
            :key="ind"
          >{{item.title}}</tab-item>
        </tab>
      </div>
    </div>
    <confirm v-model="show" :close-on-confirm="false" @on-confirm="confirm">
      <p style="text-align:center;">您确定要删除？</p>
    </confirm>
    <confirm v-model="showquxiao" :close-on-confirm="false" @on-confirm="confirm1">
      <p style="text-align:center;">您确定要取消该订单？</p>
    </confirm>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="content">
          <div id="d9"></div>
          <div class="content_main list" v-for="(items,index) in shopList" :key="index">
            <div class="header_main" @click="handDetail(items.id)">
              <div class="left">
                <img src="../../assets/img/logo.png" alt />
                <span>可兑</span>
              </div>
              <div class="right">
                <span>{{items.statusName}}</span>
              </div>
            </div>
            <div class="mail" @click="handDetail(items.id)">
              <div class="left">
                <img :src="items.goods_img" alt />
              </div>
              <div class="right">
                <div class="div1">{{items.goods_name}}</div>
                <div class="div2">
                  <!-- <div>{{item.goodsField}}</div> -->
                  <div>×{{items.goods_num}}</div>
                </div>
                <div class="div3">
                  <div class="price_main">
                    <span>¥</span>
                    {{items.goods_price}}
                  </div>
                </div>
              </div>
            </div>
            <div class="price">
              <label>共{{items.goods_num}}件商品，合计:</label>
              <span>¥</span>
              {{items.total_money}}
            </div>
            <div class="status" v-if="items.order_status == 0">
              <div class="btn1" @click="handShow(index,items.id)">取消订单</div>
              <div
                class="btn"
                @click="jumpTo({name:'payMent',query:{orderId:items.id,total_money:items.total_money}})"
              >去支付</div>
            </div>
            <div class="status" v-if="items.order_status == 2">
              <div class="btn" @click="receipt(index,items.id)">确认收货</div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Confirm } from "vux";
import Vue from "vue";
import * as utils from "../../utils";
import * as apiHttp from "../../api/index";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "fixing_order",
  data() {
    return {
      tab: [
        { sort: -2, title: "全部" },
        { sort: 0, title: "待付款" },
        { sort: 1, title: "待发货" },
        { sort: 2, title: "待收货" },
        { sort: 3, title: "已完成" }
      ],
      sort: utils.storage.get('orderId') ? utils.storage.get('orderId') : '-2',
      index: utils.storage.get('orderId') ? utils.storage.get('orderId') : 0,
      shopList: [],
      loading: false,
      finish: false,
      show: false,
      indexNum: null,
      order: null,
      showquxiao: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "d9",
          icon: "./static/img/kong.png",
          tip: "暂无相关订单~"
        }
      }
    };
  },
  components: {
    Tab,
    TabItem,
    Confirm,
    MescrollVue
  },
   beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.mescroll && from.name == 'orderDetails') {
        // 滚动到之前列表的位置
        if (vm.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
        // 恢复到之前设置的isBounce状态
        if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce)
      }
      if(from.name == 'my'){
        utils.storage.set("orderId", 0);
        vm.index = 0
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
    }
    if (to.name == "paySuccess") {
      this.$router.push("/home");
    }
    next();
  },
  mounted: function() {
    // 删除
    this.sort = utils.storage.get("orderId");
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let sort;
      if(utils.storage.get("orderId") == 0){
        sort = -2
      }else{
        sort = utils.storage.get("orderId") - 1
      }
      apiHttp
        .getOrderList(page.num, 10, sort)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.data === "" ? [] : res.data.data;
            if (page.num === 1) this.shopList = [];
            this.shopList = this.shopList.concat(arr);
            console.log(this.shopList);
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.data.length, true);
            });
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    refresh: function() {
      this.finish = false;
      let This = this;
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    getListIn(type) {
      if(type == -2){
        utils.storage.set("orderId", 0);
      }else {
        utils.storage.set("orderId", type + 1);
      }
      this.shopList = [];
      this.page = 1;
      this.sort = type;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    handDelete(index, order) {
      console.log(index);
      this.show = true;
      this.index = index;
      this.order = order;
    },
    receipt(index, order) {
      this.indexNum = index;
      this.order = order;
      apiHttp.receipt(this.order).then(res => {
        this.$vux.toast.text(res.msg);
        this.refresh();
      });
    },
    handShow(index, order) {
      this.indexNum = index;
      this.order = order;
      this.showquxiao = true;
    },
    confirm() {
      // apiHttp.orderDelete(this.order).then(response => {
      //   if (response.code === 0) {
      //     console.log(this.index);
      //     this.shopList.splice(this.index, 1);
      //     this.$vux.toast.text("删除成功");
      //     this.show = false;
      //   }
      // });
    },
    confirm1() {
      apiHttp.cancelOrder(this.order).then(response => {
        if (response.code === 1) {
          this.showquxiao = false;
          this.$vux.toast.text("取消成功");
          this.refresh();
        }
      });
    },
    handDetail(orderId) {
      this.$router.push({
        name: "orderDetails",
        query: {
          orderId: orderId
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
@import "../../assets/less/common";
.fixing_order {
  .vux-header {
    position: absolute !important;
  }
  .mescrollBox {
    width: 100%;
    position: absolute;
    top: 1.9rem;
    bottom: 0;
    height: auto !important;
  }
}
.fixing_order {
  ._v-container {
    height: 100%;
  }
  ._v-content {
    padding-bottom: 100px;
  }
  .tab {
    padding: 0;
    height: 1rem;
    background: #fff;
    position: absolute;
    width: 100%;
    top: @margin-top;
    z-index: 999;
    .scrollable .vux-tab-item {
      flex: 0 0 20%;
      align-items: center;
      line-height: 1rem;
      font-size: @font-big;
    }
    .vux-tab-container {
      height: 1rem;
    }
    .vux-tab {
      height: 1rem;
      bottom: 0;
    }
  }
  .header {
    background: #f4f4f4;
    height: 2rem;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 10;
  }
  .content {
    .content_main {
      padding: 0 0.3rem;
      background: #fff;
      margin-bottom: 0.2rem;
      .list {
        margin-top: 0.1rem;
      }
      .header_main {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @font-nomal;
        color: @font-light-color;
        border-bottom: 1px solid @border-color;
        .left {
          display: flex;
          align-items: center;
        }
        .right {
          color: @main-red-color;
        }
        img {
          width: 0.26rem;
          height: 0.26rem;
          border-radius: 20%;
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
            color: @font-main-color;
            span {
              font-size: @font-small;
            }
          }
        }
      }
      .price {
        height: 0.9rem;
        border-bottom: 1px solid @border-color;
        width: 100%;
        line-height: 0.9rem;
        text-align: right;
        color: @main-red-color;
        font-size: @font-more-big;
        label {
          color: #999999;
          padding-right: 0.1rem;
          font-size: @font-big;
        }
        span {
          font-size: @font-small;
        }
      }
      .status {
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn1 {
          padding: 0.09rem 0.29rem;
          font-size: @font-more-big;
          border: 1px solid #c6c6c6;
          color: #999999;
          margin-right: 0.2rem;
          border-radius: 20px;
        }
        .btn {
          padding: 0.1rem 0.3rem;
          font-size: @font-more-big;
          color: #fff;
          background: @main-btn1-color;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
