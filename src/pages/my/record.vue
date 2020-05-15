<template>
  <div class="withdrawlist">
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
    <div class="lists">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="high"></div>
        <div class="listBox" v-for="item of list" :key="item.id">
          <p class="note">提现到支付宝({{item.alipay}}){{item.name}}</p>
          <div class="list">
            <span style="font-size:0.24rem">{{item.create_time}}</span>
            <div class="money"> {{item.money}}</div>
          </div>
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import MescrollVue from "mescroll.js/mescroll.vue";
import { Tab, TabItem, Confirm } from "vux";
import * as apiHttp from "../../api/index";
import { formatDate } from "../../plugin/data";

export default {
  name: "withdrawlist",
  components: {
    Tab,
    TabItem,
    InfiniteLoading,
    MescrollVue
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      tab: [
        { sort: 1, title: "待审核" },
        { sort: 2, title: "审核驳回" },
        { sort: 3, title: "审核通过" }
      ],
      sort: 1,
      index: 0,
      list: [],
      page: 1,
      finish: false,
      loading: false,
      mescroll: null,
      data: this.$store.state.user.userInfo,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 6
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: "",
        noMoreSize: 5,
        empty: {
          warpId: "empty",
          icon: "./static/img/auth/kong.png",
          tip: "暂无相关数据~"
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },
  mounted: function() {
    // 删除
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },

    upCallback(page, mescroll) {
      this.mescrollUp.htmlLoading =
        '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>';
      apiHttp
        .getApplyList(this.sort, page.num, 15)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.data;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);
            });
          } else {
            mescroll.endErr();
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    getListIn(type) {
      this.list = [];
      this.page = 1;
      this.sort = type;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    refresh: function() {
      this.finish = false;
      let This = this;
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.withdrawlist {
  height: 100%;
  background: #fff;
  overflow-y: auto;
  position: relative;
  .save {
    color: #666;
  }
  .widthBox {
    position: absolute;
    left: 0;
    top: calc(0.88rem + 50px);
    bottom: 0;
    height: auto;
    width: 100%;
  }
  .high {
    height: 0.1rem;
    background: #f4f4f4;
    overflow: hidden;
  }
  .head {
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      color: #333;
      font-size: 0.3rem;
      flex: 1;
      text-align: center;
    }
  }
  .lists {
    position: absolute;
    left: 0;
    top:  44px;
    bottom: 0;
    height: auto;
    width: 100%;
  }
  .listBox{
    padding:  0 0.3rem;
    .note{
      font-size: 0.3rem;
      color: #333;
      padding-top: 0.2rem;
    }
  }
  .list {
    position: relative;
    // height: 1rem;
    padding-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
    .money{
      color: #ff7512;
      font-size: 0.3rem;
    }
  }
  .list:after {
    content: "";
    position: absolute;
    left: 0rem;
    right: 0rem;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #e7e7e7;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}
</style>
