<template lang="">
  <div class='material'>
     <div class="head" :style="{paddingTop: statusH + 'rem'}">
      <div class="searchBox">
        <popover placement="bottom" style="" :gutter='20'>
          <div slot="content" class="popover-demo-content" id="popover-demo-content">
            <div @click="changeType(2,'全部')"> 全部</div>
            <div @click="changeType(1,'文章')"> 文章</div>
            <div @click="changeType(0,'视频')"> 视频</div>
          </div>
          <div class='select'>{{typeName}} <img  src='../../assets/img/home/select.png' /> </div>
        </popover>
        <i class="iconfont icon-search"></i>
        <input placeholder="输入您当前要搜索的内容" type="search" @keyup.enter="search" v-model='keyword' />
      </div>
      <span @click="search" v-if="keyword === ''">取消</span>
      <span @click="search" v-else>搜索</span>
    </div>
    <div class='materialBox' :style="{marginTop:statusH + 'rem'}">
       <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
         <div id='d0'></div>
         <div class = 'materialList' v-for="(item,index) in list" :key='index' @click="jumpTo({name: 'materialDetails',query:{ky_id: item.id}})">
           <img v-lazy='item.cover' class='cover' v-if='index%2!==0'>
           <div class='materialMsg' :class="index%2 ==0 ? 'oneList': ''">
             <div class='name'>{{item.title}}</div>
             <div class= 'abstract'>{{item.abstract}}</div>
             <p class='time'>{{item.create_time | formatDate}}</p>
           </div>
           <img  v-lazy='item.cover' class='cover' v-if='index%2==0'>
         </div>
       </mescroll-vue>
    </div>
  </div>
</template>
<script>
import { Popup, Popover, TransferDom } from "vux";
import * as apiHttp from "../../api/index";
import { formatDate } from "../../plugin/data";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Popover,
    MescrollVue
  },
  data() {
    return {
      keyword: "",
      statusH: "",
      typeName: "全部",
      type: 2,
      list: [],
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
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 2,
        empty: {
          warpId: "d0",
          icon: "./static/img/kong.png",
          tip: "暂无相关数据~"
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.mescroll) {
        // 滚动到之前列表的位置
        if (vm.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
        // 恢复到之前设置的isBounce状态
        if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
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
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  methods: {
    search() {
      this.list = [];
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    changeType(type, name) {
      this.typeName = name;
      this.type = type;
      this.list = [];
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      apiHttp
        .getWYDataList(page.num, 10, this.keyword, this.type)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.data === "" ? [] : res.data.data;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
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
      this.list = [];
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    }
  }
};
</script>
<style lang="less" scoped>
.material {
  height: 100%;
  position: relative;
  background: #f5f5f5;
  .head {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.88rem;
    background-image: url("../../assets/img/my/my_head.png");
    .icon-back {
      font-size: 0.4rem;
      color: #000;
      margin-top: 0.02rem;
    }
    .searchBox {
      width: 6.1rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background: #efefef;
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      .select {
        width: 1.1rem;
        display: flex;
        align-items: center;
        img {
          margin: 0 0.1rem;
          width: 0.3rem;
        }
      }
      .icon-search {
        font-size: 0.27rem;
        color: #999;
      }
      input {
        background: #efefef;
        margin-left: 0.2rem;
        width: 4.3rem;
        font-size: 0.26rem;
        color: #999;
        outline: none;
        border: none;
      }
    }
    span {
      font-size: 0.28rem;
      /*margin-right: .2rem;*/
      color: #ffffff;
    }
  }
  .materialBox {
    position: absolute;
    top: 1.1rem;
    left: 0;
    right: 0;
    bottom: 0px;
    height: auto !important;
    background: #f5f5f5;
    .materialList {
      height: 1.8rem;
      margin-bottom: 0.2rem;
      padding: 0.2rem 0.3rem;
      background: #ffffff;
      overflow: hidden;
      .cover {
        width: 2rem;
        height: 1.8rem;
        float: left;
        margin-right: 0.2rem;
      }
      .oneList {
        margin-right: 0.2rem;
      }
      .materialMsg {
        float: left;
        display: flex;
        width: 4.5rem;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: 0.32rem;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .abstract {
          height: 0.88rem;
          color: #333333;
          font-size: 0.28rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time {
          color: #757575;
          font-size: 0.26rem;
        }
      }
    }
  }
}
</style>