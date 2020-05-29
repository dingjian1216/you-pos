<template>
  <div class="shopMoneyList">
    <div class="lists">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="listBox" v-for="item of list" :key="item.id">
          <p class="note">{{item.note}}</p>
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
import * as apiHttp from "../../api/index";

export default {
  name: "withdrawlist",
  components: {
    InfiniteLoading,
    MescrollVue
  },

  data() {
    return {
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
        .getGWKlist(page.num, 15)
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

  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.shopMoneyList {
  height: 100%;
  background: #fff;
  overflow-y: auto;
  position: relative;

  .lists {
    position: absolute;
    left: 0;
    top:  0px;
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
