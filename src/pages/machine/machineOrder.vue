<template>
  <div class="myOrder">
    <tab
      :line-width="2"
      custom-bar-width=".4rem"
      default-color="#333"
      active-color="#e65013"
      v-model="statusTabIndex"
    >
      <tab-item @on-item-click="resetStatus('all')">全部</tab-item>
      <tab-item @on-item-click="resetStatus(1)">审核中</tab-item>
      <tab-item @on-item-click="resetStatus(2)">未通过</tab-item>
      <tab-item @on-item-click="resetStatus(3)">已完成</tab-item>
    </tab>
    <div class="orderBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div id="p1"></div>
        <div class="orderList" v-for="(vo,index) in list" :key="index" @click="orderDetails(vo.id)">
          <div class="bankMsg">
            <div class="orderLeft">
              <img :src="vo.bank_logo" style="width: 22px;height: 22px;" />
              <span class="aui-margin-l-5">{{vo.bank_name}}</span>
            </div>
            <div class="orderRight">
              <span class="warning" v-if="vo['status'] == 1">待审核</span>
              <span class="danger" v-if="vo['status'] == 2">已驳回</span>
              <span class="success" v-if="vo['status'] == 3">已通过</span>
              <span class="success" v-if="vo['status'] == 4">初审已通过</span>
            </div>
          </div>
          <div class="goodMsg">
            <div class="goodName">
              <div class="name">{{vo.good_name}}</div>
            </div>
            <div class="time">{{vo.create_time | formatDate}}</div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { Tab, TabItem } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
import store from "../../store";
import { formatDate } from "../../plugin/data";
export default {
  components: {
    Tab,
    TabItem,
    MescrollVue
  },
  data() {
    return {
      selectedStatus: "all",
      statusTabIndex: 0,
      id: this.$route.query.id,
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: true
      },
      mescrollUp: {
        use: true,
        callback: this.upCallback,
        page: {
          num: 0,
          size: 1
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: "",
        noMoreSize: 1,
        empty: {
          warpId: "p1",
          icon: "./static/img/auth/kong.png",
          tip: "暂无相关数据~"
        }
      },
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    if (that.mescroll) {
      that.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    if(to.name == 'success'){
      that.$router.push("/my");
    }
    next();
  },
     filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    if (this.$route.query.index) {
      this.statusTabIndex = this.$route.query.index;
    }
  },

  methods: {
    resetStatus(data) {
      this.selectedStatus = data;
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(this.statusTabIndex);
      this.mescrollUp.htmlLoading =
        '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>';
      apiHttp
        .order_list(page.num,this.id, this.statusTabIndex)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
            this.$nextTick(() => {
             mescroll.endSuccess(arr.length)
            });
          } else {
            mescroll.endErr();
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    orderDetails(id) {
      this.$router.push({
        name: "machineOrderDetails",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less">
.myOrder {
  height: 100%;
  .orderBox {
    position: relative;
    background: #f5f5f5;
    height: calc(100% - 44px);
    .orderList {
      border-radius: 0.2rem;
      background: #ffffff;
      margin: 0.2rem 0.3rem 0;
      .bankMsg {
        padding: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        .orderLeft {
          display: flex;
          align-items: center;
          img {
            width: 0.4rem;
            margin-right: 0.2rem;
          }
        }
        .success {
          color: #ffc107 !important;
        }
        .danger {
          color: #e51c23 !important;
        }
        .success {
          color: #009688 !important;
        }
      }
      .goodMsg {
        color: #000;
        padding: 0.2rem 0.3rem;
        position: relative;
        .time {
          color: #757575;
        }
      }
      .goodMsg::before {
        content: "";
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        top: 50%;
        right: 0.3rem;
        margin-top: -0.13rem;
        background: transparent;
        border: 1px solid #666666;
        border-top: none;
        border-right: none;
        z-index: 2;
        -webkit-border-radius: 0;
        border-radius: 0;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
      }
    }
  }
}
</style>