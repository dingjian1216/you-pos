<template >
  <div id="machine">
    <div class="head" :style="{paddingTop: statusH + 'rem'}">
      <div class="searchBox">
        <i class="iconfont icon-search"></i>
        <input placeholder="输入您当前要搜索的设备" type="search" @keyup.enter="search" v-model='keyword' />
      </div>
      <!-- <span @click="search" v-if="keyword === ''">取消</span> -->
      <span @click="search">搜索</span>
    </div>
    <div class="machineBox"  :style="{marginTop:statusH + 'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div id="d1"></div>
        <div class="machineList" v-for="(item,index) in machineList" :key="index" @click ="jumpTo({name:'machineOrder',query:{id:item.id}})">
          <div class="left">
            <img src="../../assets/img/my/avater.png" alt />
          </div>
          <div class="right">
            <p class="sn">{{item.stock_name}} {{item.sn}}</p>
            <div class="allNum">
              <span class="money">累计兑换: {{item.sum_money}}</span>
              <span class="integral">累计积分: {{item.sum_integral}}万</span>
            </div>
          </div>
           <span @click.stop="daBiao(item.id)" class="rightDaBiao">达标返现</span>
           <span class="iconfont icon-right1 rightOne"></span>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../api/index";
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      keyword: "",
      statusH: "",
      machineList: "",
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
          warpId: "d1",
          icon: "./static/img/kong.png",
          tip: "暂无相关数据~"
        }
      }
    };
  },
   created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      apiHttp
        .machineList(page.num,this.keyword)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data === "" ? [] : res.data;
            if (page.num === 1) this.machineList = [];
            this.machineList = this.machineList.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.length, true);
            });
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    search() {
      this.list = [];
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    daBiao(id){
      this.$router.push({
        name: "achievement",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#machine {
  background: #fff;
  height: 100%;
  position: relative;
  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.88rem;
    // background-image: url("../../assets/img/my/my_head.png");
    background: #ff7512;
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
      .icon-search {
        font-size: 0.27rem;
        color: #999;
      }
      input {
        background: #efefef;
        margin-left: 0.2rem;
        width: 5.2rem;
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
  .machineBox {
    position: absolute;
    top: 0.88rem;
    left: 0;
    right: 0;
    bottom: 0px;
    height: auto !important;
    background: #f5f5f5;
    .machineList {
      background: #ffffff;
      margin: 0.1rem 0;
      height: 1.5rem;
      display: flex;
      align-items: center;
      padding: 0 0.3rem;
      position: relative;
      .left {
        width: 1rem;
        margin-right: 0.2rem;
      }
      .right {
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .sn {
          font-size: 0.32rem;
          color: #757575;
        }
        .allNum {
          font-size: 0.28rem;
          color: #03a9f4;
          .money {
            color: #ff7512;
          }
        }
      }
      .rightOne{
        position: absolute;
        top: 0.6rem;
        right: 0.3rem;
        font-size: 0.4rem;
      }
      .rightDaBiao{
        position: absolute;
        top: 0.2rem;
        right: 0.3rem;
        color: #ff7512
      }
    }
  }
}
</style>